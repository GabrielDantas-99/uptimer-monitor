import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const convertFrequency = (frequency: number): string => {
  const hours = frequency / (60 * 60);
  const minutes = frequency / 60;
  if (hours > 1) {
    return `${hours} hours`;
  }
  if (minutes > 1 && minutes <= 59) {
    return `${minutes} mins`;
  }
  return `${frequency}s`;
};

export const timeFromNow = (date: string) => {
  if (date === 'null') {
    return 'None';
  }
  return dayjs(new Date(JSON.parse(date))).fromNow();
};
