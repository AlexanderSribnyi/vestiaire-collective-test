import {intervalToDuration} from "date-fns";

export const getTimeFromDateToNow = dateStr => {
    let result = ''
    const options = {
        years: 'year(s)',
        months: 'month(s)',
        days: 'day(s)',
    }

    // Date object creation for exact day and deposited day
    const start = new Date();
    const end = new Date(dateStr);

    const values = intervalToDuration({start, end})

    // Correct output string creation
    for (let option in options) {
        if (values[option] !== 0) {
            result += ` ${values[option]} ${options[option]}`
        }
    }

    if (result.length === 0) result = 'today'

    return result;
}