var mongoose = require('mongoose');
var schedule = require('node-schedule');
var nodemailer = require('nodemailer');
//======================== add Doctor and Patient schemas ============================
var Coordinator = require('./models/coordinator');
var Patient = require('./models/patient');
//====================================================================================
module.exports = function (app, express) {
    var api = express.Router();
    function sendEmail(email) {
        var smtpTransport = nodemailer.createTransport({
            transport: "SMTP",
            host: 'smtp.gmail.com',
            secureConnection: true,
            port: 587,
            requiresAuth: true,
            auth: {
                user: 'aali.ibtekar@gmail.com',
                pass: '2662006AmirAmira'
            }
        });
        var mailOptions = {
            to: email.to,
            subject: email.subject,
            html: email.text
        }
        smtpTransport.sendMail(mailOptions, function (err, response) {
            if (err) {
                console.log(err);
                return err;
            }
            else
                return 100;
        });
    }
    function guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
              .toString(16)
              .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
          s4() + '-' + s4() + s4() + s4();
    }
    //> / for test
    api.get('/', function (req, res) {
        return res.json({ code: '100', data: 'API is working great' });
    });
    //get all Patients
    api.get('/Patient/List/', function (req, res) {
        Patient.find({}, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else
                res.json({ code: '100', data: Obj });
        })
    });
    //get all patients for 
    api.get('/Patient/List/:Coordinatorid', function (req, res) {
        Patient.find({ Coordinator: req.params.Coordinatorid }, '', function (err, Obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else
                res.json({ code: '100', data: Obj });
        })
    });
    //get all plans for Patient
    api.get('/Patient/Plans/:PatientId', function (req, res) {
        Patient.find({ _id: req.params.PatientId }, 'Plan', function (err, obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else
                res.json({ code: '100', data: obj });
        })
    });
    //create coordinator
    api.post('/Coordinator/Create', function (req, res) {
        //check if email found or not
        Coordinator.findOne({ Email: req.body.Email }, '', function (err, obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                if (obj == null) {
                    //console.log('you can create your coordinator');
                    var _coordinator = new Coordinator({
                        Displayname: req.body.Displayname,
                        Password: req.body.Password,
                        Email: req.body.Email
                    });
                    _coordinator.save(function (err, obj) {
                        if (err)
                            return res.json({ code: '1', data: err });
                        else {
                            //console.log("created");
                            res.json({ code: '100', data: obj });
                        }
                    });
                }
                else {
                    //console.log("dublicated");
                    res.json({ code: '1', data: "This coordinator is found" });
                }
            }
        })
    });
    //create patient
    api.post('/Patient/Create', function (req, res) {
        //check coordinator id
        Coordinator.findOne({ _id: req.body.Coordinator }, '', function (err, obj) {
            if (err)//error
                return res.json({ code: "1", data: err });
            else if (obj == null)//coordinator not found
                return res.json({ code: "2", data: "this coordinator is not exist" });
            Patient.findOne(function (err, obj) {
                if (err)//error
                    return res.json({ code: "1", data: err });
                else {//patient not found
                    var _guid = guid();
                    if (req.body.Photo == 'NAN')
                        req.body.Photo = 'data:image/jpeg;base64,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';
                    var buff = new Buffer(req.body.Photo
                               .replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
                    require("fs").writeFile('public/' + _guid + ".png", buff, 'base64', function (err) {
                        if (err) {
                            console.log(err);
                            return res.json({ code: "5", data: err });

                        }
                        else {
                            var _patient = new Patient({
                                Coordinator: req.body.Coordinator,
                                Photo: _guid + ".png",
                                Lastname: req.body.Lastname,
                                Firstname: req.body.Firstname,
                                Middlename: req.body.Middlename,
                                Preferredname: req.body.Preferredname,
                                Email: req.body.Email,
                                Title: req.body.Title,
                                BloodType: req.body.BloodType,
                                Address: req.body.Address,
                                Column: req.body.Column,
                                Suburb: req.body.Suburb,
                                Postcode: req.body.Postcode,
                                State: req.body.State,
                                HomePhone: req.body.HomePhone,
                                MobilePhone: req.body.MobilePhone,
                                DateOfBirth: req.body.DateOfBirth,//new Date(),
                                Gender: req.body.Gender,
                                MedicareNumber: req.body.MedicareNumber,
                                MedicareRef: req.body.MedicareRef,
                                IHI: req.body.IHI,
                                IHIStatus: req.body.IHIStatus,
                                SMSoptout: req.body.SMSoptout,
                                Plan: [{
                                    Status: req.body.PlanStatus,
                                    StatusTo: req.body.PlanStatusTo,
                                    Title: req.body.PlanTitle,
                                    TittleTo: req.body.PlanTittleTo,
                                    Actions: req.body.PlanActions,
                                    ActionsTo: req.body.PlanActionsTo,
                                    ByWho: {
                                        Name: req.body.PlanByWhoName,
                                        Image: req.body.PlanByWhoImage
                                    },
                                    ByWhoTo: {
                                        Name: req.body.PlanByWhoToName,
                                        Image: req.body.PlanByWhoToImage
                                    },
                                    DueDate: req.body.PlanDueDate,//new Date(),
                                    DueDateTo: req.body.PlanDueDateTo,//new Date(),
                                    Timeline: [{
                                        Date: new Date(),
                                        Note: req.body.PlanTimelineNote
                                    }],
                                    TimelintTo: [{
                                        Date: new Date(),
                                        Note: req.body.PlanTimelineToNote
                                    }]
                                }]
                            });
                            _patient.save(function (err, Obj) {
                                if (err)
                                    return res.json({ code: '1', data: err });
                                else
                                    return res.json({ code: '100', data: Obj });
                            })
                        }
                    });
                }
            });
        });
    });
    //append plan
    api.post('/Patient/Plans/Append', function (req, res) {
        //patient plan
        Patient.findOne({ _id: req.body.PatientId }, 'Plan', function (err, obj) {
            if (err)
                return res.json({ code: '1', data: err });
            else {
                //return res.json({ code: '100', data: obj });

                //add plan
                obj.Plan.push({
                    Status: req.body.PlanStatus,
                    StatusTo: req.body.PlanStatusTo,
                    Title: req.body.PlanTitle,
                    TittleTo: req.body.PlanTittleTo,
                    Actions: req.body.PlanActions,
                    ActionsTo: req.body.PlanActionsTo
                    ,
                    ByWho: {
                        Name: req.body.PlanByWhoName,
                        Image: req.body.PlanByWhoImage
                    },
                    ByWhoTo: {
                        Name: req.body.PlanByWhoToName,
                        Image: req.body.PlanByWhoToImage
                    },
                    DueDate: req.body.PlanDueDate,//new Date(),
                    DueDateTo: req.body.PlanDueDateTo,// new Date(),
                    Timeline: [{
                        Date: new Date(),
                        Note: req.body.PlanTimelineNote
                    }],
                    TimelintTo: [{
                        Date: new Date(),
                        Note: req.body.PlanTimelineToNote
                    }]
                });
                //Save
                obj.save(function (err, obj) {
                    if (err)
                        return res.json({ code: '1', data: err });
                    else {
                        res.json({ code: '100', data: obj });
                    }
                });
            }
        })
    });
    // update user
    api.put('/Patient/Update', function (req, res) {
        Patient.findOne({ _id: req.body._id }, function (err, patient) {
            if (patient) {
                var _guid = guid();
                var buff = new Buffer(req.body.Photo
                           .replace(/^data:image\/(png|gif|jpeg);base64,/, ''), 'base64');
                require("fs").writeFile('public/' + _guid + ".png", buff, 'base64', function (err) {
                    if (err) {
                        console.log(err);
                        return res.json({ code: "5", data: err });
                    }
                    else {
                        req.body.Photo = _guid + ".png",
                        Patient.update({ _id: req.body._id }, req.body, { upsert: true }, function (err) {
                            if (err) {
                                res.json({ code: '1', data: formateError(err) });
                                return;
                            }
                            else {
                                res.json({ code: '100', data: 'Data updated' });
                            }
                        });
                    }
                });
            }
            else {
                res.json({ code: '2', message: 'No such patient' });
            }
        });
    });
    api.put('/Patient/Plans/Update', function (req, res) {
        Patient.findOne({ _id: req.body._id }, function (err, patient) {
            if (patient) {
                Patient.update({ _id: req.body._id }, req.body, { upsert: true }, function (err) {
                    if (err) {
                        res.json({ code: '1', data: formateError(err) });
                        return;
                    }
                    else {
                        if (req.body.Plans) {
                            console.log('Dirty Plans');
                            for (var i = 0 ; i < req.body.Plans.length; i++) {
                                var _Plan = req.body.Plans[i];
                                if (typeof (_Plan) == 'undefined')
                                    continue;
                                var _ByWhen = new Date(_Plan.ByWhen);
                                var _ByWhen2 = new Date(_Plan.ByWhen2);
                                var _ByWho = _Plan.ByWho;
                                var _ByWho2 = _Plan.ByWho2;
                                if (_ByWhen >= new Date() && _ByWho) {
                                    var _Email = _ByWho.split('[');
                                    if (_Email && _Email.length > 0) {
                                        var mail = {
                                            to: _Email[1].replace(']', ''),
                                            subject: 'Nomadic Care | Plan Reminder',
                                            text: 'Dear ' + _Email[0] + '<br/><br/>\
                                               This is a gentle reminder about your plan due date on <br/>\
                                               ' + _Plan.ByWhen + '<br/>\
                                               <br/>\
                                               Nomadic Care Team'
                                        }
                                        sendEmail(mail);
                                        var j = schedule.scheduleJob('* * 8 * ' + _ByWhen.getDay(), function () {
                                            sendEmail(mail);
                                        });
                                        var result = new Date(_ByWhen);
                                        result.setDate(result.getDate() + 7);
                                        console.log('Sending');
                                        console.log(mail);
                                        var jj = schedule.scheduleJob(result, function () {
                                            sendEmail(mail);
                                        });
                                    }
                                }
                                else if (_ByWhen2 >= new Date() && _ByWho2) {
                                    var _Email = _ByWho2.split('[');
                                    if (_Email && _Email.length > 0) {
                                        var mail = {
                                            to: _Email[1].replace(']', ''),
                                            subject: 'Nomadic Care | Plan Reminder',
                                            text: 'Dear ' + _Email[0] + '<br/><br/>\
                                               This is a reminder about your plan due date on <br/>\
                                               ' + _Plan.ByWhen2 + '<br/>\
                                               <br/>\
                                               Nomadic Care Team'
                                        }
                                        sendEmail(mail);
                                        var j = schedule.scheduleJob('* * 8 * ' + _ByWhen2.getDay(), function () {
                                            sendEmail(mail);
                                        });
                                        var result = new Date(_ByWhen2);
                                        console.log('Sending');
                                        console.log(mail);
                                        result.setDate(result.getDate() + 7);
                                        var jj = schedule.scheduleJob(result, function () {
                                            sendEmail(mail);
                                        });
                                    }
                                }
                            }
                        }
                        res.json({ code: '100', data: 'Data updated' });
                    }
                });
            }
            else {
                res.json({ code: '2', message: 'No such patient' });
            }
        });
    });
    api.get('/DB/CLEAR/5678', function (req, res) {
        Patient.remove({}, function (err, removed) {
            if (err)
                res.json(formateError(err));
            else
                res.json({ type: '100', data: removed });
        });
    });


    return api;
};