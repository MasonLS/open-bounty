'use strict';
const router = require('express').Router(); // eslint-disable-line new-cap
const path = require('path');
const paypal = require('paypal-rest-sdk');

const env = require(path.join(__dirname, '../../../env'));
const Payment = require(path.join(__dirname, '../../../db/models/payment'));

paypal.configure(env.PAYPAL);

let ensureAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(401).end();
    }
};


// Collect $$$
router.get('/collect', ensureAuthenticated, (req, res, next) => {

    let transaction = {};

    transaction.intent = 'sale';
    transaction.payer = {
        payment_method: 'paypal'
    };
    transaction.redirect_urls = {
        return_url: env.APP_URL + '/api/payments/collect/ok',
        cancel_url: env.APP_URL + '/api/payments/collect/ko'
    };
    transaction.transactions = [];

    transaction.transactions[0] = {};
    transaction.transactions[0].description = 'Fund for automated wiki generator';
    transaction.transactions[0].amount = {
        currency: 'USD',
        total: '10.00'
    }

    paypal.payment.create(transaction, function(error, payment) {
        if (error) {
            throw error;
        } else {
            console.log(payment);
            let response_transaction = {
                pp_id: payment.id,
                intent: payment.intent,
                state: payment.state,
                payment_method: payment.payer.payment_method,
                amount: payment.transactions[0].amount.total,
                currency: payment.transactions[0].amount.currency,
                description: payment.transactions[0].description,
                self_url: payment.links[0].href,
                approval_url: payment.links[1].href,
                execute_url: payment.links[2].href
            };

            Payment.create(response_transaction)
                .then(pp_response => res.json({
                    transaction: pp_response,
                    message: 'to test, click on approval url and proceed with openbountyuser@aibu.it/openbountyuser'
                }))
                .catch(next);
        }
    });
});


// Collect $$$ / OK response from Paypal
router.get('/collect/ok', ensureAuthenticated, (req, res, next) => {

    let transaction_id = req.query.paymentId;

    Payment.findOne({
            where: {
                pp_id: transaction_id
            }
        })
        .then(foundTransaction => {
            foundTransaction.update({
                state: 'completed'
            })
        })
        .catch(next);

    res.json(req.query);
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
