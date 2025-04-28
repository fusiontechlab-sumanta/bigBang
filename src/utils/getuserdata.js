export const getUserdata = () => {
    const UserDetail = JSON.parse(localStorage.getItem("User Detail"));
    return UserDetail

}
export const getNotificationdata = () => {
    const Notificationdata = JSON.parse(localStorage.getItem("notification"));
    return Notificationdata

}
export const minutesToSeconds = (minutes) => {
    return minutes * 60;
}
function convertToISO(date, time) {
    if (!date && !time) {
        return ''; // or return a default value like 'Invalid time'
    }
    // Split the time into hours and minutes
    let [hours, minutes] = time && time.split(":").map(Number);
    // Determine if it's AM or PM
    let isPM = hours >= 12;
    let adjustedHours = isPM ? (hours === 12 ? 12 : hours - 12) : (hours === 0 ? 12 : hours);
    // Format time as HH:mm (12-hour format with AM/PM suffix)
    let formattedTime = `${adjustedHours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${isPM ? "PM" : "AM"}`;
    // Adjust time for the India timezone (IST)
    let tournamentTimeInIndia = `${date}T${time}:00+05:30`;
    return { formattedTime, tournamentTimeInIndia };
}

function getTournamentTimeInCountry(indianTime, timeZone) {
    // Convert Indian time to the target time zone
    const date = new Date(indianTime);
    return date.toLocaleString("en-US", { timeZone: timeZone });
}

export const formatDate = (date, time) => {
    if (!date && !time) {
        return ''; // or return a default value like 'Invalid time'
    }
    const { tournamentTimeInIndia } = convertToISO(date, time);

    let indTime = tournamentTimeInIndia

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    // console.log(tz);
    // Tournament start time in India (6th January 2025, 10:30 AM)
    const tournamentTimeInIndias = indTime;
    // Time in New York (EST - GMT-5)
    const newYorkTime = getTournamentTimeInCountry(tournamentTimeInIndias, tz);

    const [date1, time1] = newYorkTime.split(', ')
    return date1

};

export function formatTime(date, time) {
    if (!date && !time) {
        return ''; // or return a default value like 'Invalid time'
    }

    const { tournamentTimeInIndia } = convertToISO(date, time);

    let indTime = tournamentTimeInIndia

    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    console.log(tz);
    // Tournament start time in India (6th January 2025, 10:30 AM)
    const tournamentTimeInIndias = indTime;
    // Time in New York (EST - GMT-5)
    const newYorkTime = getTournamentTimeInCountry(tournamentTimeInIndias, tz);

    const [date1,time1] = newYorkTime.split(', ')
    const [hour, minute, secondAndPeriod] = time1.split(":");
    const [second, period] = secondAndPeriod.split(" ");
    
    // Format the time, excluding the seconds
    const formattedTime = `${hour}:${minute} ${period}`; // Hours and minutes with AM/PM
    return formattedTime
}

export function formatDateTime(dateString) {
    let date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0'); 
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0'); 
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');

    return `${year}-${month}-${day} ${hours}:${minutes}`;
}


export function formatServerTime(serverTime) {
    const date = new Date(serverTime);

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12 || 12; // Convert 24-hour format to 12-hour

    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

export function formatAmount(data) {
    const num = Number(data); // ensures it's a number
    const decimal = num % 1;
  
    if (decimal === 0) {
      return `${Math.floor(num)}`; // remove .0
    }
  
    return `${num.toFixed(1)}`; // show 1 decimal place if needed
  }
  
  
