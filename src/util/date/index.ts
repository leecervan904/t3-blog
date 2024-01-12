import dayjs from 'dayjs'

export const formatDateString = (date: Date | string | number, format = 'YYYY-MM-DD HH:mm:ss') => dayjs(date).format(format)
