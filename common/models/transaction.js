Transactions = new Mongo.Collection("transactions");

TransactionLineSchema = new SimpleSchema({
    description: {
        type: String
    },
    quantity: {
        type: Number,
        defaultValue: 1
    },
    eachPrice: {
        type: Number,
        defaultValue: 1
    },
    extendedPrice: {
        type: Number,
        autoValue: function() {
            return this.siblingField('quantity').value * this.siblingField('eachPrice').value;
        }
    }
});

function getSum(total, line) {
    return total + line.extendedPrice;
}

TransactionSchema = new SimpleSchema({
    date: {
        type: Date,
        autoValue: function() {
            if (this.isInsert) {
                return new Date();
            } else if (this.isUpsert) {
                return {
                    $setOnInsert: new Date()
                };
            } else {
                this.unset(); // Prevent user from supplying their own value
            }
        }
    },
    items: {
        type: [TransactionLineSchema]
    },
    total: {
        type: Number,
        defaultValue: 0
    }
});

Transactions.attachSchema(TransactionSchema);

Transactions.before.update(function(userId, doc, fieldNames, modifier, options) {
    console.log(modifier);
    if (modifier.$push && modifier.$push.items) {
        modifier.$inc = {
            total: modifier.$push.items.extendedPrice
        };
        console.log(modifier);
    }
}, {
    fetchPrevious: false
});
