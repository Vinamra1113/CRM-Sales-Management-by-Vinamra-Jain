
"use client"

import * as React from "react"
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  Phone, 
  Globe, 
  History,
  MessageSquare,
  FileText,
  ExternalLink,
  Star
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const customers = [
  { id: 1, name: "Sarah Jenkins", company: "CyberDyne Systems", role: "CTO", industry: "Tech", health: "Good", spent: 450000, lastContact: "2 days ago" },
  { id: 2, name: "Marcus Thorne", company: "Aether Group", role: "Procurement Manager", industry: "Manufacturing", health: "At Risk", spent: 120000, lastContact: "1 week ago" },
  { id: 3, name: "Elena Rodriguez", company: "Zenith Corp", role: "VP Sales", industry: "Logistics", health: "Excellent", spent: 890000, lastContact: "Today" },
  { id: 4, name: "David Chen", company: "Nova Labs", role: "Director", industry: "Healthcare", health: "Good", spent: 34000, lastContact: "3 days ago" },
  { id: 5, name: "Alice Cooper", company: "Heavy Metal Ltd", role: "CEO", industry: "Music Tech", health: "Average", spent: 56000, lastContact: "2 weeks ago" },
]

export default function CustomerLedger() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Customer Ledger</h1>
          <p className="text-muted-foreground">Unified registry of contacts and historical interaction logs.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="border-border/50 gap-2">
            <Download className="h-4 w-4" /> Export CSV
          </Button>
          <Button className="bg-primary gap-2">
            <Plus className="h-4 w-4" /> New Contact
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search name, company, or industry..." className="pl-9 bg-card/30 border-border/50 h-10" />
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="bg-secondary/50 border border-border/50 gap-2">
            <Filter className="h-4 w-4" /> Filter By Industry
          </Button>
          <Button variant="secondary" className="bg-secondary/50 border border-border/50 gap-2">
            <Star className="h-4 w-4" /> Favorites
          </Button>
        </div>
      </div>

      <Card className="border-border/50 bg-card/20 backdrop-blur-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-border/30 hover:bg-transparent">
              <TableHead className="w-[300px]">Client / Contact</TableHead>
              <TableHead>Status & Health</TableHead>
              <TableHead>Industry</TableHead>
              <TableHead>Lifetime Value</TableHead>
              <TableHead>Last Interaction</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((customer) => (
              <TableRow key={customer.id} className="border-border/20 group hover:bg-primary/5 transition-all">
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9 border border-border/50">
                      <AvatarImage src={`https://picsum.photos/seed/${customer.id}/100/100`} />
                      <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="font-bold text-sm tracking-tight">{customer.name}</span>
                      <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">{customer.company}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium">{customer.role}</span>
                    <Badge 
                      variant="outline" 
                      className={cn(
                        "text-[9px] w-fit font-bold uppercase py-0 px-1.5 h-4 border-none",
                        customer.health === "Excellent" ? "bg-green-500/10 text-green-500" :
                        customer.health === "Good" ? "bg-accent/10 text-accent" :
                        customer.health === "At Risk" ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                      )}
                    >
                      {customer.health}
                    </Badge>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-medium opacity-70">
                  {customer.industry}
                </TableCell>
                <TableCell className="font-code text-sm font-bold">
                  ${customer.spent.toLocaleString()}
                </TableCell>
                <TableCell className="text-xs text-muted-foreground">
                  {customer.lastContact}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-accent">
                      <Mail className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8 text-primary">
                      <History className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-border/50 bg-card/30">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg">Recent Engagement Feed</CardTitle>
            <Button variant="ghost" size="sm" className="text-xs font-bold text-accent">View All</Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { type: 'meeting', title: 'Onboarding Call', user: 'Sarah Jenkins', time: '2h ago', icon: Globe },
              { type: 'email', title: 'Proposal Feedback', user: 'Marcus Thorne', time: '5h ago', icon: Mail },
              { type: 'note', title: 'Internal Strategy Draft', user: 'Self', time: '1d ago', icon: FileText },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 items-start p-3 rounded-lg border border-border/30 hover:border-primary/30 transition-all bg-card/40">
                <div className="mt-1 p-2 rounded-md bg-secondary border border-border/50">
                  <item.icon className="h-3.5 w-3.5 text-accent" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{item.type}</span>
                    <span className="text-[10px] text-muted-foreground font-code">{item.time}</span>
                  </div>
                  <h4 className="text-sm font-semibold">{item.title}</h4>
                  <p className="text-[11px] text-muted-foreground">Contextual notes recorded for <span className="text-foreground/80 font-medium">{item.user}</span>.</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-card/30">
          <CardHeader>
            <CardTitle className="text-lg">Lead Interaction Map</CardTitle>
          </CardHeader>
          <CardContent className="h-[300px] flex items-center justify-center border border-dashed border-border/50 m-6 rounded-lg bg-background/30">
            <div className="text-center space-y-3">
              <Globe className="h-12 w-12 text-primary mx-auto opacity-20" />
              <p className="text-sm text-muted-foreground font-medium italic">Interactive Geographic Lead Distribution Visualization Loading...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function Plus({ className }: { className?: string }) {
  return <svg className={className} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 3.33334V12.6667" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M3.33331 8H12.6666" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
}
