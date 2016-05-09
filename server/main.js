import {
    Meteor
} from 'meteor/meteor';

Meteor.startup(() => {
    // code to run on server at startup
});

// Global API configuration
var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true
});

// Generates: GET, POST on /api/items and GET, PUT, DELETE on
// /api/items/:id for the Items collection
Api.addCollection(Transactions);

// Generates: POST on /api/users and GET, DELETE /api/users/:id for
// Meteor.users collection
// Api.addCollection(Meteor.users, {
//     excludedEndpoints: ['getAll', 'put'],
//     routeOptions: {
//         authRequired: true
//     },
//     endpoints: {
//         post: {
//             authRequired: false
//         },
//         delete: {
//             roleRequired: 'admin'
//         }
//     }
// });

Meteor.publish('transactions', function() {
    return Transactions.find();
});

Meteor.publish('transaction', function(id) {
    return Transactions.find({
        _id: id
    });
});
