// Mongo Collection(s)
import { Testers } from '/imports/api/testers/testers.js';

if(Meteor.isServer) {
    Meteor.startup(function() {
        var knex = require('knex')({
            client: 'mysql',
            connection: {
                host : '127.0.0.1',
                user : 'root',
                password : '',
                database : 'flex'
            }
        });

        async function getTestResults() {
            return await knex.select('*').orderBy('id')
            .from('test_results')
            .limit(10);
        }

        (async function() {
            const result = await getTestResults();
            console.log('KNEX', result);

            result.forEach(element => {
                Testers.insert({
                    productName: element.product_name,
                    testerName: element.tester_name,
                    paramName: element.parameter_name,
                    sampleSize: element.sample_size,
                    createdAt: new Date()
                });
            });
        }())
    });
}