
"use client"

import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { 
  Users, 
  Layers, 
  TrendingUp, 
  Plus, 
  ArrowRight, 
  MessageSquare,
  Activity as ActivityIcon,
  Target,
  Mail,
  Phone,
  ChevronLeft
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useFirestore, useCollection } from "@/firebase"
import { collection, addDoc, serverTimestamp } from "firebase/firestore"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'
import { SALES_REPS, OPPORTUNITIES, CONTACTS, CUSTOMERS, SALES_ACTIVITIES } from "@/lib/data"

export default function SalesRepresentativeHub() {
  const router = useRouter()
  const { toast } = useToast()
  const db = useFirestore()
  const { data: dbActivities = [] } = useCollection<any>(db ? collection(db, "activities") : null)
  const [isActivityOpen, setIsActivityOpen] = React.useState(false)

  const currentUser = SALES_REPS[0]; // SR001 Allison Hill
  const quotaPercent = (currentUser.achievement / currentUser.target) * 100;
  
  const userOpps = OPPORTUNITIES.filter(o => o.repId === currentUser.id);
  const totalPipelineValue = userOpps.reduce((sum, o) => sum + o.value, 0);
  
  const userContacts = CONTACTS.filter(contact => {
    const customer = CUSTOMERS.find(c => c.id === contact.customerId);
    return customer?.manager === currentUser.name;
  }).slice(0, 5);

  const handleLogActivity = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return

    const formData = new FormData(e.currentTarget)
    const payload = {
      repId: currentUser.id,
      customerId: formData.get("customerId"),
      type: formData.get("type"),
      notes: formData.get("notes"),
      date: new Date().toISOString().split('T')[0],
      status: "Completed",
      createdAt: serverTimestamp()
    }

    addDoc(collection(db, "activities"), payload)
      .then(() => {
        setIsActivityOpen(false)
        toast({ title: "Activity Logged", description: "Interaction synced to account timeline." })
      })
      .catch(async (err) => {
        const permsError = new FirestorePermissionError({
          path: 'activities',
          operation: 'create',
          requestResourceData: payload
        });
        errorEmitter.emit('permission-error', permsError);
      });
  }

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
          <h1 className="text-3xl font-bold font-headline">Welcome back, {currentUser.name}</h1>
          <p className="text-muted-foreground">Region: {currentUser.region} • Performance Score: {currentUser.score}</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isActivityOpen} onOpenChange={setIsActivityOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="border-border/50 gap-2">
                <MessageSquare className="h-4 w-4" /> Log Interaction
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleLogActivity}>
                <DialogHeader>
                  <DialogTitle>Sales Activity Log</DialogTitle>
                  <DialogDescription>Record details from your latest client meeting.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Customer</Label>
                    <Select name="customerId" required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Client" />
                      </SelectTrigger>
                      <SelectContent>
                        {CUSTOMERS.slice(0, 20).map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Type</Label>
                    <Select name="type" required defaultValue="Call">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Call">Call</SelectItem>
                        <SelectItem value="Email">Email</SelectItem>
                        <SelectItem value="Meeting">Meeting</SelectItem>
                        <SelectItem value="Demo">Demo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label>Notes</Label>
                    <Textarea name="notes" placeholder="Key takeaways..." required />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save to Ledger</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          
          <Button className="bg-primary gap-2" asChild>
            <Link href="/pipeline">
              <Plus className="h-4 w-4" /> Add Opportunity
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Quota Attainment", value: `${quotaPercent.toFixed(1)}%`, sub: "MTD Progress", icon: Target, color: "text-accent" },
          { label: "Pipeline Value", value: `$${(totalPipelineValue / 1000).toFixed(0)}k`, sub: `${userOpps.length} active deals`, icon: Layers, color: "text-primary" },
          { label: "Recent Activities", value: (dbActivities.length + SALES_ACTIVITIES.length).toString(), sub: "Lifetime count", icon: ActivityIcon, color: "text-accent" },
          { label: "Monthly Target", value: `$${currentUser.target.toLocaleString()}`, sub: "Revised Jan 1", icon: TrendingUp, color: "text-primary" },
        ].map((kpi, i) => (
          <Card key={i} className="border-border/50 bg-card/50 backdrop-blur-sm shadow-xl shadow-black/5">
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
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-headline">My Active Pipeline</CardTitle>
              <CardDescription>Highest probability deals from your opportunity dataset.</CardDescription>
            </div>
            <Button variant="ghost" size="sm" className="text-xs text-accent" asChild>
              <Link href="/pipeline">Full Pipeline <ArrowRight className="ml-1 h-3 w-3" /></Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {userOpps.sort((a, b) => b.probability - a.probability).slice(0, 5).map((opp) => (
              <div 
                key={opp.id} 
                onClick={() => router.push('/pipeline')}
                className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50 hover:border-primary/30 hover:bg-card/80 transition-all cursor-pointer group"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center gap-2">
                    <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{opp.product}</h4>
                    <Badge variant="outline" className="text-[9px] h-4 border-none bg-muted">{opp.stage}</Badge>
                  </div>
                  <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                    <span className="font-code text-accent font-bold">${(opp.value / 1000).toFixed(0)}k</span>
                    <span>{CUSTOMERS.find(c => c.id === opp.customerId)?.name}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-bold uppercase">{opp.probability}% Confidence</span>
                  <Progress value={opp.probability} className="h-1 w-24 bg-secondary" />
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg font-headline">Stakeholder Ledger</CardTitle>
            <CardDescription>Direct contacts for managed accounts.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {userContacts.map((contact) => (
              <div key={contact.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-colors border border-border/10 group">
                <Avatar className="h-8 w-8 border border-border/50">
                  <AvatarImage src={`https://picsum.photos/seed/${contact.id}/100/100`} />
                  <AvatarFallback>{contact.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <div className="text-xs font-bold truncate">{contact.name}</div>
                  <div className="text-[10px] text-muted-foreground truncate">{contact.jobTitle}</div>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Mail className="h-3 w-3" /></Button>
                  <Button variant="ghost" size="icon" className="h-7 w-7"><Phone className="h-3 w-3" /></Button>
                </div>
              </div>
            ))}
            <Button variant="outline" className="w-full text-xs font-bold mt-2" asChild>
              <Link href="/customers">Universal Ledger</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
