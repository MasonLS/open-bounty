'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const path = require('path');
const paypal = require('paypal-rest-sdk');
const moment = require('moment');
const sequelize = require('sequelize');

const env = require(path.join(__dirname, '../../../env'));
const Donation = require(path.join(__dirname, '../../../db/models/donation'));
const Project = require(path.join(__dirname, '../../../db/models/project'));
const Bounty = require(path.join(__dirname, '../../../db/models/bounty'));
const PaypalHelper = require(path.join(__dirname, '../../helpers/paypal'));

const Promise = require('bluebird');

// Paypal configuration
paypal.configure(env.PAYPAL);

let ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};


// Promisified Paypal collect function
const promisePPPayment = transaction => {
    return new Promise((resolve, reject) => {
        paypal.payment.create(transaction, (error, payment) => {
            if (error) reject(error);
            else resolve(payment);
        });
    });
};


// Promisified Paypal payout function
const promisePPPayout = transaction => {
    return new Promise((resolve, reject) => {
        paypal.payout.create(transaction, (error, payout) => {
            if (error) reject(error);
            else resolve(payout);
        });
    });
};


// Collect $$$
router.post('/collect', (req, res, next) => {
    let transaction = PaypalHelper.createPayPalToken(req.body);
    promisePPPayment(transaction)
        .then(payment => {
            let responseTransaction = PaypalHelper.createPayPalPreTransaction(payment, req.body);
            return Donation.create(responseTransaction)
                .then(ppResponse => res.json({
                    transaction: ppResponse
                }));
        })
        .catch(console.error);
});

// Collect $$$ / OK response from Paypal
router.get('/collect/ok', (req, res, next) => {

    const transactionId = req.query.paymentId;
    const token = req.query.token;
    const payerId = req.query.PayerID;

    Donation.findOne({
            where: {
                ppId: transactionId
            }
        })
        .then(foundTransaction => {
            return foundTransaction.update({
                state: 'completed',
                token: token,
                payerId: payerId
            })
        })
        .then(updatedTransaction => {
            return Project.findById(updatedTransaction.projectId)
                .then(foundProject => {
                    let totalRaised = foundProject.raised;
                    return foundProject.update({
                        raised: totalRaised + updatedTransaction.amount
                    });
                });
        })
        .then(() => {
            res.redirect('/donation/ok');
        })
        .catch(next);
});

// Collect $$$ / KO response from Paypal
router.get('/collect/ko', (req, res) => {
    res.json(req.query);
});


// Payout $$$
router.post('/payout', ensureAuthenticated, (req, res) => {
    let bountyId = req.body.bountyId;
    let transaction = PaypalHelper.createPayoutTransaction(req.body);


    promisePPPayout(transaction)
        .then(() => {
            return Bounty.findById(bountyId);
        })
        .then(foundBounty => {
            return foundBounty.update({
                status: 'paid'
            });
        })
        .then(updatedBounty => {
            return [Project.findById(updatedBounty.projectId), updatedBounty.amount];
        })
        .spread((foundProject, bountyAmount) => {
            let fundsOnHold = foundProject.fundsOnHold;
            let paidOut = foundProject.paidOut;

            return foundProject.update({
                fundsOnHold: fundsOnHold - bountyAmount,
                paidOut: paidOut + bountyAmount
            });
        })
        .then(updatedProject => {
            if (updatedProject) {
                res.json({ status: 'ok' })
            }
        })
        .catch(console.error);
});

// Get Donations History
router.get('/history/:projectId', (req, res) => {
    Donation.findAll({
            attributes: ['id', 'amount', [sequelize.fn('date_trunc', 'day', sequelize.col('createdAt')), 'day']],
            where: {
                projectId: req.params.projectId
            },
            order: [['createdAt', 'ASC']]
        })
        .then(donations => {
            return donations.map(donation => {
                return [moment(donation.dataValues.day).valueOf(), donation.amount];
            });
        })
        .then(res.json.bind(res))
        .catch(console.error);
});

module.exports = router;
