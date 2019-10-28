const fs = require('fs');

module.exports = {
    adminPage: (req, res) => {
        res.render('admin', {})
    },
    viewTable: (req, res) => {
        let table = req.query.table;
        var SQL;
        switch(table){
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
            case "request":
                    SQL = 'SELECT * FROM request';
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
                table:table,
                sql: SQL,
                tableSQL: result
                });
        })
            
    },
    viewStaff: (req, res) => {
        let table = req.query.table;

        res.render('viewStaff', {
            table:table
        })
    },
    viewDepartment: (req, res) => {
        res.render('viewDepartment', {})
    },
    viewLoan: (req, res) => {
        res.render('viewLoan', {})
    },
    viewLoanRequest: (req, res) => {
        res.render('viewLoanRequest', {})
    },
    viewPayment: (req, res) => {
        res.render('viewPayment', {})
    },
    viewTransactionType: (req, res) => {
        res.render('viewTransactionType', {})
    },
    viewAccess: (req, res) => {
        res.render('viewAccess', {})
    },
    viewAccessType: (req, res) => {
        res.render('viewAccessType', {})
    },
    editPage: (req, res) => {
        res.render('viewAccessType', {})
    }
}