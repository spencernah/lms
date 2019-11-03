const fs = require('fs');
const express = require('express');

const Router = express.Router();
const {
    promisify,
} = require('util');


const mydatabase = require('./database');


const queryAsync = promisify(mydatabase.query).bind(mydatabase);

Router.get('/', async (req, res) => {

    if (req.session.loggedin && req.session.staff) {

        let staff_profile = 'select s.first_name, s.last_name, s.position, d.name from staff s, department d where s.department_id = d.department_id AND s.staff_id = ?;';
        let access_SQL = 'select acty.name from access_type acty where exists (select * from access ac where ac.accesstype_id = acty.access_id AND ac.account_id = ?); ';
        let approveLoanSQL = 'select l.loan_id, lt.name, l.loan_amount, c.first_name from loan l, loan_type lt, customer c where l.account_id = c.cus_id AND l.status = "new" AND lt.loan_type_id = l.loan_type_id AND exists (select acty.department_id from access_type acty where lt.department_id = acty.department_id AND acty.approval_limit >= l.loan_amount AND exists (select * from access ac where ac.accesstype_id = acty.access_id AND ac.account_id = ? )); ';
        let approveLoan = {};
        let accessRes = {};
        let staffRes = {};

        accessRes = await queryAsync(access_SQL, [req.session.sta_id]);
        staffRes = await queryAsync(staff_profile, [req.session.sta_id]);
        approveLoan = await queryAsync(approveLoanSQL, [req.session.sta_id]);


        res.render('staff', {
            staffID: req.session.sta_id,
            staffRes: staffRes[0],
            accessRes: accessRes,
            approveLoan: approveLoan

        });

    } else {
        res.send('Please login to view this page!');
    }


});


Router.post('/update/:id', (req, res) => {
    if (req.session.loggedin && req.session.staff) {
        let loan_id = req.params.id;

        let updateApproveSQL = 'call approval_update(?,?)';
        mydatabase.query(updateApproveSQL, [loan_id, req.session.sta_id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        })
    } else {
        res.send('Please login to view this page!');
    }

})

Router.get('/loan', async (req, res) => {
    if (req.session.loggedin && req.session.staff) {
        let query = 'Select * from lms.loan_view lv WHERE EXISTS (SELECT * from access a, access_type acty WHERE lv.loanType_departmentID = acty.department_id AND a.accesstype_id = acty.access_id AND a.account_id = ?)'
        let SQLresult = {}
        SQLresult = await queryAsync(query, [req.session.sta_id]);
        
        res.render('currentLoan', {
            
            exisitngLoan: SQLresult

        });


    } else {
        res.send('Please login to view this page!');
    }
})

Router.get('/loanCustomer',async (req, res) => {
    if (req.session.loggedin && req.session.staff) {
        let query = 'Select * from lms.loan_view lv WHERE EXISTS (SELECT * from access a, access_type acty WHERE lv.loanType_departmentID = acty.department_id AND a.accesstype_id = acty.access_id AND a.account_id = ?)'
        let SQLresult = {}
        SQLresult = await queryAsync(query, [req.session.sta_id]);
        
        res.render('currentLoan', {
            
            exisitngLoan: SQLresult

        });


    } else {
        res.send('Please login to view this page!');
    }
    })


module.exports = Router;