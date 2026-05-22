
'use client';

import * as React from "react"
import { useRouter } from "next/navigation"
import { 
  Send, 
  Zap, 
  Globe, 
  TrendingUp,
  MessageSquare,
  Plus,
  ChevronLeft
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CAMPAIGNS as INITIAL_CAMPAIGNS, LEADS as INITIAL_LEADS } from "@/lib/data"
import { useFirestore, useCollection } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'

export default function MarketingHub() {
  const router = useRouter()
  const { toast } = useToast()
  const db = useFirestore()
  const [mounted, setMounted] = React.useState(false)
  const { data: dbCampaigns = [] } = useCollection<any>(db ? collection(db, "campaigns") : null)
  const { data: dbLeads = [] } = useCollection<any>(db ? collection(db, "leads") : null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const campaigns = dbCampaigns.length > 0 ? dbCampaigns : INITIAL_CAMPAIGNS;
  const leads = dbLeads.length > 0 ? dbLeads : INITIAL_LEADS;

  const stats = React.useMemo(() => {
    if (!mounted) return { avgROI: "0.00", totalLeads: "0", qualifiedLeads: "0", qualRate: "0" }
    const roiSum = campaigns.reduce((acc, c) => acc + (c.roi || 0), 0);
    const qualifiedCount = leads.filter(l => l.status === "Qualified").length;
    return {
      avgROI: (roiSum / campaigns.length).toFixed(2),
      totalLeads: leads.length.toString(),
      qualifiedLeads: qualifiedCount.toString(),
      qualRate: ((qualifiedCount / leads.length) * 100).toFixed(0)
    }
  }, [mounted, campaigns, leads])

  const handleLaunchCampaign = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return

    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get("name") as string,
      type: formData.get("type") as string,
      budget: Number(formData.get("budget")),
      leadsGenerated: 0,
      roi: 0,
      createdAt: serverTimestamp()
    }

    addDoc(collection(db, "campaigns"), payload)
      .then(() => toast({ title: "Campaign Launched", description: "Program metrics tracking is now live." }))
      .catch(async (err) => {
        const permsError = new FirestorePermissionError({
          path: 'campaigns',
          operation: 'create',
          requestResourceData: payload
        });
        errorEmitter.emit('permission-error', permsError);
      });
  }

  if (!mounted) return null

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Back to Roles</span>
          </div>
          <h1 className="text-3xl font-bold font-headline">Marketing Intelligence</h1>
          <p className="text-muted-foreground">Campaign performance monitoring and lead distribution orchestration.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2" onClick={() => toast({ title: "Leads Synchronized", description: `${stats.qualifiedLeads} verified leads pushed to Sales Reps.` })}>
            <Send className="h-4 w-4" /> Distribute Leads
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary gap-2">
                <Plus className="h-4 w-4" /> New Campaign
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleLaunchCampaign}>
                <DialogHeader>
                  <DialogTitle>Launch New Campaign</DialogTitle>
                  <DialogDescription>Initialize a multi-channel demand generation program.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Campaign Name</Label>
                    <Input name="name" required placeholder="e.g. Q4 CloudSync Push" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Channel</Label>
                    <Select name="type" required defaultValue="Paid Ads">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Channel" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Webinar">Webinar</SelectItem>
                        <SelectItem value="Social Media">Social Media</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Paid Ads">Paid Ads</SelectItem>
                        <SelectItem value="SEO">SEO</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Budget Allocation</Label>
                    <Input name="budget" type="number" required placeholder="25000" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Launch Program</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Portfolio ROI", value: `${stats.avgROI}x`, sub: `Avg across ${campaigns.length} campaigns`, icon: TrendingUp, color: "text-accent" },
          { label: "Qualified Pipeline", value: stats.qualifiedLeads, sub: `${stats.qualRate}% Qualification Rate`, icon: Zap, color: "text-primary" },
          { label: "Campaign Count", value: campaigns.length.toString(), sub: "Active program volume", icon: Globe, color: "text-accent" },
          { label: "Lead Volume", value: stats.totalLeads, sub: "Gross generated lifetime", icon: MessageSquare, color: "text-primary" },
        ].map((kpi, i) => (
          <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-xs font-medium uppercase tracking-widest text-muted-foreground">{kpi.label}</CardTitle>
              <kpi.icon className={cn("h-4 w-4", kpi.color)} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold font-headline">{kpi.value}</div>
              <p className="text-[10px] text-muted-foreground mt-1">{kpi.sub}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">High-Performance Programs</CardTitle>
            <CardDescription>Top campaigns ranked by ROI.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...campaigns].sort((a, b) => (b.roi || 0) - (a.roi || 0)).slice(0, 6).map((camp) => (
              <div key={camp.id || camp.name} className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50 hover:bg-card/80 transition-all cursor-pointer group">
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{camp.name}</h4>
                    <Badge variant="secondary" className="text-[9px] h-4 border-none">{camp.type}</Badge>
                  </div>
                  <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                    <span className="bg-primary/10 text-primary px-1.5 rounded py-0.5 font-bold">ROI: {camp.roi}x</span>
                    <span>Leads: {camp.leadsGenerated}</span>
                    <span className="font-code">Budget: ${Number(camp.budget).toLocaleString()}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-bold text-accent">{camp.budget > 0 ? ((camp.leadsGenerated / camp.budget) * 1000).toFixed(1) : "0.0"}</div>
                  <div className="text-[8px] text-muted-foreground uppercase">L/$1k</div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Real-time Lead Feed</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {leads.slice(0, 10).map((lead) => (
              <div key={lead.id || lead.LeadID} className="flex items-center gap-3 p-2 rounded-lg bg-background/40 border border-border/10 hover:bg-muted/50 transition-colors cursor-pointer group">
                <div className={cn(
                  "h-8 w-8 rounded flex items-center justify-center text-[10px] font-bold",
                  (lead.score || lead.LeadScore) >= 80 ? "bg-green-500/20 text-green-500" : "bg-primary/20 text-primary"
                )}>
                  {lead.score || lead.LeadScore}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="text-[11px] font-bold truncate group-hover:text-primary transition-colors">{lead.assignedRep || lead.AssignedRep}</div>
                  <div className="text-[9px] text-muted-foreground uppercase">{lead.status || lead.Status} • {lead.leadSource || lead.LeadSource}</div>
                </div>
                <Badge variant="outline" className="text-[8px] border-none bg-muted/50 px-1">NEW</Badge>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs font-bold mt-2" onClick={() => router.push('/orchestrator')}>
              Access Lead Data Lake
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
