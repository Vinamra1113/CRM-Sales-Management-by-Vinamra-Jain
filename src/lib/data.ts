
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
  { id: "CUST0010", name: "Liu, Baker and Mason", industry: "Healthcare", region: "East", revenue: 2108671, since: "2019-11-28", manager: "Noah Rhodes", satisfaction: 3.1 },
  { id: "CUST0011", name: "Gaines, Harrell and Evans", industry: "Manufacturing", region: "North", revenue: 818513, since: "2023-10-28", manager: "Tommy Walter", satisfaction: 3.7 },
  { id: "CUST0012", name: "Lynch, Hernandez and Farmer", industry: "IT", region: "Central", revenue: 1154955, since: "2022-12-22", manager: "Cristian Santos", satisfaction: 4.1 },
  { id: "CUST0013", name: "Sellers, George and Burns", industry: "Manufacturing", region: "South", revenue: 2323456, since: "2019-05-04", manager: "Holly Wood", satisfaction: 4.7 },
  { id: "CUST0014", name: "Koch-Decker", industry: "Retail", region: "South", revenue: 4623943, since: "2021-01-01", manager: "Matthew Foster", satisfaction: 4.3 },
  { id: "CUST0015", name: "Brown PLC", industry: "Finance", region: "East", revenue: 3446989, since: "2019-01-21", manager: "Patty Perez", satisfaction: 4.1 },
  { id: "CUST0016", name: "Dennis Inc", industry: "Retail", region: "Central", revenue: 3887340, since: "2024-11-09", manager: "Daniel Wagner", satisfaction: 3.1 },
  { id: "CUST0017", name: "Cannon, Anderson and Alvarez", industry: "IT", region: "East", revenue: 276448, since: "2023-01-24", manager: "Lisa Jackson", satisfaction: 3.9 },
  { id: "CUST0018", name: "Baker PLC", industry: "Manufacturing", region: "South", revenue: 160321, since: "2021-12-26", manager: "Angie Henderson", satisfaction: 4.3 },
  { id: "CUST0019", name: "Hickman Ltd", industry: "IT", region: "South", revenue: 665394, since: "2024-04-03", manager: "Noah Rhodes", satisfaction: 4.6 },
  { id: "CUST0020", name: "Marquez Group", industry: "IT", region: "Central", revenue: 2096527, since: "2024-02-06", manager: "Gabrielle Davis", satisfaction: 4.2 },
  { id: "CUST0021", name: "Brooks, Lam and Hayes", industry: "Finance", region: "Central", revenue: 1209912, since: "2020-06-30", manager: "Tommy Walter", satisfaction: 4.8 },
  { id: "CUST0022", name: "Brown Inc", industry: "Manufacturing", region: "Central", revenue: 4065051, since: "2023-05-23", manager: "Gina Moore", satisfaction: 4.5 },
  { id: "CUST0023", name: "Hall, Robinson and Jones", industry: "Retail", region: "South", revenue: 891262, since: "2023-10-03", manager: "Daniel Wagner", satisfaction: 4.1 },
  { id: "CUST0024", name: "Perez Inc", industry: "Healthcare", region: "West", revenue: 3548575, since: "2025-09-12", manager: "Dylan Miller", satisfaction: 4.7 },
  { id: "CUST0025", name: "Jones-Young", industry: "IT", region: "North", revenue: 608455, since: "2024-01-29", manager: "Lisa Hensley", satisfaction: 4.3 }
];

export const CAMPAIGNS: Campaign[] = [
  { id: "CAMP001", name: "Paid Ads Campaign 1", type: "Webinar", budget: 24472, leadsGenerated: 217, roi: 1.61 },
  { id: "CAMP002", name: "Webinar Campaign 2", type: "Social Media", budget: 71619, leadsGenerated: 349, roi: 4.49 },
  { id: "CAMP003", name: "Social Media Campaign 3", type: "Email", budget: 66691, leadsGenerated: 454, roi: 3.49 },
  { id: "CAMP004", name: "Email Campaign 4", type: "Social Media", budget: 71665, leadsGenerated: 248, roi: 3.88 },
  { id: "CAMP005", name: "Paid Ads Campaign 5", type: "Webinar", budget: 70350, leadsGenerated: 315, roi: 2.59 },
  { id: "CAMP006", name: "Webinar Campaign 6", type: "Webinar", budget: 73875, leadsGenerated: 405, roi: 2.67 },
  { id: "CAMP007", name: "SEO Campaign 7", type: "SEO", budget: 40171, leadsGenerated: 347, roi: 2.3 },
  { id: "CAMP008", name: "Paid Ads Campaign 8", type: "Email", budget: 32158, leadsGenerated: 162, roi: 4.53 },
  { id: "CAMP009", name: "SEO Campaign 9", type: "Social Media", budget: 56891, leadsGenerated: 161, roi: 1.88 },
  { id: "CAMP010", name: "SEO Campaign 10", type: "Paid Ads", budget: 25605, leadsGenerated: 481, roi: 2.18 }
];

export const LEADS: Lead[] = [
  { id: "LEAD0001", source: "Email Campaign 52", assignedRep: "Margaret Hawkins DDS", score: 41, status: "New", date: "2026-03-26" },
  { id: "LEAD0002", source: "SEO Campaign 50", assignedRep: "Abigail Shaffer", score: 59, status: "Qualified", date: "2026-02-14" },
  { id: "LEAD0003", source: "SEO Campaign 9", assignedRep: "Patty Perez", score: 36, status: "Contacted", date: "2025-09-27" },
  { id: "LEAD0004", source: "Webinar Campaign 6", assignedRep: "Angie Henderson", score: 28, status: "Converted", date: "2026-03-01" },
  { id: "LEAD0005", source: "Webinar Campaign 39", assignedRep: "Matthew Foster", score: 77, status: "Converted", date: "2025-06-08" }
];

export const DISCOUNTS: DiscountRequest[] = [
  { id: "DISC0001", repName: "Abigail Shaffer", customerId: "CUST0008", percent: 16, status: "Approved", date: "2025-06-28" },
  { id: "DISC0002", repName: "Abigail Shaffer", customerId: "CUST0008", percent: 15, status: "Approved", date: "2025-09-23" },
  { id: "DISC0003", repName: "Gina Moore", customerId: "CUST0022", percent: 28, status: "Pending", date: "2025-09-25" },
  { id: "DISC0004", repName: "Cristian Santos", customerId: "CUST0003", percent: 13, status: "Rejected", date: "2025-09-30" }
];

export const ACCOUNT_PLANS: AccountPlan[] = [
  { id: "PLAN0001", customerId: "CUST0001", goal: "Offer position his.", targetRevenue: 759513, reviewDate: "2027-04-05" },
  { id: "PLAN0002", customerId: "CUST0002", goal: "Bring three indeed laugh.", targetRevenue: 872937, reviewDate: "2026-07-08" },
  { id: "PLAN0003", customerId: "CUST0003", goal: "Second wrong including weight.", targetRevenue: 961243, reviewDate: "2026-09-06" }
];

export const RENEWALS: Renewal[] = [
  { id: "REN0001", customerId: "CUST0001", endDate: "2027-11-28", reminderDate: "2027-04-15", status: "Pending" },
  { id: "REN0002", customerId: "CUST0002", endDate: "2026-09-28", reminderDate: "2026-11-25", status: "Renewed" },
  { id: "REN0003", customerId: "CUST0003", endDate: "2028-01-28", reminderDate: "2026-11-22", status: "Renewed" }
];

export const FEEDBACK: Feedback[] = [
  { id: "FDB0001", customerId: "CUST0001", product: "CloudSync", category: "Performance", text: "Agency rock however simply policy least husband option.", satisfaction: "Unsatisfied" },
  { id: "FDB0002", customerId: "CUST0002", product: "AI Assistant", category: "Bug", text: "Action recognize crime poor beat house stage college.", satisfaction: "Satisfied" },
  { id: "FDB0003", customerId: "CUST0003", product: "AI Assistant", category: "Usability", text: "Drop fish movement career game live let its window.", satisfaction: "Unsatisfied" }
];

export const CONTACTS: Contact[] = [
  { id: "CONT0001", customerId: "CUST0001", name: "Curtis Buchanan", email: "maria47@yahoo.com", phone: "001-517-123-6851x6048", jobTitle: "Community pharmacist", lastInteraction: "2025-11-13" },
  { id: "CONT0002", customerId: "CUST0002", name: "Paul Baker", email: "daniel37@gmail.com", phone: "+1-859-317-4612x004", jobTitle: "Research officer, government", lastInteraction: "2025-07-05" }
];

export const OPPORTUNITIES: Opportunity[] = [
  { id: "OPP0001", customerId: "CUST0001", repId: "SR014", product: "Sales Booster", stage: "Qualified", value: 485830, closeDate: "2026-07-30", probability: 30 },
  { id: "OPP0002", customerId: "CUST0002", repId: "SR011", product: "Sales Booster", stage: "Closed Won", value: 382194, closeDate: "2026-08-29", probability: 25 }
];
