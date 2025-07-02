const timeouts: any = {};

const cTimeout = (key = "key") => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key]);
    timeouts[key] = undefined;
  }
};

export const debounce = (key = "key", fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: Function, timeout: number) => {
    cTimeout(key);

    timeouts[key] = setTimeout(() => {
      try {
        fn();
      } catch (e) {}

      timeouts[key] = undefined;
    }, timeout);
  };

  return sTimeout(key, fn, timeout);
};

export function formatNumber(number: string | number) {
  return number && number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const disableAdultCalendar = (date: Date) => {
  const currentDate = new Date();
  const twelveYearsAgo = new Date();
  twelveYearsAgo.setFullYear(currentDate.getFullYear() - 12);

  return date.getTime() > twelveYearsAgo.getTime();
};
export const disableChildCalendar = (date: Date) => {
  const currentDate = new Date();
  const twelveYearsAgo = new Date();
  const twoYearsAgo = new Date();
  twelveYearsAgo.setFullYear(currentDate.getFullYear() - 12);
  twoYearsAgo.setFullYear(currentDate.getFullYear() - 2);

  return (
    date.getTime() < twelveYearsAgo.getTime() ||
    date.getTime() > twoYearsAgo.getTime()
  );
};
export const disableInfantCalendar = (date: Date) => {
  const currentDate = new Date();
  const oneYearsAgo = new Date();
  oneYearsAgo.setFullYear(currentDate.getFullYear() - 2);

  return date.getTime() < oneYearsAgo.getTime() || date > new Date();
};
