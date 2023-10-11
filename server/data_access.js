var mongodb = require("mongodb");
var dbPool; //Connection pool
var url = "mongodb://127.0.0.1:27017/Feedback";
const client = new mongodb.MongoClient(url);

mongodb.MongoClient.connect(url, function(err, db) {
    if (err === null) {
        dbPool = db; //Open the pool
    }
});

const dbName = 'Feedback'

module.exports.call = async function call(operation, parameters, callback) {
    // connect to the db server
    await client.connect();

    // set the database to use
    const db = client.db(dbName);
    // set the collection to use

    switch(operation) {
        // read
        case 'managerGetAllFeedback':
            const feedback = 'Manager Feedback'
            callback({ feedback: feedback});
            break;

        case 'managerGetPreviousResponses':
            callback({ responses: 'Previous Manager responses'})
            break;

        case 'employeeGetPreviousFeedback':
            callback({ feedback: 'Previous employee feedback'})
            break;
        
        case 'employeeGetResponses':
            callback({ responses: 'Responses from manager'})
            break;

        case 'pythonGetData':
            callback({ data: "Here's some data"})
            break;

        // create
        case 'managerResponseToFeedback':
            callback({ status: 'Response sucessful ' + parameters.response})
            break;

        case 'employeeGiveFeedback':
            callback({ status: 'Feedback sucessful ' + parameters.feedback})
            break;

        case 'pythonGiveAnalysis':
            callback({ status: 'Alalysis sucessful ' + parameters.analysis})
            break;
    }

    console.log( 'call complete: ' + operation );
    // client.close();
    return 'call complete';
}