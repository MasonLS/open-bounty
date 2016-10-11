const path = require('path');
const env = require(path.join(__dirname, '../../env'));

module.exports = {
    createPayPalToken: req => {
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
        transaction.transactions[0].description = req.description;
        transaction.transactions[0].amount = {
            currency: 'USD',
            total: Number(req.amount).toFixed(2)
        }

        return transaction;
    },
    createPayPalPreTransaction: (payment, req) => {
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
            paypalEmail: req.paypalEmail,
            donorName: req.donorName,
            donationAnonymous: req.donationAnonymous,
            projectId: req.projectId
        };

        return responseTransaction;
    },
    createPayoutTransaction: (req) => {
        let sender_batch_id = Math.random().toString(36).substring(9);
        let transaction = {};

        transaction.sender_batch_header = {};
        transaction.sender_batch_header.email_subject = 'You have just received a payment!';
        transaction.sender_batch_header.sender_batch_id = sender_batch_id;
        transaction.items = [];
        transaction.items[0] = {};
        transaction.items[0].recipient_type = 'EMAIL';
        transaction.items[0].amount = {};
        transaction.items[0].amount.value = req.amount;
        transaction.items[0].amount.currency = 'USD';
        transaction.items[0].receiver = 'openbounty@aibu.it';
        transaction.items[0].note = req.note;
        transaction.items[0].sender_item_id = 'item2';

        return transaction;
    }
}
