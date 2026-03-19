export const RESERVED_DATES = [
  "2026-03-20", "2026-03-22", "2026-03-25", "2026-03-28",
  "2026-04-01", "2026-04-05", "2026-04-10", "2026-04-14",
  "2026-04-18", "2026-04-22", "2026-04-26",
  "2026-05-02", "2026-05-06", "2026-05-12", "2026-05-16",
  "2026-05-20", "2026-05-24", "2026-05-30",
];

export const ALL_TIMES = ["17:00", "17:30", "18:00", "18:30", "19:00", "19:30", "20:00", "20:30"];

export const RESERVED_TIMES = {
  "2026-03-19": ["18:00", "19:00"],
  "2026-03-21": ["17:30", "20:00"],
  "2026-03-23": ["18:30"],
  "2026-03-24": ["17:00", "19:30", "20:30"],
  "2026-04-02": ["18:00", "18:30"],
  "2026-04-03": ["19:00"],
  "2026-04-07": ["17:00", "20:00"],
};

export const OCCASIONS = [
  "Birthday", "Anniversary", "Date Night", "Business Dinner",
  "Graduation", "Engagement", "Promotion", "Holiday Celebration",
  "Family Gathering", "Reunion", "Other",
];

export const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

export const pad = (n) => String(n).padStart(2, "0");
export const toKey = (y, m, d) => `${y}-${pad(m + 1)}-${pad(d)}`;
export const daysIn = (y, m) => new Date(y, m + 1, 0).getDate();
export const firstDay = (y, m) => new Date(y, m, 1).getDay();
