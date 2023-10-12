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
    const employeeC = db.collection('employee_data')
    const feedbackC = db.collection('feedback_data')
    const responseC = db.collection('response_data')

    switch(operation) {
        // read
        case 'getEmployeeId':
            const employeeId = await employeeC.findOne({'employee_info.username': parameters.username})
            callback({employeeId: employeeId})
            break;

        case 'getManagerId':
            const managerId = await employeeC.findOne({'employee_info.username': parameters.username})
            callback({managerId: managerId})
            break;

        case 'managerGetAllFeedback':
            const feedback = await feedbackC.find({'manager_id': +parameters.employeeId}).toArray()
            callback({ feedback: feedback});
            break;

        case 'managerGetPreviousResponses':
            const responses = await responseC.find({'manager_id': +parameters.employeeId}).toArray()
            callback({ responses: responses})
            break;

        case 'employeeGetPreviousFeedback':
            const employeeFeedback = await feedbackC.find({'employee_id': +parameters.employeeId}).toArray()
            callback({ employeeFeedback: employeeFeedback})
            break;
        
        case 'employeeGetResponses':
            const employeeManagerResponses = await responseC.find({'employee_id':  +parameters.employeeId}).toArray()
            callback({ responses: employeeManagerResponses})
            break;

        case 'pythonGetData':
            callback({ data: "Here's some data"})
            break;

        case 'lastFeedback':
            const lastFeedbackNumber = await feedbackC.find({}).sort({_id:-1}).limit(1).toArray();
            callback({ lastFeedback: lastFeedbackNumber})
            break;

        case 'lastEmployee':
            const lastEmployeeNumber = await employeeC.find({}).sort({_id:-1}).limit(1).toArray();
            callback({ lastEmployee: lastEmployeeNumber})
            break;

        // create
        case 'managerResponseToFeedback':
            callback({ statusNew: 'Response sucessful ' + parameters.response})
            break;

        case 'employeeGiveFeedback':
            await feedbackC.insertOne(parameters.feedback)
            .then(
                (result)=>{callback({ statusNew: 'Feedback submitted succesfully'})},
                (reason)=>{callback({ statusNew: 'Error submitting feedback'})}
            )
            break;

        case 'addNewEmployee':
            await employeeC.insertOne(parameters.employeeObject)
            .then(
                (result)=>{callback({ statusNew: 'Employee added succesfully'})},
                (reason)=>{callback({ statusNew: 'Failed to add employee'})}
            )

        case 'pythonGiveAnalysis':
            callback({ status: 'Alalysis sucessful ' + parameters.analysis})
            break;
    }

    console.log( 'call complete: ' + operation );
    // client.close();
    return 'call complete';
}