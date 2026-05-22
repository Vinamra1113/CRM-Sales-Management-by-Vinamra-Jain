
"use client"

import * as React from "react"
import { 
  Search, 
  Filter, 
  Download, 
  Mail, 
  History,
  ExternalLink,
  Star,
  Plus,
  Globe,
  FileText
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
import { CUSTOMERS } from "@/lib/data"

export default function CustomerLedger() {
  const [search, setSearch] = React.useState("");

  const filteredCustomers = React.useMemo(() => {
    return CUSTOMERS.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase()) ||
      c.id.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

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
          <Input 
            placeholder="Search name, industry, or ID..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card/30 border-border/50 h-10" 
          />
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
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10 shadow-sm">
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="w-[300px]">Client / Contact</TableHead>
                <TableHead>Health & Satisfaction</TableHead>
                <TableHead>Industry / Region</TableHead>
                <TableHead>Lifetime Value</TableHead>
                <TableHead>Manager</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id} className="border-border/20 group hover:bg-primary/5 transition-all">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-9 w-9 border border-border/50">
                        <AvatarImage src={`https://picsum.photos/seed/${customer.id}/100/100`} />
                        <AvatarFallback>{customer.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-bold text-sm tracking-tight">{customer.name}</span>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-widest">ID: {customer.id}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1">
                        <Star className={cn("h-3 w-3", customer.satisfaction >= 4 ? "text-accent fill-accent" : "text-muted-foreground")} />
                        <span className="text-xs font-bold">{customer.satisfaction} / 5.0</span>
                      </div>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-[9px] w-fit font-bold uppercase py-0 px-1.5 h-4 border-none",
                          customer.satisfaction >= 4.5 ? "bg-green-500/10 text-green-500" :
                          customer.satisfaction >= 3.5 ? "bg-accent/10 text-accent" :
                          customer.satisfaction < 3.0 ? "bg-destructive/10 text-destructive" : "bg-muted text-muted-foreground"
                        )}
                      >
                        {customer.satisfaction >= 4.5 ? "Excellent" : customer.satisfaction >= 3.5 ? "Good" : customer.satisfaction < 3.0 ? "At Risk" : "Average"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium opacity-70">{customer.industry}</span>
                      <span className="text-[10px] text-muted-foreground">{customer.region}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-code text-sm font-bold">
                    ${customer.revenue.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {customer.manager}
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
        </div>
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
            <CardTitle className="text-lg">Regional Market Share</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {['North', 'South', 'East', 'West', 'Central'].map(region => {
              const regionCustomers = CUSTOMERS.filter(c => c.region === region);
              const totalRevenue = regionCustomers.reduce((acc, c) => acc + c.revenue, 0);
              const progress = (totalRevenue / 10000000) * 100; // Normalized for visualization
              return (
                <div key={region} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase">
                    <span>{region}</span>
                    <span className="text-accent">${(totalRevenue / 1000000).toFixed(1)}M</span>
                  </div>
                  <div className="h-1.5 w-full bg-secondary rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${progress}%` }} />
                  </div>
                </div>
              )
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
