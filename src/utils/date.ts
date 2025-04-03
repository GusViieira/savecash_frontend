export function convertDate(date: string) {
  return date.split('-').reverse().join('-')
}

export function convertDateToServe(date: string) {
  return date.split('/').reverse().join('/').replace(/\//g, '-')
}
