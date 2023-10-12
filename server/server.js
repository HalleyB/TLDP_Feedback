var cors = require('cors');
var express = require('express');
const bodyParser = require('body-parser');
var dao = require('./data_access.js');

let app = express()
app.use(cors())
app.use(bodyParser.json());
let port = 3001

app.get('/api/getEmployeeID/:username', cors(), (req, res) => {
    dao.call('getEmployeeId', { username: req.params.username}, (results) => {
        if(!results.employeeId) {
            res.statusCode = 404;
            res.end()
        } else {
            res.send(results.employeeId)
        }
    })
})

app.get('/api/getManagerID', cors(), (req, res) => {
    dao.call('getManagerId', {}, (results) => {
        if(!results.managerId) {
            res.statusCode = 404;
            res.end()
        } else {
            res.send(results.managerId)
        }
    })
})

app.get('/api/:managerID/managerGetFeedback', cors(), (req, res) => {
    dao.call('managerGetAllFeedback', {}, (results)=> {
        if (!results.feedback) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.feedback)
        }
        } )
})

app.get('/api/:managerID/managerPreviousResponses', cors(), (req, res) => {
    dao.call('managerGetPreviousResponses', {}, (results)=> {
        if (!results.responses) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.responses)
        }
        } )
})

app.get('/api/:employeeID/employeePreviousFeedback', cors(), (req, res) => {
    dao.call('employeeGetPreviousFeedback', {}, (results)=> {
        if (!results.feedback) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.feedback)
        }
        } )
})

app.get('/api/:employeeID/employeeManagerResponses', cors(), (req, res) => {
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

app.put('/api/:managerID/managerResponse', cors(), (req, res) => {
    dao.call('managerResponseToFeedback', {response: 'Hello there'}, (results) => {
        if (!results.status) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.status)
        }
    })
})

app.put('/api/:employeeID/employeeGiveFeedback', cors(), (req, res) => {
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