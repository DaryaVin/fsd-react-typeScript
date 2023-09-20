export const numberOfDaysBetweenDates = (date1: Date, date2: Date) => {
  return Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24) + 1)
}