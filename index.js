// Your code here
function createEmployeeRecord([firstName, familyName, title, payPerHour]) {

    return {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []

    }
}


function createEmployeeRecords(workerArray) {
    return workerArray.map(function ([firstName, familyName, title, payPerHour]) {
        return createEmployeeRecord([firstName, familyName, title, payPerHour]);

    });
}


function createTimeInEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    })
    return employee;
}


function createTimeOutEvent(employee, dateStamp) {
    let [date, hour] = dateStamp.split(" ");
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour, 10),
        date: date,
    });
    return employee;
}

function hoursWorkedOnDate(employee, currentDate) {
    let clockInEvent = employee.timeInEvents.find(function (e) {
        return e.date === currentDate;
    });

    let clockOutEvent = employee.timeOutEvents.find(function (e) {
        return e.date === currentDate;
    });

    return (clockOutEvent.hour - clockInEvent.hour) / 100;

}


function wagesEarnedOnDate(employee, currentDate) {
    let grossWage = hoursWorkedOnDate(employee, currentDate) * employee.payPerHour;
    return parseFloat(grossWage.toString());
}


function allWagesFor(employee) {
    let payDates = employee.timeInEvents.map(function (e) {
        return e.date;
    });

    let paycheck = payDates.reduce(function (pay, net) {
        return pay + wagesEarnedOnDate(employee, net);
    }, 0);
    return paycheck;

}



function calculatePayroll(arrayOfEmployeeRecords) {
    return arrayOfEmployeeRecords.reduce(function (pay, records) {
        return pay + allWagesFor(records);

    }, 0);
}




