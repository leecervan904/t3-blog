import dayjs from 'dayjs'

export * from './date'
export * from './dom'
export * from './sql'

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

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

