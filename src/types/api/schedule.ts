export class ScheduleConfig {
  frequency: number;
  interval: Interval;
  time: Date;
  dayOfMonth: number;
  // 7 bools, one for each day of week. Starting on Sunday.
  daysOfWeek: boolean[];

  constructor({
    frequency,
    interval,
    time,
    dayOfMonth,
    daysOfWeek
  }: {
    frequency: number;
    interval: Interval;
    time: Date;
    dayOfMonth: number;
    daysOfWeek: boolean[];
  }) {
    this.frequency = frequency;
    this.interval = interval;
    this.time = time;
    this.dayOfMonth = dayOfMonth;
    this.daysOfWeek = daysOfWeek;
  }

  static validate(config: ScheduleConfig): { error: string | undefined } {
    const validIntervals = [Interval.Minute, Interval.Hour, Interval.Day, Interval.Week, Interval.Month];

    if (!Number.isInteger(config.frequency)) {
      return { error: 'Frequency should be an integer.' };
    }
    if (config.frequency < 0) {
      return { error: 'Frequency should be greater than 0.' };
    }
    if (!validIntervals.includes(config.interval)) {
      return { error: `Invalid interval ${config.interval}.` };
    }
    if (config.daysOfWeek.length !== 7) {
      return { error: `Invalid interval config daysOfWeek. ${config.daysOfWeek}` };
    }
    if (!config.dayOfMonth || !Number.isInteger(config.dayOfMonth)) {
      return { error: `Invalid dayOfMonth. ${config.dayOfMonth}` };
    }
    return { error: undefined };
  }

  static default(): ScheduleConfig {
    return new ScheduleConfig({
      frequency: 1,
      interval: Interval.Month,
      time: midnight(),
      dayOfMonth: 1,
      daysOfWeek: [true, false, false, false, false, false, false]
    });
  }

  private cronDaysOfWeek(): string {
    const selectedDays = this.daysOfWeek.flatMap((bool, index) => (bool ? index : []));
    return selectedDays.length === 0 ? '*' : selectedDays.join(',');
  }

  // Currently, we use a cron evaluator to evaluate recurrence
  // expressions.
  toCron(): string {
    switch (this.interval) {
      case Interval.Minute:
        // e.g. '*/2 * * *' -> every 2 minutes of the hour
        return `*/${this.frequency} * * * *`;
      case Interval.Hour:
        // '0 */2 * * *' -> every 2 hours every day
        return `0 */${this.frequency} * * *`;
      case Interval.Day:
        // 'mm hh * * *' -> every day at hh:mm
        return `${this.time.getMinutes()} ${this.time.getHours()} * * *`;
      case Interval.Week:
        // 'mm hh * * 0,2' -> every week at hh:mm on Sunday and Tuesday
        return `${this.time.getMinutes()} ${this.time.getHours()} * * ${this.cronDaysOfWeek()}`;
      case Interval.Month:
        // 'mm hh dom */2 *' -> every 2 months on dom at hh:ss
        return `${this.time.getMinutes()} ${this.time.getHours()} ${this.dayOfMonth} */${this.frequency} *`;
    }
  }
}

export enum Interval {
  Minute = 'minute',
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month'
}

const midnight = (): Date => {
  const d = new Date();
  d.setHours(0);
  d.setMinutes(0);
  return d;
};

export enum ScheduleState {
  ACTIVE,
  PAUSED
}
