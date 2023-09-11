export function startOfDay() {
  // retorna a data atual com a hora 00:00:00
  const startDay = new Date();
  startDay.setUTCHours(0, 0, 0, 0);
  return startDay;
}

export function EndOfDay() {
  // retorna a data atual com a hora 23:59:59
  const endDay = new Date();
  endDay.setUTCHours(23, 59, 59, 999);
  return endDay;
}
