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

app.get('/api/getManagerID/:username', cors(), (req, res) => {
    dao.call('getManagerId', {username: req.params.username}, (results) => {
        if(!results.managerId) {
            res.statusCode = 404;
            res.end()
        } else {
            res.send(results.managerId)
        }
    })
})

app.get('/api/:managerID/managerGetFeedback', cors(), (req, res) => {
    dao.call('managerGetAllFeedback', {employeeId: req.params.managerID}, (results)=> {
        if (!results.feedback) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.feedback)
        }
        } )
})

app.get('/api/:managerID/managerPreviousResponses', cors(), (req, res) => {
    dao.call('managerGetPreviousResponses', {employeeId: req.params.managerID}, (results)=> {
        if (!results.responses) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.responses)
        }
        } )
})

app.get('/api/:employeeID/employeePreviousFeedback', cors(), (req, res) => {
    dao.call('employeeGetPreviousFeedback', {employeeId: req.params.employeeID}, (results)=> {
        if (!results.employeeFeedback) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.employeeFeedback)
        }
        } )
})

app.get('/api/:employeeID/employeeManagerResponses', cors(), (req, res) => {
    dao.call('employeeGetResponses', {employeeId: req.params.employeeID}, (results)=> {
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

app.get('/api/lastFeedback', cors(), (req, res) => {
    dao.call('lastFeedback', {}, (results) => {
        if (!results.lastFeedback) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(JSON.stringify(results.lastFeedback[0].feedback_id))
        }
    })
})

app.get('/api/lastEmployee', cors(), (req, res) => {
    dao.call('lastEmployee', {}, (results) => {
        if (!results.lastEmployee) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(JSON.stringify(results.lastEmployee[0].employee_id))
        }
    })
})

app.post('/api/newEmployee', cors(), (req, res) => {
    dao.call('addNewEmployee', {employeeObject: req.body}, (results) => {
        if (!results.statusNew) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.statusNew)
        }
    })
})

app.post('/api/:managerID/managerResponse', cors(), (req, res) => {
    dao.call('managerResponseToFeedback', {response: 'Hello there'}, (results) => {
        if (!results.statusNew) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.statusNew)
        }
    })
})

app.post('/api/:employeeID/employeeGiveFeedback', cors(), (req, res) => {
    console.log(typeof req.body)
    dao.call('employeeGiveFeedback', {feedback: req.body}, (results) => {
        if (!results.statusNew) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.statusNew)
        }
    })
})

app.post('/api/pythonAnalysis', cors(), (req, res) => {
    dao.call('pythonGiveAnalysis', {analysis: 'snake'}, (results) => {
        if (!results.statusNew) {
            res.statusCode = 404;
            res.end();
        } else {
            res.send(results.statusNew)
        }
    })
})


app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})