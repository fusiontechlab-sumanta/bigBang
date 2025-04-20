export function formatDateTime(dateString) {
    let date = new Date(dateString);

    // Check if the date is valid
    // if (isNaN(date.getTime())) {
    //     // date = new Date(); // Use the current date and time
    //     return
    // }

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const day = String(date.getDate()).padStart(2, '0');

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, '0');

    // Determine AM or PM
    const ampm = hours >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    hours = hours % 12 || 12;

    // Format: YYYY-MM-DD H:mm AM/PM
    return `${year}-${month}-${day} ${hours}:${minutes} ${ampm}`;
}

console.log(formatDateTime("2025-02-03T09:10:00.000Z"));

function formatServerTime(serverTime) {
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

const serverTime = "3/2/2025, 11:07:10 am"; // MM/DD/YYYY format
console.log(formatServerTime(serverTime));
// Output: "2025-02-03 2:40 PM"



