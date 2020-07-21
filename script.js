let today = new Date();
let currentMonth = today.getMonth();
let currentYear = today.getFullYear();
let currentDay = today.getDate();
let nbDays = 0;
let tbl = document.getElementById("calendar-body");

let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function clearCal() {
    // Clears Screen
    document.getElementById("caldiv").hidden = true;
    document.getElementById("datePicker").value = "";
    document.getElementById("ctCode").value = "";
    document.getElementById("nbDays").value = "";
}

function showCalendar(month, year, day, nbDays) {
    // Checks if the form is valid
    if (checkValidity()) {
        document.getElementById("caldiv").hidden = false;
        let nbMonths = 1;
        let count = 0;
        let monthInit = month;
        let yearInit = year;

        tbl.innerHTML = "";

        if (nbDays > 0)
            // Numer of months to render
            nbMonths = Math.ceil(nbDays / 30);

        for (let k = 0; k < nbMonths; k++) {
            let firstDay = (new Date(year, month)).getDay();
            let daysInMonth = 32 - new Date(year, month, 32).getDate();
            let date = 1;
            let lastRow = true;

            // Creates header for month
            addMonth(year, month);
            // Creates row with days of the week
            addDays();

            for (let i = 0; i < 6; i++) {
                let row = document.createElement("tr");

                for (let j = 0; j < 7; j++) {
                    // Greys out days before first day
                    if (i === 0 && j < firstDay) {
                        let cell = document.createElement("td");
                        let cellText = document.createTextNode("");
                        cell.classList.add("bg-secondary");
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                    }
                    else if (date > daysInMonth) {
                        let cell = document.createElement("td");
                        let cellText = document.createTextNode("");
                        cell.classList.add("bg-secondary");
                        cell.appendChild(cellText);
                        row.appendChild(cell);
                        // Checks to see if the last day of the month is also a sat so no new row is created
                        if (tbl.rows[1].cells[j].innerHTML == "SAT" || date == daysInMonth) {
                            lastRow = false;
                            break;
                        }
                    }
                    else {
                        let cell = document.createElement("td");
                        let cellText = document.createTextNode(date);
                        if (j == 0 || j == 6) {
                            cell.classList.add("bg-warning");
                        } else {
                            cell.classList.add("bg-success");
                        }

                        // Holidays with blue letters
                        if (addHolidays(month, date))
                            cell.classList.add("text-primary");
                        
                        // Paints selected day span red
                        if (date === parseInt(day) || (monthInit != month && count < nbDays) || (year != yearInit && count < nbDays)) {
                            cell.classList.add("bg-danger");
                            if (count < nbDays) {
                                day++;
                                count++
                            }
                            if (tbl.rows[1].cells[j].innerHTML == "SAT" && date == daysInMonth) 
                                lastRow = false;
                        }

                        cell.appendChild(cellText);
                        row.appendChild(cell);
                        date++;
                    }
                }
                tbl.appendChild(row);
                if (!lastRow)
                    break;
            }
            if (month < 11)
                month++;
            else {
                month = 0;
                year++;
            }
        }
    }
}

function checkValidity() {
    var date = document.getElementById("datePicker");
    var code = document.getElementById("ctCode");
    var days = document.getElementById("nbDays");

    if (!date.checkValidity()) {
        alert(date.validationMessage + " Start Date");
        return false; 
    }
    else if (!code.checkValidity()) {
        alert(code.validationMessage + " Country Code");
        return false;
    }
    else if (!days.checkValidity()) {
        alert(days.validationMessage + "Number of Days");
        return false;
    }
    
    return true;
}

function addDays() {
    var row = document.createElement("tr");
    var cell1 = document.createElement("td");
    var cellText1 = document.createTextNode("SUN");
    cell1.appendChild(cellText1);
    row.appendChild(cell1);
    
    var cell2 = document.createElement("td");
    var cellText2 = document.createTextNode("MON");
    cell2.appendChild(cellText2);
    row.appendChild(cell2);

    var cell3 = document.createElement("td");
    var cellText3 = document.createTextNode("TUE");
    cell3.appendChild(cellText3);
    row.appendChild(cell3);

    var cell4 = document.createElement("td");
    var cellText4 = document.createTextNode("WED");
    cell4.appendChild(cellText4);
    row.appendChild(cell4);

    var cell5 = document.createElement("td");
    var cellText5 = document.createTextNode("THU");
    cell5.appendChild(cellText5);
    row.appendChild(cell5);

    var cell6 = document.createElement("td");
    var cellText6 = document.createTextNode("FRI");
    cell6.appendChild(cellText6);
    row.appendChild(cell6);

    var cell7 = document.createElement("td");
    var cellText7 = document.createTextNode("SAT");
    cell7.appendChild(cellText7);
    row.appendChild(cell7);

    tbl.appendChild(row);
}

function addMonth(year, month) {
    var row = document.createElement("tr");
    var cell = document.createElement("td");
    var cellText = document.createTextNode(months[month] + " " + year);
    cell.appendChild(cellText);
    row.appendChild(cell);
    tbl.appendChild(row);
}

function addHolidays(month, date) {
    let ctCode = document.getElementById("ctCode").value;

    if (ctCode == "CA") {
        var holiday = holidays.CA[(month+1 + "/" + date).toString()];
        if (holiday) {
            return true
        } else {
            false;
        }
    }
    else if (ctCode == "US") {
        var holiday = holidays.US[(month+1 + "/" + date).toString()];
        if (holiday) {
            return true;
        } else {
            false;
        }
    }
    else {
        return false;
    }
}



let holidays = {
    "US": {
        "1/1": "New Year's Day",
        "2/2": "Groundhog Day",
        "2/14": "Valentine's Day",
        "3/17": "St. Patrick's Day",
        "4/22": "Earth Day",
        "7/4": "Independence Day",
        "9/11": "Patriot Day",
        "10/31": "Halloween",
        "11/11": "Veterans' Day",
        "12/7": "Pearl Harbor Day",
        "12/25": "Christmas Day",
        "12/31": "New Year's Eve"
        
    },
    "CA": {
        "1/1": "New Year's Day",
        "2/2": "Groundhog Day",
        "2/14": "Valentine's Day",
        "7/1": "Canada Day",
        "11/11": "Remembrance Day",
        "12/25": "Christmas Day",
        "12/26": "Boxing Day",
        "12/31": "New Year's Eve"
        }
}