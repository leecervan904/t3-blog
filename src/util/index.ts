import dayjs from 'dayjs'

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const formatDateString = (date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(date).format(format)

export const fillOverDaysData = (data: Array<{ date: string, count: number }>, overDays: number) => {
  const nowDay = dayjs()

  const res = new Array(overDays)
    .fill(0)
    .map((_, i) => ({
      date: nowDay.subtract(i, 'd').format('YYYY-MM-DD'),
      count: 0,
    }))
    .reverse()

  res.forEach(day => {
    const targetDay = data.find(v => v.date === day.date)
    if (targetDay) {
      day.count = targetDay.count
    }
  })

  return res
}

export function genSQLLatestDayRange(latest: number) {
  return new Array(latest)
    .fill(0)
    .map((_, i) => `SELECT DATE_ADD(CURDATE(), INTERVAL -${i} DAY) AS date`)
    .reverse()
    .join(' UNION ALL ')
}
