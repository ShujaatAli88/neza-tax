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

function resolveNextDate(md: string, from: Date): Date {
  const [month, day] = md.split("-").map(Number);
  let year = from.getFullYear();
  let candidate = new Date(year, month - 1, day);
  if (candidate < from) {
    candidate = new Date(year + 1, month - 1, day);
  }
  return candidate;
}

export interface ResolvedDeadline extends Deadline {
  date: Date;
  daysAway: number;
}

export function getUpcomingDeadlines(
  from: Date,
  count: number = DEADLINES.length,
): ResolvedDeadline[] {
  const withDates = DEADLINES.map((d) => {
    const date = resolveNextDate(d.md, from);
    const daysAway = Math.ceil(
      (date.getTime() - from.getTime()) / (1000 * 60 * 60 * 24),
    );
    return { ...d, date, daysAway };
  });
  return withDates.sort((a, b) => a.date.getTime() - b.date.getTime()).slice(0, count);
}

export function getNextDeadline(from: Date): ResolvedDeadline {
  return getUpcomingDeadlines(from, 1)[0];
}

export function urgencyColor(daysAway: number): string {
  if (daysAway < 14) return "var(--color-mortgage)";
  if (daysAway <= 30) return "var(--color-seal)";
  return "var(--color-tax)";
}
