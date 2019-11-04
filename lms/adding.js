const fs = require('fs');
const express = require('express');

const Router = express.Router();

const mydatabase = require('./database');

Router.get('/', (req, res) => {
    res.render('admin', {});
});

Router.get('/view/:id', (req, res) => {
    let table = req.params.id;
    var SQL;
    switch (table) {
        case "customer":
            SQL = 'SELECT * FROM customer';
            break;
        case "staff":
            SQL = 'SELECT * FROM staff';
            break;
        case "department":
            SQL = 'SELECT * FROM department';
            break;
        case "loan":
            SQL = 'SELECT * FROM loan';
            break;
        case "loan_type":
            SQL = 'SELECT * FROM loan_type';
            break;
        case "payment":
            SQL = 'SELECT * FROM payment';
            break;
        case "transaction_type":
            SQL = 'SELECT * FROM transaction_type';
            break;
        case "access":
            SQL = 'SELECT * FROM access';
            break;
        case "access_type":
            SQL = 'SELECT * FROM access_type';
            break;
        default:
            break;

    }
    mydatabase.query(SQL, (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log(result);
        res.render('view', {
            table: table,
            sql: SQL,
            tableSQL: result
        });
    })

});

Router.get('/add/:id', (req, res) => {
    let table = req.params.id;

    res.render('addCustomer', {
        table: table
    })
});

Router.post('/add/:id', (req, res) => {
    let table = req.params.id;

    switch (table) {
        case "customer":
            var first_name = req.body.first_name;
            var last_name = req.body.last_name;
            var email = req.body.email;
            var address = req.body.address;
            var postal_code = req.body.postal_code;
            var handphone = req.body.handphone;
            var date_of_birth = req.body.DOB;
            var job_title = req.body.job_title;
            var company = req.body.company;
            var annualSalary = req.body.salary;
            var userName = req.body.userName;
            var password = req.body.password;

            var query = "call insert_customer_All(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            mydatabase.query(query, [first_name, last_name, email, address, postal_code, handphone, date_of_birth, company, job_title, annualSalary, userName, password], (err, result) => {
                console.log(result);

                if (err) {
                    return res.status(500).send(err);
                }

                res.redirect('/admin/view/customer');
            })
            
            break;
        case "staff":
            var first_name = req.body.first_name;
            var last_name = req.body.last_name;
            var email = req.body.email;
            var position = req.body.position;
            var department_id = req.body.department_id;
            var userName = req.body.userName;
            var password = req.body.password;

            var query = "call insert_staff_ALL(?,?,?,?,?,?,?)";

            mydatabase.query(query, [first_name, last_name, email, position, department_id, userName, password], (err, result) => {
                console.log(result);

                if (err) {
                    return res.status(500).send(err);
                }

                res.redirect('/admin/view/staff');
            })

            break;
        case "department":
            SQL = 'SELECT * FROM department';

            mydatabase.query(query, [first_name, last_name, email, address, postal_code, handphone, date_of_birth, company, job_title, annualSalary, userName, password], (err, result) => {
                console.log(result);

                if (err) {
                    return res.status(500).send(err);
                }

                res.redirect('admin/view/customer');
            })
            break;
        case "loan":
            SQL = 'SELECT * FROM loan';

            mydatabase.query(query, [first_name, last_name, email, address, postal_code, handphone, date_of_birth, company, job_title, annualSalary, userName, password], (err, result) => {
                console.log(result);

                if (err) {
                    return res.status(500).send(err);
                }

                res.redirect('admin/view/customer');
            })
            break;
        case "loan_type":
            SQL = 'SELECT * FROM loan_type';

            mydatabase.query(query, [first_name, last_name, email, address, postal_code, handphone, date_of_birth, company, job_title, annualSalary, userName, password], (err, result) => {
                console.log(result);

                if (err) {
                    return res.status(500).send(err);
                }

                res.redirect('admin/view/customer');
            })
            break;
        case "payment":
            SQL = 'SELECT * FROM payment';

            mydatabase.query(query, [first_name, last_name, email, address, postal_code, handphone, date_of_birth, company, job_title, annualSalary, userName, password], (err, result) => {
                console.log(result);

                if (err) {
                    return res.status(500).send(err);
                }

                res.redirect('admin/view/customer');
            })
            break;
        case "transaction_type":
            SQL = 'SELECT * FROM transaction_type';

            mydatabase.query(query, [first_name, last_name, email, address, postal_code, handphone, date_of_birth, company, job_title, annualSalary, userName, password], (err, result) => {
                console.log(result);

                if (err) {
                    return res.status(500).send(err);
                }

                res.redirect('admin/view/customer');
            })
            break;
        case "access":
            SQL = 'SELECT * FROM access';

            mydatabase.query(query, [first_name, last_name, email, address, postal_code, handphone, date_of_birth, company, job_title, annualSalary, userName, password], (err, result) => {
                console.log(result);

                if (err) {
                    return res.status(500).send(err);
                }

                res.redirect('admin/view/customer');
            })
            break;
        case "access_type":
            SQL = 'SELECT * FROM access_type';

            mydatabase.query(query, [first_name, last_name, email, address, postal_code, handphone, date_of_birth, company, job_title, annualSalary, userName, password], (err, result) => {
                console.log(result);

                if (err) {
                    return res.status(500).send(err);
                }

                res.redirect('admin/view/customer');
            })
            break;
        default:
            break;

    }


});




Router.get('/edit/:id', (req, res) => {
    let table = req.params.id;
    let id = req.query.id;
    var SQL;

    if (table == "access") {
        SQL = "Select * from access where account_id = ? AND accesstype_id = ?";
        let id2 = req.query.id2;
        mydatabase.query(SQL, [id, id2], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result);
            res.render('edit', {
                table: table,
                sql: SQL,
                tableSQL: result
            });
        })
    }
    else {
        switch (table) {
            case "customer":
                SQL = "Select * from customer where cus_id = ?;";
                break;
            case "staff":
                SQL = 'SELECT * FROM staff where staff_id = ?';
                break;
            case "department":
                SQL = 'SELECT * FROM department where department_id = ?';
                break;
            case "loan":
                SQL = 'SELECT * FROM loan where loan_id = ?';
                break;
            case "loan_type":
                SQL = 'SELECT * FROM loan_type where loan_type_id = ?';
                break;
            case "payment":
                SQL = 'SELECT * FROM payment where payment_id = ?';
                break;
            case "transaction_type":
                SQL = 'SELECT * FROM transaction_type where transaction_id = ?';
                break;
            case "access":
                SQL = 'SELECT * FROM access where access_id = ?';
                break;
            default:
                break;

        }


        mydatabase.query(SQL, [id], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            console.log(result);
            res.render('edit', {
                table: table,
                sql: SQL,
                tableSQL: result
            });
        })
    }
});

Router.post('/edit/:id', (req, res) => {
    let table = req.params.id;
    let cus_id = req.query.cus_id;
    let first_name = req.body.first_name;
    var SQL = "Update customer set first_name = ? where cus_id = ?;";


    mydatabase.query(SQL, [first_name, cus_id], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log("Updated");
        res.redirect('/admin/view?table=customer');
    })
});


Router.get('/delete/:id',(req, res) => {
    let table = req.params.id;
    let accountid = req.query.accountid;
    let accesstypeid = req.query.accesstypeid;
    var SQL = "DELETE FROM access WHERE accesstype_id = ? AND account_id = ?;";


    mydatabase.query(SQL, [accesstypeid, accountid], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        console.log("Updated");
        res.redirect('/admin/view?table=customer');
    })
});

module.exports = Router;
/*{

    addCustomerPage: (req, res) => {
        res.render('addCustomer', {})
    },
    addCustomer: (req, res) => {
        let cusID = req.body.cusID;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let address = req.body.address;
        let postal_code = req.body.postal_code;
        let handphone = req.body.handphone;
        let date_of_birth = req.body.DOB;
        let job_title = req.body.job_title;
        let company = req.body.company;
        let annualSalary = req.body.salary;
        let userName = req.body.userName;
        let password = req.body.password;

        let query = "Insert INTO customer values ( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

        mydatabase.query(query, [cusID,first_name,last_name,email,address,postal_code,handphone,date_of_birth,job_title,company,annualSalary, userName, password] , (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        })

    },
    addStaffPage: (req, res) => {
        res.render('addStaff', {})
    },
    addStaff: (req,res) => {
        let staID = req.body.userID;
        let first_name = req.body.first_name;
        let last_name = req.body.last_name;
        let email = req.body.email;
        let position = req.body.position;
        let departmentID = req.body.departmentID;
        let userName = req.body.userName;
        let password = req.body.password;

        let query = "Insert INTO staff values (?, ?, ?, ?, ?, ?, ?, ?);";

        mydatabase.query(query, [staID, first_name, last_name, email, position, departmentID, userName, password], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        })
    },
    addDepartmentPage: (req, res) => {
        res.render('addDepartment', {})
    },
    addDeparment: (req,res) => {
        let departmentID = req.body.departmentID;
        let name = req.body.name;

        let query = "Insert into department values (?, ?);";
        mydatabase.query(query, [departmentID, name], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        })
    },
    addDepartmentPage: (req, res) => {
        res.render('addDepartment', {})
    },
    addLoanRequest: (req,res) => {
        let requestID = req.body.requestID;
        let status = req.body.status;
        let remark = req.body.remark;
        let approverID = req.body.approverID;
        let accountID = req.body.accountID;
        let loanID = req.body.loanID;
        let loanTypeID = req.body.loanTypeID;
        let loanAmount = req.body.loanAmount;

        let query = "Insert into request (requestID, status, remark, approverID, accountID, loanID, loanTypeID, loanAmount) values (?, ?, ?, ?, ?, ?, ?, ?);"

        mydatabase.query(query, [requestID, status,remark, approverID, accountID, loanID, loanTypeID, loanAmount], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        })

    },
    addLoanPage: (req, res) => {
        res.render('addLoan', {})
    },
    addLoan: (req,res) => {
        let loanID = req.body.loanID;
        let loanTypeID = req.body.loanTypeID;
        let accountID = req.body.accountID;
        let loanAmount = req.body.loanAmount;
        let outstandingAmount = req.body.outstandingAmount;
        let startDate = req.body.startDate;
        let dueData = req.body.dueData;

        let query = "Insert into loan values (?, ?, ?, ?, ?, ?, ?);";

        mydatabase.query(query, [loanID, loanTypeID, accountID, loanAmount, outstandingAmount, startDate, dueData], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        })
    },
    addPaymentPage: (req, res) => {
        res.render('addPayment', {})
    },
    addPayment: (req,res) => {
        let paymentID = req.body.paymentID;
        let transactionID = req.body.transactionID;
        let loanID = req.body.loanID;
        let amount = req.body.amount;
        let date = req.body.date;

        let query = "Insert into payment values ( ?, ?, ?, ?, ?);";

        mydatabase.query(query, [paymentID, transactionID, loanID, amount, date], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        })
    },
    addTransactionTypePage: (req, res) => {
        res.render('TransactionType', {})
    },
    addTransactionType: (req,res) => {
        let transactionID = req.body.transactionID;
        let transactionName = req.body.transactionName;

        let query = "Insert into transaction_type values ('transactionID','transactionName');";

        mydatabase.query(query, [transactionID, transactionName], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        })
    },
    addAcessTypePage: (req, res) => {
        res.render('addAccessType', {})
    },
    addAccessType: (req,res) => {
        let accessTypeID = req.body.accessTypeID;
        let name = req.body.name;
        let approvalLimit = req.body.approvalLimit;
        let departmentID = req.body.departmentID;


        let query = "Insert into access_type values (?, ?, ?, ?);";

        mydatabase.query(query, [accessTypeID, name, approvalLimit, departmentID], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        })
    },
    addAccessPage: (req, res) => {
        res.render('addAccess', {})
    },
    addAccess: (req,res) => {
        let accountID = req.body.accountID;
        let accessTypeID = req.body.accessTypeID;

        let query = "Insert into access values ( ?, ?);";

        mydatabase.query(query, [accountID, accessTypeID], (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        })
    }

}*/