Insert into staff value ('staffID', 'first_name', 'last_name', 'email', 'position', 'departmentID');

Insert into account value ('acctID', 'userID', 'username', 'password');

Insert into customer value ('cusID', 'firstName', 'lastName', 'email', 'address', postalCode, handphone, 'dateOfBirth', 'company', 'jobTitle', annualSalary);

Insert into loanType value ('loanTypeID', 'name', 'desc', minAmount, maxAmount, duration, interest, lateInterest, 'departmentID', accessTypeID);

Insert into department value (departmentID, name);

Insert into request (requestID, status, remark, approverID, accountID, loanID, loanTypeID, loanAmount) value (requestID, status, remark, approverID, accountID, loanID, loanTypeID, loanAmount);

Insert into loan value (loanID, loanTypeID, accountID, loanAmount, outstandingAmount, startDate, dueData);

Insert into payment value ('paymentID', 'transactionID', 'loanID', amount, 'date');

Insert into transaction_type value ('transactionID','transactionName');

Insert into access_type value ('accessTypeID, 'name', 'approvalLimit', 'departmentID');

Insert into access value ('accountID', 'accessTypeID');
