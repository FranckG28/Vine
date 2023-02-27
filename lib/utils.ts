import ms from "ms";

export const dateToString = (date: Date, displayTime?: boolean): string => {
  if (!date) return "jamais";
  return new Date(date).toLocaleDateString("fr-FR") + (displayTime ? ` à ${new Date(date).toLocaleTimeString("fr-FR")}` : "");
};

export const timeAgo = (timestamp: Date): string => {
  if (!timestamp) return "jamais";
  return `il y a ${ms(Date.now() - new Date(timestamp).getTime(), { long: true })}`;
};

export const isSameDay = (date1: Date, date2: Date): boolean => {
  return date1.toDateString() === date2.toDateString();
};

export const getLatestDate = (dates: Date[]): Date => {
  return dates.reduce((a, b) => (a > b ? a : b), new Date(0));
};

export function nFormatter(num: number, digits?: number) {
  if (!num) return "0";
  const lookup = [
    { value: 1, symbol: "" },
    { value: 1e3, symbol: "K" },
    { value: 1e6, symbol: "M" },
    { value: 1e9, symbol: "G" },
    { value: 1e12, symbol: "T" },
    { value: 1e15, symbol: "P" },
    { value: 1e18, symbol: "E" },
  ];
  const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
  var item = lookup
    .slice()
    .reverse()
    .find(function (item) {
      return num >= item.value;
    });
  return item
    ? (num / item.value).toFixed(digits || 1).replace(rx, "$1") + item.symbol
    : "0";
}

export function capitalize(str: string) {
  if (!str || typeof str !== "string") return str;
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const truncate = (str: string, length: number) => {
  if (!str || str.length <= length) return str;
  return `${str.slice(0, length)}...`;
};
