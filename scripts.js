document.querySelector('.toggle-bg').addEventListener('click', function(e) {
  e.preventDefault();
  document.body.classList.toggle('dark');
})

today = new Date();
currentMonth = today.getMonth();
currentYear = today.getFullYear();

months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August", "September",
    "October", "November", "December"
];

let k3 = [20, 22, 23, 28, 29, 30];
let k10 = [10, 12, 13, 14, 15, 16, 18, 19, 31];
let k13 = [11, 17];

let finalRow = false;
let showLast = false;

yearLabel = document.getElementById("year");
monthLabel = document.getElementById("month");
showCalendar(currentMonth, currentYear);

function showCalendar(month, year) {

    let firstDayOfTheWeek = 1; // 0 Sunday - 6 Saturday
    let firstDay = (new Date(year, month)).getDay();
    if (firstDay == 0) {
        firstDay = 6;
    } else {
        firstDay = firstDay - firstDayOfTheWeek;
    }
    console.log(firstDay);

    tbl = document.getElementById("calendar-body");

    // clearing all previous cells
    tbl.innerHTML = "";

    // filing data about month and in the page via DOM.
    monthLabel.innerHTML = months[month];
    yearLabel.innerHTML = year;

    // creating all cells
    let date = 1;
    for (let i = 0; i < 6; i++) {
        // creates a table row
        let row = document.createElement("tr");

        //creating individual cells, filing them up with data.
        for (let j = 0; j < 7; j++) {
            if (i === 0 && j < firstDay || finalRow) {
                cell = document.createElement("td");
                cellText = document.createTextNode("");
                cell.appendChild(cellText);
                row.appendChild(cell);
            }
            else {
                cell = document.createElement("td");
                cellText = document.createTextNode(date);
                if (date === today.getDate() && year === today.getFullYear() && month === today.getMonth()) {
                    cell.classList.add("today");
                } // color today's date
                cell.appendChild(cellText);

                if (k3.includes(date)) {
                    cell.classList.add("k3");
                }
                if (k10.includes(date)) {
                    cell.classList.add("k10");
                }
                if (k13.includes(date)) {
                    cell.classList.add("k13");
                }

                row.appendChild(cell);

                date++;
            }

            if (date > daysInMonth(month, year)) {
                finalRow = true;

                if (i == 5) {
                    showLast = true;
                }
            }
        }

        tbl.appendChild(row); // appending each row into calendar body.
        if (finalRow && !showLast) {
            break;
        }
    }

}

// check how many days in a month code from https://dzone.com/articles/determining-number-days-month
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}
