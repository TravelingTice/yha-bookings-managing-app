// all our functions that calculate with dates are in here

export function daysBetween(date1, date2) {
    const one_day = 1000*60*60*24;
    const date1_ms = date1.getTime();
    const date2_ms = date2.getTime();

    var difference_ms = date2_ms - date1_ms;

    return Math.round(difference_ms/one_day);
}

export function getHr() {
    const today = new Date;
    return today.getHours();
}