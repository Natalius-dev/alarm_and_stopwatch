const add0 = (int) => {
    return (String(int).length === 1 ? "0" + String(int) : String(int))
}

const month_to_text = (int) => {
    switch (String(int + 1)) {
        case '1':
            return 'January';
        case '2':
            return 'February';
        case '3':
            return 'March';
        case '4':
            return 'April';
        case '5':
            return 'May';
        case '6':
            return 'June';
        case '7':
            return 'July';
        case '8':
            return 'August';
        case '9':
            return 'September';
        case '10':
            return 'October';
        case '11':
            return 'November';
        case '12':
            return 'December';
    }
}

document.getElementById("alarmModal").style.display = "none";

let stopwatchActive = false;
let timestamp

document.getElementById("stopwatchBtn").onclick = stopwatch = () => {
    stopwatchActive = !stopwatchActive;
    if (stopwatchActive) {
        document.getElementById("stopwatchBtn").innerHTML = "Pause"
    } else {
        document.getElementById("stopwatchBtn").innerHTML = "Start";
        document.getElementById("stopwatch").innerHTML = "00:00:00"
    }
    timestamp = Date.now();
}

let alarms = [];
let alarmsTimestamps = [];

document.getElementById("alarmBtn").onclick = addAlarm = () => {
    if (document.getElementById("alarm-pick").value !== "") {
        alarms.push(document.getElementById("alarm-pick").value);

        let alarmObj = {};
        alarmObj.hour = String(document.getElementById("alarm-pick").value).slice(0, 2);
        alarmObj.minute = String(document.getElementById("alarm-pick").value).slice(3, 5);
        alarmsTimestamps.push(alarmObj);
    }
    document.getElementById("alarm").innerHTML = "";
    for (let i = 0; i < alarms.length; i++) {
        let span = document.createElement("li");
        span.innerHTML = alarms[i];
        span.classList.add("list-group-item");
        document.getElementById("alarm").appendChild(span);
    }
    document.getElementById("alarmModal").style.display = "none";
}

document.getElementById("openAlarmModal").onclick = () => {
    document.getElementById("alarmModal").style.display = "flex";
}

const tick = () => {
    const date = new Date();
    document.getElementById("date").innerHTML = add0(date.getDate()) + " " + month_to_text(date.getMonth()) + ", " + date.getFullYear();
    document.getElementById("clock").innerHTML = add0(date.getHours()) + ":" + add0(date.getMinutes()) + ":" + add0(date.getSeconds());

    for (let i = 0; i < alarmsTimestamps.length; i++) {
        if (String(date.getHours()) === alarmsTimestamps[i].hour && String(date.getMinutes()) === alarmsTimestamps[i].minute) {
            alert("Alarm for " + alarmsTimestamps[i].hour + ":" + alarmsTimestamps[i].minute + " has been activated!");
            alarmsTimestamps.splice(i, 1);
            alarms.splice(i, 1);
            document.getElementById("alarm").innerHTML = "";
            for (let i = 0; i < alarms.length; i++) {
                let span = document.createElement("li");
                span.innerHTML = alarms[i];
                span.classList.add("list-group-item");
                document.getElementById("alarm").appendChild(span);
            }
        }
    }
    if (stopwatchActive === true) {
        const stopwatchTime = new Date();
        stopwatchTime.setTime(Date.now() - timestamp);
        if (stopwatchTime.getMinutes() !== 59 && stopwatchTime.getSeconds() !== 59) {
            document.getElementById("stopwatch").innerHTML = add0(stopwatchTime.getMinutes()) + ":" + add0(stopwatchTime.getSeconds()) + ":" + stopwatchTime.getMilliseconds();
        }
    }
}

tick();

setInterval(() => {
    tick();
}, 1);