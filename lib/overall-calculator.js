// Mongo Collection(s)
import { PerItemTestResults } from '/imports/api/collections/perItemTestResults/perItemTestResults.js';

/* Function to Calculate Overall Items */
export const calculateOverallItems = function calculateOverallItems(configuration) {
    var overallItemTestResults = PerItemTestResults.find({ 
        'product.name': configuration.product.name,
        'testResults': { 
            $elemMatch: {
                'tester.name': configuration.tester.name,
                'parameter.name': configuration.parameter.name
            },
        }
    }, {
        sort: {
            measurement: 1
        },
    }).fetch();

    return calculateData(overallItemTestResults);
}