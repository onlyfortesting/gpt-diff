import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
// import customParseFormat from 'dayjs/plugin/customParseFormat'
// import 'dayjs/locale/id'

// process.env.TZ = 'Asia/Jakarta'
// delete process.env.TZ

// dayjs.extend(customParseFormat)
dayjs.extend(utc)
dayjs.extend(timezone)

dayjs.tz.setDefault("Asia/Jakarta")

let wrapper = (...args) => dayjs(...args).tz()
export default wrapper

export const convertDate = (str) => {
  let [date, time] = str.split(' ')
  date = date.split('-').reverse().join('-')
  if (time)
    date += 'T' + time

  return new Date(date).toLocaleString("id", { timeZone: "Asia/Jakarta" })
}

export const wib = (str) => {
  let [date, time] = str.split(' ')
  date = date.split('-').reverse().join('-')
  if (time)
    date += 'T' + time

  return dayjs(date).tz()
}
