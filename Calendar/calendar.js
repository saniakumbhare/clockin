document.addEventListener("DOMContentLoaded", function() {
    const weekCalendar = {
        calWeekDays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        calMonthName: [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ],
        localDate: new Date(),
        clockTimes: Array(7).fill({ clockIn: null, clockOut: null }),

        getCurrentWeek: function () {
            const currentDate = new Date();
            const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
            const daysOfWeek = [];
            for (let i = 0; i < 7; i++) {
                daysOfWeek.push(new Date(firstDayOfWeek));
                firstDayOfWeek.setDate(firstDayOfWeek.getDate() + 1);
            }
            return daysOfWeek;
        },
        formatDateString: function (date) {
            const day = this.calWeekDays[date.getDay()];
            const month = this.calMonthName[date.getMonth()];
            const dateNum = date.getDate();
            const dateSuffix = dateNum % 10 === 1 && dateNum !== 11 ? 'st' :
                dateNum % 10 === 2 && dateNum !== 12 ? 'nd' :
                dateNum % 10 === 3 && dateNum !== 13 ? 'rd' : 'th';
            return `${day}, ${month} ${dateNum}${dateSuffix}`;
        },
        displayMonth: function () {
            const currentMonth = this.calMonthName[this.localDate.getMonth()];
            document.querySelector(".calendar-month-label").textContent = currentMonth;
        },
        displayWeek: function () {
            const weekDays = this.getCurrentWeek();
            const dayRow = document.querySelector("#week-table tbody tr:nth-child(1)");
            const clockInRow = document.querySelector("#week-table tbody tr:nth-child(2)");
            const clockOutRow = document.querySelector("#week-table tbody tr:nth-child(3)");
            const totalHoursRow = document.querySelector("#week-table tbody tr:nth-child(4)");

            weekDays.forEach((day, index) => {
                const isToday = day.toDateString() === this.localDate.toDateString() ? 'today' : '';
                const formattedDate = this.formatDateString(day);
                dayRow.innerHTML += `<td class="${isToday}">${formattedDate}</td>`;
                clockInRow.innerHTML += `<td id="clock-in-${index}" class="${isToday}">--</td>`;
                clockOutRow.innerHTML += `<td id="clock-out-${index}" class="${isToday}">--</td>`;
                totalHoursRow.innerHTML += `<td id="total-hours-${index}" class="${isToday}">--</td>`;
            });
        },
        handleClockInOut: function () {
            const clockInButton = document.getElementById("clock-in");
            const clockOutButton = document.getElementById("clock-out");

            clockInButton.addEventListener("click", () => {
                const clockInTime = new Date();
                const weekDayIndex = clockInTime.getDay();
                const timeFormatted = clockInTime.toLocaleTimeString();
                this.clockTimes[weekDayIndex] = { ...this.clockTimes[weekDayIndex], clockIn: clockInTime };
                document.getElementById(`clock-in-${weekDayIndex}`).textContent = timeFormatted;
                this.updateTotalHours(weekDayIndex);
                this.saveToLocalStorage();
                this.sendClockTimeToServer(weekDayIndex, clockInTime, 'in');
            });

            clockOutButton.addEventListener("click", () => {
                const clockOutTime = new Date();
                const weekDayIndex = clockOutTime.getDay();
                const timeFormatted = clockOutTime.toLocaleTimeString();
                this.clockTimes[weekDayIndex] = { ...this.clockTimes[weekDayIndex], clockOut: clockOutTime };
                document.getElementById(`clock-out-${weekDayIndex}`).textContent = timeFormatted;
                this.updateTotalHours(weekDayIndex);
                this.saveToLocalStorage();
                this.sendClockTimeToServer(weekDayIndex, clockOutTime, 'out');
            });
        },
        updateTotalHours: function (index) {
            const { clockIn, clockOut } = this.clockTimes[index];
            if (clockIn && clockOut) {
                const totalHours = ((clockOut - clockIn) / (1000 * 60 * 60)).toFixed(2);
                document.getElementById(`total-hours-${index}`).textContent = `${totalHours} hrs`;
            }
        },
        saveToLocalStorage: function () {
            localStorage.setItem('clockTimes', JSON.stringify(this.clockTimes));
        },
        sendClockTimeToServer: function (dayIndex, time, type) {
            fetch('store_clock_time.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    dayIndex: dayIndex,
                    time: time.toISOString(),
                    type: type
                })
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
        },
        init: function () {
            this.displayMonth();
            this.displayWeek();
            this.handleClockInOut();

            const storedClockTimes = JSON.parse(localStorage.getItem('clockTimes'));
            if (storedClockTimes) {
                this.clockTimes = storedClockTimes;
                this.clockTimes.forEach((day, index) => {
                    if (day.clockIn) {
                        document.getElementById(`clock-in-${index}`).textContent = new Date(day.clockIn).toLocaleTimeString();
                    }
                    if (day.clockOut) {
                        document.getElementById(`clock-out-${index}`).textContent = new Date(day.clockOut).toLocaleTimeString();
                        this.updateTotalHours(index);
                    }
                });
            }
        }
    };

    weekCalendar.init();
});
