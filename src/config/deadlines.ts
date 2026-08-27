// Recurring annual dates. Year-agnostic; resolved to the next occurrence at runtime.
// NOTE: real dates shift to the next business day on weekends/holidays — `note` covers exceptions.
// TODO_CONFIRM annually — verify against IRS Pub 509 and FTB before each tax season.

export type Audience =
  | "individual"
  | "self-employed"
  | "business"
  | "employer"
  | "insurance";

export interface Deadline {
  md: string; // MM-DD
  title: string;
  for: Audience[];
  miss?: string;
  note?: string;
}

export const DEADLINES: Deadline[] = [
  {
    md: "01-15",
    title: "Q4 estimated tax payment (prior year)",
    for: ["self-employed", "business"],
    miss: "Underpayment penalty and interest accrue from this date.",
  },
  {
    md: "01-31",
    title: "W-2s and 1099-NEC due to recipients and the IRS",
    for: ["employer", "business"],
    miss: "Per-form penalties that increase the longer they are late.",
  },
  {
    md: "01-31",
    title: "Q4 payroll returns — federal 941 and CA EDD DE 9 / DE 9C",
    for: ["employer"],
    miss: "Late-filing penalties from both agencies.",
  },
  {
    md: "01-31",
    title: "Covered California open enrollment ends",
    for: ["individual", "insurance"],
    miss:
      "You generally cannot enroll until next open enrollment without a qualifying life event.",
  },
  {
    md: "03-15",
    title: "S-corporation (1120-S) and partnership (1065) returns",
    for: ["business"],
    miss: "Penalty accrues per partner or shareholder, per month.",
    note: "Extend with Form 7004 — the extension is for filing, not for paying.",
  },
  {
    md: "04-15",
    title: "Individual return (1040) and C-corporation return (1120)",
    for: ["individual", "self-employed", "business"],
    miss:
      "Failure-to-file penalty is roughly ten times the failure-to-pay penalty. File even if you cannot pay.",
  },
  {
    md: "04-15",
    title: "Q1 estimated tax payment",
    for: ["self-employed", "business"],
  },
  {
    md: "04-15",
    title: "Prior-year IRA and HSA contributions",
    for: ["individual"],
    miss: "The prior-year contribution window closes permanently.",
  },
  {
    md: "04-15",
    title: "California $800 LLC annual franchise tax",
    for: ["business"],
  },
  {
    md: "04-30",
    title: "Q1 payroll returns — 941 and DE 9 / DE 9C",
    for: ["employer"],
  },
  {
    md: "06-15",
    title: "Q2 estimated tax payment",
    for: ["self-employed", "business"],
  },
  {
    md: "06-15",
    title: "California LLC estimated fee",
    for: ["business"],
  },
  {
    md: "07-31",
    title: "Q2 payroll returns — 941 and DE 9 / DE 9C",
    for: ["employer"],
  },
  {
    md: "09-15",
    title: "Extended S-corporation and partnership returns",
    for: ["business"],
    miss: "This is the final deadline — there is no further extension.",
  },
  {
    md: "09-15",
    title: "Q3 estimated tax payment",
    for: ["self-employed", "business"],
  },
  {
    md: "10-15",
    title: "Extended individual return (1040)",
    for: ["individual", "self-employed"],
    miss: "Final deadline. Failure-to-file penalties resume from April.",
  },
  {
    md: "10-31",
    title: "Q3 payroll returns — 941 and DE 9 / DE 9C",
    for: ["employer"],
  },
  {
    md: "11-01",
    title: "Covered California open enrollment opens",
    for: ["individual", "insurance"],
  },
  {
    md: "12-31",
    title: "Last day for most deductions, retirement contributions and RMDs",
    for: ["individual", "business"],
    miss: "Most tax-reducing moves cannot be made after December 31.",
  },
];

// The firm's local timezone — deadlines are anchored here regardless of the
// server's runtime timezone (typically UTC on most hosts) or the visitor's
// timezone, so "days away" doesn't shift depending on who/where is rendering.
export const FIRM_TIMEZONE = "America/Los_Angeles";

interface CalendarDate {
  year: number;
  month: number; // 1-12
  day: number;
}

// Reads the Y/M/D for a given instant AS SEEN in `timeZone`, via Intl rather
// than a date library. This is what actually anchors "today" to the firm's
// timezone instead of the server's.
function calendarDateInTimeZone(instant: Date, timeZone: string): CalendarDate {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(instant);

  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value);
  return { year: get("year"), month: get("month"), day: get("day") };
}

// UTC-midnight timestamp for a calendar date — used ONLY for day-count
// arithmetic. Anchoring both sides to UTC (which has no DST) instead of
// diffing local-time Date objects is what makes the day math immune to
// spring-forward/fall-back 23/25-hour days; local timestamps would drift by
// one day for ranges that cross a DST transition.
function utcMidnight(d: CalendarDate): number {
  return Date.UTC(d.year, d.month - 1, d.day);
}

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function daysBetween(from: CalendarDate, to: CalendarDate): number {
  return Math.round((utcMidnight(to) - utcMidnight(from)) / MS_PER_DAY);
}

function resolveNextOccurrence(md: string, today: CalendarDate): CalendarDate {
  const [month, day] = md.split("-").map(Number);
  const thisYear: CalendarDate = { year: today.year, month, day };
  if (daysBetween(today, thisYear) >= 0) return thisYear;
  return { year: today.year + 1, month, day };
}

export interface ResolvedDeadline extends Deadline {
  date: Date;
  daysAway: number;
}

// `from` defaults to "right now, as seen in the firm's timezone" — pass it
// explicitly only for testing. Deadlines that have already passed today are
// never returned: resolveNextOccurrence always rolls a passed date forward
// to next year, including across the New Year boundary.
export function getUpcomingDeadlines(
  count: number = DEADLINES.length,
  from: Date = new Date(),
): ResolvedDeadline[] {
  const today = calendarDateInTimeZone(from, FIRM_TIMEZONE);

  const withDates = DEADLINES.map((d) => {
    const occurrence = resolveNextOccurrence(d.md, today);
    const daysAway = daysBetween(today, occurrence);
    // Representational Date for display formatting (month/day) only — never
    // used for arithmetic, so its own local timezone doesn't matter here.
    const date = new Date(occurrence.year, occurrence.month - 1, occurrence.day);
    return { ...d, date, daysAway };
  });

  return withDates
    .sort((a, b) => a.daysAway - b.daysAway)
    .slice(0, count);
}

export function getNextDeadline(from?: Date): ResolvedDeadline {
  return getUpcomingDeadlines(1, from)[0];
}

export function urgencyColor(daysAway: number): string {
  if (daysAway < 14) return "var(--color-mortgage)";
  if (daysAway <= 30) return "var(--color-seal)";
  return "var(--color-tax)";
}

// "0 days away" / "1 days away" read wrong — this is the one place that
// wording is decided, so every consumer stays consistent.
export function formatDaysAway(daysAway: number): string {
  if (daysAway === 0) return "Due today";
  if (daysAway === 1) return "1 day away";
  return `${daysAway} days away`;
}
