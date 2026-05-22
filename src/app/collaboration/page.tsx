"use client"

import * as React from "react"
import { 
  MessageSquare, 
  Lightbulb, 
  Rocket, 
  Plus,
  CheckCircle2,
  Trash2,
  Edit,
  ArrowRight
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
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
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { FEATURE_REQUESTS as INITIAL_REQUESTS, CUSTOMERS } from "@/lib/data"
import { useFirestore, useCollection } from "@/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc, serverTimestamp } from "firebase/firestore"
import { errorEmitter } from '@/firebase/error-emitter'
import { FirestorePermissionError } from '@/firebase/errors'

export default function ProductBridge() {
  const { toast } = useToast()
  const db = useFirestore()
  const { data: dbRequests = [] } = useCollection<any>(db ? collection(db, "feature-requests") : null)
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const featureRequests = dbRequests.length > 0 ? dbRequests : INITIAL_REQUESTS;
  const activeRequests = featureRequests.filter(f => (f.status || f.Status) !== 'Released');
  const highPriority = activeRequests.filter(f => (f.priority || f.Priority) === 'High' || (f.priority || f.Priority) === 'Critical').length;

  const handleSubmitFeedback = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return

    const formData = new FormData(e.currentTarget)
    const payload = {
      customerId: formData.get("customerId") as string,
      product: formData.get("product") as string,
      category: formData.get("category") as string,
      text: formData.get("text") as string,
      satisfaction: "Neutral",
      createdAt: serverTimestamp()
    }

    addDoc(collection(db, "feedback"), payload)
      .then(() => toast({ title: "Feedback Captured", description: "Product intelligence loop updated." }))
      .catch(async (err) => {
        const permsError = new FirestorePermissionError({
          path: 'feedback',
          operation: 'create',
          requestResourceData: payload
        });
        errorEmitter.emit('permission-error', permsError);
      });
  }

  const handleDeleteRequest = (id: string) => {
    if (!db) return
    deleteDoc(doc(db, "feature-requests", id))
      .then(() => toast({ title: "Request Removed" }))
      .catch(async (err) => {
        const permsError = new FirestorePermissionError({
          path: `feature-requests/${id}`,
          operation: 'delete'
        });
        errorEmitter.emit('permission-error', permsError);
      });
  }

  if (!mounted) return null

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Product Bridge</h1>
          <p className="text-muted-foreground">Sales-to-Product intelligence loop and roadmap synchronization.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2" onClick={() => toast({ title: "Public Roadmap", description: "Sharing link copied to clipboard." })}>
            <Rocket className="h-4 w-4" /> View Public Roadmap
          </Button>
          
          <Dialog>
            <DialogTrigger asChild>
              <Button className="bg-primary gap-2">
                <Plus className="h-4 w-4" /> Submit Feedback
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSubmitFeedback}>
                <DialogHeader>
                  <DialogTitle>Field Intelligence Report</DialogTitle>
                  <DialogDescription>Record direct customer feedback for the product roadmap.</DialogDescription>
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
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Product Area</Label>
                      <Select name="product" required defaultValue="CloudSync">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="CloudSync">CloudSync</SelectItem>
                          <SelectItem value="AI Assistant">AI Assistant</SelectItem>
                          <SelectItem value="CRM Suite">CRM Suite</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-2">
                      <Label>Category</Label>
                      <Select name="category" required defaultValue="Feature">
                        <SelectTrigger><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Bug">Bug</SelectItem>
                          <SelectItem value="Performance">Performance</SelectItem>
                          <SelectItem value="Usability">Usability</SelectItem>
                          <SelectItem value="Feature">Feature</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Feedback Details</Label>
                    <Textarea name="text" required placeholder="Describe the client requirement or pain point..." />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit to Roadmap</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Active Requests", value: activeRequests.length.toString(), sub: `${highPriority} high priority`, icon: Lightbulb, color: "text-accent" },
          { label: "Sales Feedback", value: "400+", sub: "Total entries", icon: MessageSquare, color: "text-primary" },
          { label: "Next Release", value: "v2.4", sub: "Scheduled for March 15", icon: Rocket, color: "text-accent" },
          { label: "Sync Health", value: "Optimal", sub: "Weekly meeting confirmed", icon: CheckCircle2, color: "text-primary" },
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
            <CardTitle className="text-lg">Feature Requests from Field</CardTitle>
            <CardDescription>Consolidated customer requirements from your dataset.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {featureRequests.slice(0, 10).map((item) => {
              const priority = item.priority || item.Priority;
              const status = item.status || item.Status;
              const feature = item.feature || item.RequestedFeature;
              return (
                <Sheet key={item.id}>
                  <SheetTrigger asChild>
                    <div className="flex items-center gap-4 p-4 rounded-xl border border-border/30 bg-card/50 hover:border-primary/30 transition-all cursor-pointer group">
                      <div className="flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold group-hover:text-primary transition-colors">{feature}</h4>
                          <Badge variant="outline" className={cn(
                            "text-[9px] font-bold h-4 px-1 border-none",
                            priority === "Critical" ? "bg-destructive/10 text-destructive" :
                            priority === "High" ? "bg-accent/10 text-accent" : "bg-muted text-muted-foreground"
                          )}>
                            {priority}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-3 text-[10px] text-muted-foreground">
                          <span className="font-code text-accent uppercase tracking-tighter">{item.id || "FR-NEW"}</span>
                          <span>Client: {item.customerId}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[10px] font-bold uppercase tracking-tighter opacity-70">{status}</span>
                        <Progress value={status === "In Development" ? 65 : status === "Planned" ? 30 : status === "Released" ? 100 : 10} className="h-1 w-20 bg-secondary" />
                      </div>
                      <ChevronRight className="h-4 w-4 opacity-30 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Feature Request Detail</SheetTitle>
                      <SheetDescription>Technical breakdown and planning for {feature}</SheetDescription>
                    </SheetHeader>
                    <div className="py-6 space-y-6">
                      <div className="grid gap-2">
                        <Label className="text-[10px] uppercase">Current Status</Label>
                        <Badge className="w-fit">{status}</Badge>
                      </div>
                      <div className="grid gap-2">
                        <Label className="text-[10px] uppercase">Business Impact</Label>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          This request was generated by client {item.customerId}. Implementation will unlock Tier 3 expansion capabilities.
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" className="flex-1 gap-2" onClick={() => toast({ title: "Edit Draft Open" })}>
                          <Edit className="h-4 w-4" /> Edit
                        </Button>
                        <Button variant="destructive" className="flex-1 gap-2" onClick={() => handleDeleteRequest(item.id)}>
                          <Trash2 className="h-4 w-4" /> Delete
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              )
            })}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg">Recent Releases</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-border/20">
              {featureRequests.filter(f => (f.status || f.Status) === 'Released').slice(0, 5).map((rel) => (
                <div key={rel.id} className="flex items-center gap-4 p-4 hover:bg-muted/30 transition-colors">
                  <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center border border-border/50">
                    <Rocket className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <div className="text-sm font-bold truncate">{rel.feature || rel.RequestedFeature}</div>
                    <div className="text-[11px] text-muted-foreground italic">{rel.id}</div>
                  </div>
                  <Badge variant="outline" className="text-[8px] h-4 border-none bg-green-500/10 text-green-500">Live</Badge>
                </div>
              ))}
            </div>
            <div className="p-4">
              <Button variant="ghost" className="w-full text-xs font-bold gap-2 text-accent">
                Complete Changelog <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
