const moment = require('moment-timezone');

class DateTime {
  static now(timezone = 'America/Sao_Paulo') {
    return moment().tz(timezone);
  }

  static format(date, format = 'YYYY-MM-DD HH:mm:ss', timezone = 'America/Sao_Paulo') {
    return moment(date).tz(timezone).format(format);
  }

  static isValidDate(date) {
    return moment(date).isValid();
  }

  static addDays(date, days) {
    return moment(date).add(days, 'days');
  }

  static addHours(date, hours) {
    return moment(date).add(hours, 'hours');
  }

  static subtractDays(date, days) {
    return moment(date).subtract(days, 'days');
  }

  static diffInDays(startDate, endDate) {
    return moment(endDate).diff(moment(startDate), 'days');
  }

  static diffInHours(startDate, endDate) {
    return moment(endDate).diff(moment(startDate), 'hours');
  }

  static isWeekend(date) {
    const dayOfWeek = moment(date).day();
    return dayOfWeek === 0 || dayOfWeek === 6; // Sunday = 0, Saturday = 6
  }

  static getWeekDays(startDate, endDate) {
    const days = [];
    let current = moment(startDate);
    const end = moment(endDate);

    while (current.isSameOrBefore(end)) {
      if (!this.isWeekend(current)) {
        days.push(current.clone());
      }
      current.add(1, 'day');
    }

    return days;
  }

  static toUTC(date) {
    return moment(date).utc();
  }

  static fromUTC(date, timezone = 'America/Sao_Paulo') {
    return moment.utc(date).tz(timezone);
  }
}

module.exports = DateTime;