// function to export the formatted date
module.exports = (time) => 
{
    const date = new Date(time);
    const month = date.getMonth();
    const day = date.getDate();
    const year = date.getFullYear();
    let hour;
    // if the time in 24hr format is above 12 then it is divided by two in order to format it by am/pm and if it is not then the hour is saved 
    if (date.getHours > 12)
        hour = Math.floor(date.getHours() / 2);
    else
        hour = date.getHours();

    // Midnight is formatted as 12 instea of 0
    if (hour === 0)
        hour = 12;
    // gets the minute of the hour
    const minutes = date.getMinutes();

    // sets variable to be used later
    let AmPm;
    // sets the time of day whether morning or afternoon
    if (date.getHours() >= 12)
        AmPm = 'pm';
    else
        AmPm = 'am';

    const formattedDate = `${month}/${day}/${year} @ ${hour}:${minutes} ${periodOfDay}`;

    return formattedDate;
};