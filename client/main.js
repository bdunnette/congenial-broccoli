import {
    Template
} from 'meteor/templating';

import {
    ReactiveVar
} from 'meteor/reactive-var';

import './main.html';

Template.hello.onCreated(function helloOnCreated() {
    // counter starts at 0
    this.counter = new ReactiveVar(0);
});

Template.hello.onCreated(function() {
    var self = this;
    self.autorun(function() {
        self.subscribe('transactions');
    });
});

Template.hello.helpers({
    transactions: function() {
        return Transactions.find();
    }
});

Template.hello.events({

});

Template.transaction.onCreated(function() {
    var self = this;
    self.autorun(function() {
        var transactionId = FlowRouter.getParam('transactionId');
        self.subscribe('transaction', transactionId);
    });
});

Template.transaction.helpers({
    transaction: function() {
        var transactionId = FlowRouter.getParam('transactionId');
        return Transactions.findOne({
            _id: transactionId
        });
    }
});

FlowRouter.route('/', {
    action: function() {
        BlazeLayout.render("mainLayout", {
            content: "hello"
        });
    }
});

FlowRouter.route('/transaction/:transactionId', {
    name: 'transaction',
    action: function(params) {
        BlazeLayout.render("mainLayout", {
            content: "transaction"
        });
    }
});
