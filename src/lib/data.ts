
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

export type FeatureRequest = {
  id: string;
  customerId: string;
  feature: string;
  priority: 'Low' | 'Medium' | 'High' | 'Critical';
  status: 'Backlog' | 'Planned' | 'In Development' | 'Released';
};

export type ExecutiveKPI = {
  region: string;
  revenue: number;
  winRate: number;
  forecast: number;
  growth: number;
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

export const CUSTOMERS: Customer[] = Array.from({ length: 250 }).map((_, i) => ({
  id: `CUST${(i + 1).toString().padStart(4, '0')}`,
  name: `Client ${i + 1}`,
  industry: ["IT", "Education", "Retail", "Manufacturing", "Finance", "Healthcare"][i % 6],
  region: ["North", "South", "East", "West", "Central"][i % 5],
  revenue: Math.floor(Math.random() * 5000000) + 100000,
  since: "2020-01-01",
  manager: SALES_REPS[i % 25].name,
  satisfaction: parseFloat((Math.random() * 3 + 2).toFixed(1))
}));

export const CONTACTS: Contact[] = Array.from({ length: 350 }).map((_, i) => ({
  id: `CONT${(i + 1).toString().padStart(4, '0')}`,
  customerId: `CUST${((i % 250) + 1).toString().padStart(4, '0')}`,
  name: `Contact ${i + 1}`,
  email: `contact${i + 1}@example.com`,
  phone: `555-${(1000 + i).toString()}`,
  jobTitle: ["Manager", "Director", "VP", "Analyst", "Lead"][i % 5],
  lastInteraction: "2024-03-01"
}));

export const SALES_ACTIVITIES: SalesActivity[] = Array.from({ length: 1200 }).map((_, i) => ({
  id: `ACT${(i + 1).toString().padStart(5, '0')}`,
  repId: SALES_REPS[i % 25].id,
  customerId: `CUST${((i % 250) + 1).toString().padStart(4, '0')}`,
  type: ["Call", "Email", "Meeting", "Demo", "Follow-up"][i % 5],
  date: "2024-03-24",
  status: ["Completed", "Pending", "In Progress", "Open"][i % 4],
  notes: "Interaction notes recorded in the field."
}));

export const OPPORTUNITIES: Opportunity[] = Array.from({ length: 700 }).map((_, i) => ({
  id: `OPP${(i + 1).toString().padStart(4, '0')}`,
  customerId: `CUST${((i % 250) + 1).toString().padStart(4, '0')}`,
  repId: SALES_REPS[i % 25].id,
  product: ["Sales Booster", "CRM Suite", "CloudSync", "Analytics Pro", "AI Assistant"][i % 5],
  stage: ["Prospecting", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"][i % 6],
  value: Math.floor(Math.random() * 500000) + 5000,
  closeDate: "2026-08-25",
  probability: Math.floor(Math.random() * 100)
}));

export const CAMPAIGNS: Campaign[] = Array.from({ length: 80 }).map((_, i) => ({
  id: `CAMP${(i + 1).toString().padStart(3, '0')}`,
  name: `${["Paid Ads", "Webinar", "Social Media", "Email", "SEO"][i % 5]} Campaign ${i + 1}`,
  type: ["Webinar", "Social Media", "Email", "SEO", "Paid Ads"][i % 5],
  budget: Math.floor(Math.random() * 90000) + 5000,
  leadsGenerated: Math.floor(Math.random() * 500),
  roi: parseFloat((Math.random() * 4 + 1).toFixed(2))
}));

export const LEADS: Lead[] = Array.from({ length: 500 }).map((_, i) => ({
  id: `LEAD${(i + 1).toString().padStart(4, '0')}`,
  leadSource: CAMPAIGNS[i % 80].name,
  assignedRep: SALES_REPS[i % 25].name,
  score: Math.floor(Math.random() * 100),
  status: ["New", "Contacted", "Qualified", "Converted"][i % 4],
  date: "2026-03-26"
}));

export const DISCOUNTS: DiscountRequest[] = Array.from({ length: 300 }).map((_, i) => ({
  id: `DISC${(i + 1).toString().padStart(4, '0')}`,
  repName: SALES_REPS[i % 25].name,
  customerId: `CUST${((i % 250) + 1).toString().padStart(4, '0')}`,
  percent: Math.floor(Math.random() * 25) + 5,
  status: ["Approved", "Pending", "Rejected"][i % 3] as any,
  date: "2025-06-28"
}));

export const ACCOUNT_PLANS: AccountPlan[] = Array.from({ length: 200 }).map((_, i) => ({
  id: `PLAN${(i + 1).toString().padStart(4, '0')}`,
  customerId: `CUST${((i % 250) + 1).toString().padStart(4, '0')}`,
  goal: "Strategic growth and service expansion.",
  targetRevenue: Math.floor(Math.random() * 1000000) + 50000,
  reviewDate: "2027-04-05"
}));

export const RENEWALS: Renewal[] = Array.from({ length: 250 }).map((_, i) => ({
  id: `REN${(i + 1).toString().padStart(4, '0')}`,
  customerId: `CUST${(i + 1).toString().padStart(4, '0')}`,
  endDate: "2027-11-28",
  reminderDate: "2027-04-15",
  status: ["Pending", "Renewed", "Upcoming"][i % 3] as any
}));

export const FEEDBACK: Feedback[] = Array.from({ length: 400 }).map((_, i) => ({
  id: `FDB${(i + 1).toString().padStart(4, '0')}`,
  customerId: `CUST${((i % 250) + 1).toString().padStart(4, '0')}`,
  product: ["CloudSync", "AI Assistant", "Sales Booster", "Analytics Pro", "CRM Suite"][i % 5],
  category: ["Performance", "Bug", "Usability", "Feature"][i % 4],
  text: "User reported detailed feedback regarding application performance and features.",
  satisfaction: ["Unsatisfied", "Satisfied", "Neutral", "Very Satisfied"][i % 4]
}));

export const FEATURE_REQUESTS: FeatureRequest[] = Array.from({ length: 250 }).map((_, i) => ({
  id: `FR${(i + 1).toString().padStart(4, '0')}`,
  customerId: `CUST${((i % 250) + 1).toString().padStart(4, '0')}`,
  feature: [
    "Cross-group implementation", "Digitized needs-based definition", "Fully-configurable interface",
    "Reactive regional application", "Synergistic budgetary management", "Multi-lateral didactic database"
  ][i % 6],
  priority: ["Low", "Medium", "High", "Critical"][i % 4] as any,
  status: ["Backlog", "Planned", "In Development", "Released"][i % 4] as any
}));

export const EXECUTIVE_KPI_DATA: ExecutiveKPI[] = [
  { region: "North", revenue: 6030776, winRate: 28.64, forecast: 4358189, growth: 15.26 },
  { region: "South", revenue: 4808186, winRate: 79.25, forecast: 1548779, growth: 26.0 },
  { region: "East", revenue: 6921373, winRate: 32.49, forecast: 3904033, growth: 15.53 },
  { region: "West", revenue: 8008273, winRate: 47.63, forecast: 4294266, growth: 16.1 },
  { region: "Central", revenue: 7516989, winRate: 47.81, forecast: 3333682, growth: 13.15 }
];
