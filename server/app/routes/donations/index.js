'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const path = require('path');
const paypal = require('paypal-rest-sdk');

const env = require(path.join(__dirname, '../../../env'));
const Donation = require(path.join(__dirname, '../../../db/models/donation'));
const Project = require(path.join(__dirname, '../../../db/models/project'));

paypal.configure(env.PAYPAL);

let ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};


// Collect $$$
router.post('/collect', (req, res, next) => {

    console.log(req.body);

    let transaction = {};

    transaction.intent = 'sale';
    transaction.payer = {
        payment_method: 'paypal'
    };
    transaction.redirect_urls = {
        return_url: env.APP_URL + '/api/donations/collect/ok',
        cancel_url: env.APP_URL + '/api/donations/collect/ko'
    };
    transaction.transactions = [];

    transaction.transactions[0] = {};
    transaction.transactions[0].description = req.body.description;
    transaction.transactions[0].amount = {
        currency: 'USD',
        total: Number(req.body.amount).toFixed(2)
    }

    paypal.payment.create(transaction, function(error, payment) {
        if (error) {
            throw error;
        } else {
            console.log(payment);
            let responseTransaction = {
                ppId: payment.id,
                intent: payment.intent,
                state: payment.state,
                paymentMethod: payment.payer.payment_method,
                amount: payment.transactions[0].amount.total,
                currency: payment.transactions[0].amount.currency,
                description: payment.transactions[0].description,
                selfUrl: payment.links[0].href,
                approvalUrl: payment.links[1].href,
                executeUrl: payment.links[2].href,
                paypalEmail: req.body.paypalEmail,
                donorName: req.body.donorName,
                donationAnonymous: req.body.donationAnonymous,
                projectId: req.body.projectId
            };

            Donation.create(responseTransaction)
                .then(ppResponse => res.json({
                    transaction: ppResponse,
                    message: 'to test, click on approval url and proceed with openbountyuser@aibu.it/openbountyuser'
                }))
                .catch(next);
        }
    });
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
            return Project.findById(updatedTransaction.id)
                .then(foundProject => {
                    let totalRaised = foundProject.raised;
                    return foundProject.update({
                        raised: totalRaised + updatedTransaction.amount
                    })
                    .then(updatedProject => {
                        console.log(updatedProject)
                    });
                });
        })
        .catch(next);

    res.redirect('/donation/ok');
});

// Collect $$$ / KO response from Paypal
router.get('/collect/ko', ensureAuthenticated, (req, res) => {
    res.json(req.query);
});


// Payout $$$
router.get('/payout', ensureAuthenticated, (req, res) => {

    let transaction = {};

    transaction.sender_batch_header.sender_batch_id = env.PAYPAL.client_id;
    transaction.sender_batch_header.email_subject = 'You have just received a payment!';
    transaction.items[0].recipient_type = 'EMAIL';
    transaction.items[0].amount.value = '10.00';
    transaction.items[0].amount.currency = 'USD';
    transaction.items[0].receiver = 'fsaitta@aibu.it';
    transaction.items[0].note = 'Thank you for your commits!';

    paypal.payout.create(transaction, true, function(error, payment) {
        if (error) {
            throw error;
        } else {
            console.log('Create Payout Response');
            res.json(payment);
        }
    });
});


module.exports = router;
