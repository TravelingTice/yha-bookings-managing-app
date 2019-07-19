// all our functions that calculate with dates are in here

export function daysBetween(date1, date2) {
    // add up all numbers
    const date1val = date1.day + date1.month + date1.year;
    const date2val = date2.day + date2.month + date2.year;

    if (date1val === date2val) {
      return 0;
    } else if (date1.month === date2.month && date1.year === date2.year) {
      return date2.day - date1.day;
    } else if (date1.month !== date2.month) {
      // if its a month with 31 days
      if (date1.month === 1 || date1.month === 3 || date1.month === 5 || date1.month === 7 || date1.month === 8 || date1.month === 10 || date1.month === 12) {
        return 31 - date1.day + date2.day;
      }
      // if its a month with 30 days
      if (date1.month === 4 || date1.month === 6 || date1.month === 9 || date1.month === 11) {
        return 30 - date1.day + date2.day;
      }
      // if its feb in a normal year
      const yearDividedByFour = date1.year / 4;
      console.log(yearDividedByFour);
      if (date1.month === 2 && !yearDividedByFour.isInteger()) {
        return 28 - date1.day + date2.day;
        // if its feb in special year
      } else if (date1.month === 2 && yearDividedByFour.isInteger()) {
        return 29 - date1.day + date2.day;
      }
    }
}

export function getHr() {
    const today = new Date();
    return today.getHours();
}

export function getDate() {
  const today = new Date();
  return {
    day: today.getDate(),
    month: today.getMonth() + 1,
    year: today.getFullYear()
  }
}