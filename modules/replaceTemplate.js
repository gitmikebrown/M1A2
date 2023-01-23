
module.exports = (htmlStr, course, PV)=>{ // fat arrow function or lambda
    let output = htmlStr.replace(/{%CUSTOMERNAME%}/g, course.customerName);
    output = output.replace(/{%PHONENUMBER%}/g, course.phoneNumber);
    output = output.replace(/{%ADDRESS%}/g, course.address);
    output = output.replace(/{%MONTHLYPAYMENT%}/g, course.monthlyPayment);
    output = output.replace(/{%INTERESTRATE%}/g, course.interestRate);
    output = output.replace(/{%LOANTERMYEARS%}/g, course.loanTermYears);
    output = output.replace(/{%LOANTYPE%}/g, course.loanType);
    output = output.replace(/{%DESCRIPTION%}/g, course.description);
    output = output.replace(/{%LOANAMOUNT%}/g, PV);
    return output;
}