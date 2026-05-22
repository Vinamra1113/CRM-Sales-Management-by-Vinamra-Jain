
export type SalesRep = {
  id: string;
  name: string;
  region: string;
  target: number;
  achievement: number;
  score: number;
};

export type Customer = {
  id: string;
  name: string;
  industry: string;
  region: string;
  revenue: number;
  since: string;
  manager: string;
  satisfaction: number;
};

export type Contact = {
  id: string;
  customerId: string;
  name: string;
  email: string;
  phone: string;
  jobTitle: string;
  lastInteraction: string;
};

export type SalesActivity = {
  id: string;
  repId: string;
  customerId: string;
  type: string;
  date: string;
  status: string;
  notes: string;
};

export type Opportunity = {
  id: string;
  customerId: string;
  repId: string;
  product: string;
  stage: string;
  value: number;
  closeDate: string;
  probability: number;
};

export type Campaign = {
  id: string;
  name: string;
  type: string;
  budget: number;
  leadsGenerated: number;
  roi: number;
};

export type Lead = {
  id: string;
  source: string;
  assignedRep: string;
  score: number;
  status: string;
  date: string;
};

export type DiscountRequest = {
  id: string;
  repName: string;
  customerId: string;
  percent: number;
  status: 'Approved' | 'Pending' | 'Rejected';
  date: string;
};

export type AccountPlan = {
  id: string;
  customerId: string;
  goal: string;
  targetRevenue: number;
  reviewDate: string;
};

export type Renewal = {
  id: string;
  customerId: string;
  endDate: string;
  reminderDate: string;
  status: 'Pending' | 'Renewed' | 'Upcoming';
};

export type Feedback = {
  id: string;
  customerId: string;
  product: string;
  category: string;
  text: string;
  satisfaction: string;
};

export const SALES_REPS: SalesRep[] = [
  { id: "SR001", name: "Allison Hill", region: "North", target: 56556, achievement: 92097, score: 69.8 },
  { id: "SR002", name: "Noah Rhodes", region: "South", target: 76868, achievement: 162964, score: 63.48 },
  { id: "SR003", name: "Angie Henderson", region: "West", target: 58331, achievement: 27811, score: 63.75 },
  { id: "SR004", name: "Daniel Wagner", region: "South", target: 182475, achievement: 177815, score: 61.06 },
  { id: "SR005", name: "Cristian Santos", region: "South", target: 192853, achievement: 129974, score: 68.82 },
  { id: "SR006", name: "Connie Lawrence", region: "Central", target: 122926, achievement: 21703, score: 90.35 },
  { id: "SR007", name: "Abigail Shaffer", region: "South", target: 160785, achievement: 109194, score: 71.11 },
  { id: "SR008", name: "Gina Moore", region: "South", target: 138236, achievement: 46793, score: 63.71 },
  { id: "SR009", name: "Gabrielle Davis", region: "North", target: 144104, achievement: 110165, score: 84.15 },
  { id: "SR010", name: "Ryan Munoz", region: "North", target: 170435, achievement: 160568, score: 64.99 },
  { id: "SR011", name: "Monica Herrera", region: "West", target: 70656, achievement: 164714, score: 71.73 },
  { id: "SR012", name: "Jamie Arnold", region: "Central", target: 144800, achievement: 171349, score: 67.69 },
  { id: "SR013", name: "Lisa Hensley", region: "North", target: 62012, achievement: 79742, score: 90.92 },
  { id: "SR014", name: "Michele Williams", region: "North", target: 111024, achievement: 46476, score: 75.21 },
  { id: "SR015", name: "Dylan Miller", region: "West", target: 145638, achievement: 62638, score: 74.81 },
  { id: "SR016", name: "Brian Ramirez", region: "South", target: 119986, achievement: 38717, score: 84.37 },
  { id: "SR017", name: "Holly Wood", region: "South", target: 190021, achievement: 84175, score: 66.54 },
  { id: "SR018", name: "Derek Zuniga", region: "West", target: 120765, achievement: 166001, score: 68.78 },
  { id: "SR019", name: "Lisa Jackson", region: "East", target: 64663, achievement: 80043, score: 92.87 },
  { id: "SR020", name: "Carla Gray", region: "East", target: 155162, achievement: 90186, score: 62.65 },
  { id: "SR021", name: "Margaret Hawkins DDS", region: "Central", target: 132490, achievement: 75738, score: 86.22 },
  { id: "SR022", name: "Patty Perez", region: "West", target: 170285, achievement: 57452, score: 70.6 },
  { id: "SR023", name: "Ethan Adams", region: "South", target: 197159, achievement: 161289, score: 70.51 },
  { id: "SR024", name: "Tommy Walter", region: "Central", target: 162311, achievement: 172969, score: 75.98 },
  { id: "SR025", name: "Matthew Foster", region: "South", target: 86262, achievement: 153569, score: 79.74 }
];

export const CUSTOMERS: Customer[] = [
  { id: "CUST0001", name: "Ellis, Baker and Wright", industry: "IT", region: "North", revenue: 1382125, since: "2023-03-01", manager: "Margaret Hawkins DDS", satisfaction: 2.9 },
  { id: "CUST0002", name: "Baker, Richards and Hurst", industry: "Education", region: "West", revenue: 632909, since: "2021-10-13", manager: "Lisa Hensley", satisfaction: 3.5 },
  { id: "CUST0003", name: "Robinson-Bright", industry: "Retail", region: "Central", revenue: 2209014, since: "2022-09-21", manager: "Derek Zuniga", satisfaction: 4.7 },
  { id: "CUST0004", name: "Davis-Williams", industry: "IT", region: "North", revenue: 4604433, since: "2019-04-27", manager: "Matthew Foster", satisfaction: 3.2 },
  { id: "CUST0005", name: "Burton Ltd", industry: "Education", region: "East", revenue: 1035767, since: "2021-12-23", manager: "Ryan Munoz", satisfaction: 3.6 },
  { id: "CUST0006", name: "Brown, James and Ferrell", industry: "Retail", region: "North", revenue: 2309467, since: "2022-11-20", manager: "Holly Wood", satisfaction: 4.4 },
  { id: "CUST0007", name: "Maddox-Valencia", industry: "Manufacturing", region: "North", revenue: 2603536, since: "2018-06-26", manager: "Margaret Hawkins DDS", satisfaction: 3.8 },
  { id: "CUST0008", name: "Le, Maldonado and Herrera", industry: "Finance", region: "South", revenue: 3236616, since: "2020-08-27", manager: "Matthew Foster", satisfaction: 2.9 },
  { id: "CUST0009", name: "Peterson, Carter and Moore", industry: "Manufacturing", region: "North", revenue: 2819218, since: "2018-06-01", manager: "Brian Ramirez", satisfaction: 2.5 },
  { id: "CUST0010", name: "Liu, Baker and Mason", industry: "Healthcare", region: "East", revenue: 2108671, since: "2019-11-28", manager: "Noah Rhodes", satisfaction: 3.1 }
];

export const SALES_ACTIVITIES: SalesActivity[] = [
  { id: "ACT00001", repId: "SR023", customerId: "CUST0022", type: "Follow-up", date: "2025-12-26", status: "In Progress", notes: "Whole today Congress out conference never song but." },
  { id: "ACT00002", repId: "SR002", customerId: "CUST0064", type: "Demo", date: "2024-08-29", status: "Pending", notes: "Deal claim none surface alone woman media hair name institution war a feel." },
  { id: "ACT00003", repId: "SR017", customerId: "CUST0134", type: "Follow-up", date: "2025-06-28", status: "In Progress", notes: "Process knowledge officer reason mission worry goal Mrs decide." },
  { id: "ACT00004", repId: "SR012", customerId: "CUST0096", type: "Email", date: "2024-08-05", status: "Pending", notes: "Down could feel strategy whatever own." },
  { id: "ACT00005", repId: "SR014", customerId: "CUST0199", type: "Email", date: "2024-11-04", status: "Open", notes: "Grow campaign performance avoid effort high tough hundred bar effect international reason movie." },
  { id: "ACT00006", repId: "SR001", customerId: "CUST0001", type: "Call", date: "2024-03-24", status: "Completed", notes: "Initial discovery call with the tech team." },
  { id: "ACT00007", repId: "SR001", customerId: "CUST0001", type: "Email", date: "2024-03-26", status: "Completed", notes: "Followed up with product brochures." },
  { id: "ACT00008", repId: "SR001", customerId: "CUST0001", type: "Meeting", date: "2024-04-02", status: "Completed", notes: "Quarterly review and expansion discussion." }
];

export const OPPORTUNITIES: Opportunity[] = [
  { id: "OPP0001", customerId: "CUST0233", repId: "SR014", product: "Sales Booster", stage: "Qualified", value: 485830, closeDate: "2026-07-30", probability: 30 },
  { id: "OPP0002", customerId: "CUST0018", repId: "SR011", product: "Sales Booster", stage: "Closed Won", value: 382194, closeDate: "2026-08-29", probability: 25 },
  { id: "OPP0003", customerId: "CUST0082", repId: "SR006", product: "CRM Suite", stage: "Qualified", value: 406308, closeDate: "2026-09-16", probability: 50 },
  { id: "OPP0004", customerId: "CUST0247", repId: "SR014", product: "CloudSync", stage: "Negotiation", value: 237261, closeDate: "2026-06-20", probability: 91 },
  { id: "OPP0005", customerId: "CUST0071", repId: "SR024", product: "Analytics Pro", stage: "Qualified", value: 60978, closeDate: "2026-08-11", probability: 26 },
  { id: "OPP0006", customerId: "CUST0007", repId: "SR001", product: "Sales Booster", stage: "Closed Won", value: 144912, closeDate: "2026-08-25", probability: 87 }
];

export const CAMPAIGNS: Campaign[] = [
  { id: "CAMP001", name: "Paid Ads Campaign 1", type: "Webinar", budget: 24472, leadsGenerated: 217, roi: 1.61 },
  { id: "CAMP002", name: "Webinar Campaign 2", type: "Social Media", budget: 71619, leadsGenerated: 349, roi: 4.49 }
];

export const LEADS: Lead[] = [
  { id: "LEAD0001", source: "Email Campaign 52", assignedRep: "Margaret Hawkins DDS", score: 41, status: "New", date: "2026-03-26" },
  { id: "LEAD0002", source: "SEO Campaign 50", assignedRep: "Abigail Shaffer", score: 59, status: "Qualified", date: "2026-02-14" }
];

export const DISCOUNTS: DiscountRequest[] = [
  { id: "DISC0001", repName: "Abigail Shaffer", customerId: "CUST0008", percent: 16, status: "Approved", date: "2025-06-28" }
];

export const ACCOUNT_PLANS: AccountPlan[] = [
  { id: "PLAN0001", customerId: "CUST0001", goal: "Offer position his.", targetRevenue: 759513, reviewDate: "2027-04-05" }
];

export const RENEWALS: Renewal[] = [
  { id: "REN0001", customerId: "CUST0001", endDate: "2027-11-28", reminderDate: "2027-04-15", status: "Pending" }
];

export const FEEDBACK: Feedback[] = [
  { id: "FDB0001", customerId: "CUST0001", product: "CloudSync", category: "Performance", text: "Agency rock however simply policy least husband option.", satisfaction: "Unsatisfied" }
];

export const CONTACTS: Contact[] = [
  { id: "CONT0001", customerId: "CUST0001", name: "Curtis Buchanan", email: "maria47@yahoo.com", phone: "001-517-123-6851x6048", jobTitle: "Community pharmacist", lastInteraction: "2025-11-13" }
];
