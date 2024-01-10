import dayjs from 'dayjs'

export const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export const formatDateString = (date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(date).format(format)
