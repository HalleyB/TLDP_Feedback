var cors = require('cors');
var express = require('express');
const bodyParser = require('body-parser');
var dao = require('./data_access.js');

let app = express()
app.use(cors())
app.use(bodyParser.json());
let port = 3001

app.get('/api/managerGetFeedback', cors(), (req, res) => {
    dao.call('managerGetAllFeedback', {}, (results)=> {
        console.log('here')
        if (!results.feedback) {
            res.statusCode = 404;
            res.end();
        } else {
            console.log(results.feedback)
            res.send(results.feedback)
        }
        } )
})

app.get('/api/managerPreviousResponses', cors(), (req, res) => {
    dao.call('managerGetPreviousResponses', {}, (results)=> {
        if (!results.responses) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.responses)
        }
        } )
})

app.get('/api/employeePreviousFeedback', cors(), (req, res) => {
    dao.call('employeeGetPreviousFeedback', {}, (results)=> {
        if (!results.feedback) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.feedback)
        }
        } )
})

app.get('/api/employeeManagerResponses', cors(), (req, res) => {
    dao.call('employeeGetResponses', {}, (results)=> {
        if (!results.responses) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.responses)
        }
        } )
})


app.get('/api/pythonGetData', cors(), (req, res) => {
    dao.call('pythonGetData', {}, (results)=> {
        if (!results.data) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.data)
        }
        } )
})

app.put('/api/managerResponse', cors(), (req, res) => {
    dao.call('managerResponseToFeedback', {response: 'Hello there'}, (results) => {
        if (!results.status) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.status)
        }
    })
})

app.put('/api/employeeGiveFeedback', cors(), (req, res) => {
    dao.call('employeeGiveFeedback', {feedback: 'GENERAL KENOBI'}, (results) => {
        if (!results.status) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.status)
        }
    })
})

app.put('/api/pythonAnalysis', cors(), (req, res) => {
    dao.call('pythonGiveAnalysis', {analysis: 'snake'}, (results) => {
        if (!results.status) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.status)
        }
    })
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})