'use client';

import * as React from "react"
import { 
  HeartPulse, 
  Bell, 
  Smile, 
  Frown, 
  Meh, 
  RefreshCcw, 
  Calendar,
  AlertTriangle,
  ChevronRight,
  Settings2,
  CheckCircle2
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Sheet, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { CUSTOMERS } from "@/lib/data"

export default function GrowthHealthTracker() {
  const { toast } = useToast()
  const [mounted, setMounted] = React.useState(false)
  const [isSyncing, setIsSyncing] = React.useState(false)
  const [selectedCustomer, setSelectedCustomer] = React.useState<any>(null)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const avgSatisfaction = React.useMemo(() => {
    if (!mounted) return "0.0"
    return (CUSTOMERS.reduce((acc, c) => acc + (c.satisfaction || 0), 0) / CUSTOMERS.length).toFixed(1)
  }, [mounted])

  const segments = React.useMemo(() => {
    if (!mounted) return { promoters: 0, passives: 0, detractors: 0, counts: { promoters: 0, passives: 0, detractors: 0 } }
    const promotersCount = CUSTOMERS.filter(c => c.satisfaction >= 4.5).length;
    const passivesCount = CUSTOMERS.filter(c => c.satisfaction >= 3.5 && c.satisfaction < 4.5).length;
    const detractorsCount = CUSTOMERS.length - promotersCount - passivesCount;
    
    return {
      promoters: Math.round((promotersCount / CUSTOMERS.length) * 100),
      passives: Math.round((passivesCount / CUSTOMERS.length) * 100),
      detractors: Math.round((detractorsCount / CUSTOMERS.length) * 100),
      counts: { promoters: promotersCount, passives: passivesCount, detractors: detractorsCount }
    }
  }, [mounted])

  const atRiskAccounts = React.useMemo(() => {
    if (!mounted) return []
    return CUSTOMERS.filter(c => c.satisfaction < 3.0).slice(0, 10)
  }, [mounted])

  const handleForceSync = () => {
    setIsSyncing(true)
    setTimeout(() => {
      setIsSyncing(false)
      toast({
        title: "Survey Sync Complete",
        description: "Latest NPS data has been pulled from primary production servers.",
      })
    }, 2000)
  }

  if (!mounted) return null

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold font-headline">Growth & Health Tracker</h1>
        <p className="text-muted-foreground font-body">Customer satisfaction metrics and automated contract renewal orchestration.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Global NPS Score</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold font-headline">{avgSatisfaction}</span>
              <Badge variant="outline" className="mb-2 bg-green-500/10 text-green-500 border-none">Real-time Data</Badge>
            </div>
            <div className="flex gap-1 h-3 rounded-full overflow-hidden">
              <div className="bg-destructive" style={{ width: `${segments.detractors}%` }} />
              <div className="bg-secondary" style={{ width: `${segments.passives}%` }} />
              <div className="bg-primary" style={{ width: `${segments.promoters}%` }} />
            </div>
            <div className="flex justify-between text-[10px] font-bold text-muted-foreground">
              <span>DETRACTORS ({segments.counts.detractors})</span>
              <span>PASSIVES ({segments.counts.passives})</span>
              <span>PROMOTERS ({segments.counts.promoters})</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Retention Health</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-3">
              <span className="text-5xl font-bold font-headline">{100 - segments.detractors}%</span>
              <Badge variant="outline" className="mb-2 bg-accent/10 text-accent border-none">Stable Portfolio</Badge>
            </div>
            <Progress value={100 - segments.detractors} className="h-3 bg-secondary" />
            <p className="text-[11px] text-muted-foreground leading-relaxed">Based on active satisfaction monitoring across all {CUSTOMERS.length} enterprise accounts.</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/40">
          <CardHeader>
            <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground font-medium">Renewal Alert Logic</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center gap-4 text-xs">
              <div className="flex-1 space-y-1">
                <div className="font-bold">Next 30 Days</div>
                <div className="text-muted-foreground">{atRiskAccounts.length} High Risk Renewals</div>
              </div>
              <div className="h-10 w-10 rounded-full border border-destructive/30 bg-destructive/5 flex items-center justify-center">
                <Bell className="h-5 w-5 text-destructive animate-bounce" />
              </div>
            </div>
            
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="secondary" className="w-full text-xs font-bold gap-2">
                  <Settings2 className="h-3.5 w-3.5" /> Configure Automation
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Renewal Automation Guards</DialogTitle>
                  <DialogDescription>Define logic for automated stakeholder engagement and alerts.</DialogDescription>
                </DialogHeader>
                <div className="space-y-6 py-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Auto-Reminder (T-90 Days)</Label>
                      <p className="text-[10px] text-muted-foreground">Notify Account Manager for all Tier 1 clients.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Risk Escalation</Label>
                      <p className="text-[10px] text-muted-foreground">Alert VP of Sales if satisfaction score drops below 3.0.</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Automated Renewals</Label>
                      <p className="text-[10px] text-muted-foreground">Self-service renewal portal for small-business tier.</p>
                    </div>
                    <Switch />
                  </div>
                </div>
                <DialogFooter>
                  <Button onClick={() => toast({ title: "Rules Updated" })}>Save Configuration</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">Critical Account Watchlist</CardTitle>
            <CardDescription>Accounts with scores below 3.0 requiring immediate strategic attention.</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {atRiskAccounts.map((item) => (
                <div key={item.id} className="flex flex-col md:flex-row items-center gap-4 p-4 hover:bg-muted/30 transition-all group">
                  <div className="flex-1 space-y-1">
                    <div className="font-bold text-sm">{item.name}</div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> Since {item.since}</span>
                      <span className="font-code font-bold text-foreground">${(item.revenue / 1000).toFixed(0)}k ACV</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-[10px] uppercase font-bold text-muted-foreground mb-1">Score: {item.satisfaction}</div>
                      <div className="flex gap-0.5">
                        {[1, 2, 3, 4, 5].map(dot => (
                          <div key={dot} className={cn("h-1.5 w-1.5 rounded-full", dot <= Math.round(item.satisfaction) ? "bg-destructive" : "bg-muted")} />
                        ))}
                      </div>
                    </div>
                    <Badge variant="outline" className="text-[10px] uppercase font-bold h-6 border-none bg-destructive/10 text-destructive">
                      CRITICAL RISK
                    </Badge>
                    
                    <Sheet>
                      <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSelectedCustomer(item)}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </SheetTrigger>
                      <SheetContent>
                        <SheetHeader>
                          <SheetTitle>Account Deep Dive</SheetTitle>
                          <SheetDescription>Strategic oversight for {item.name}</SheetDescription>
                        </SheetHeader>
                        <div className="py-6 space-y-6">
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest">Account Health</Label>
                            <div className="p-4 rounded-lg bg-destructive/5 border border-destructive/10">
                              <div className="text-2xl font-bold text-destructive">{item.satisfaction} / 5.0</div>
                              <p className="text-xs text-muted-foreground mt-1">NPS score is 42% below regional average.</p>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest">Revenue at Risk</Label>
                            <div className="text-lg font-bold">${item.revenue.toLocaleString()} ARR</div>
                          </div>
                          <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest">Assigned Manager</Label>
                            <div className="flex items-center gap-2">
                              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-xs">
                                {item.manager?.charAt(0)}
                              </div>
                              <span className="text-sm font-medium">{item.manager}</span>
                            </div>
                          </div>
                          <Button className="w-full bg-primary" onClick={() => toast({ title: "Intervention Task Logged" })}>
                            Request Executive Check-in
                          </Button>
                        </div>
                      </SheetContent>
                    </Sheet>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="text-lg">CSAT Sentiment Distribution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-xl bg-green-500/5 border border-green-500/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-green-500/20"><Smile className="h-5 w-5 text-green-500" /></div>
                  <div className="text-xs font-bold uppercase tracking-widest">Delighted</div>
                </div>
                <div className="font-headline font-bold text-xl">{segments.promoters}%</div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-accent/5 border border-accent/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-accent/20"><Meh className="h-5 w-5 text-accent" /></div>
                  <div className="text-xs font-bold uppercase tracking-widest">Satisfied</div>
                </div>
                <div className="font-headline font-bold text-xl">{segments.passives}%</div>
              </div>
              <div className="flex items-center justify-between p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-destructive/20"><Frown className="h-5 w-5 text-destructive" /></div>
                  <div className="text-xs font-bold uppercase tracking-widest">Unsatisfied</div>
                </div>
                <div className="font-headline font-bold text-xl">{segments.detractors}%</div>
              </div>
            </div>
            <Button 
              variant="outline" 
              className="w-full text-xs font-bold gap-2 bg-secondary/20"
              onClick={handleForceSync}
              disabled={isSyncing}
            >
              {isSyncing ? (
                <RefreshCcw className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5" />
              )}
              {isSyncing ? "Synchronizing..." : "Force Survey Sync"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
