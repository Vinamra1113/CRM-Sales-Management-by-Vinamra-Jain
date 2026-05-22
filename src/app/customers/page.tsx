
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
  FileText,
  Trash2,
  Edit
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { cn } from "@/lib/utils"
import { useFirestore, useCollection } from "@/firebase"
import { collection, addDoc, updateDoc, deleteDoc, doc } from "firebase/firestore"
import { useToast } from "@/hooks/use-toast"
import { CUSTOMERS as INITIAL_DATA } from "@/lib/data"

export default function CustomerLedger() {
  const { toast } = useToast()
  const db = useFirestore()
  const { data: customers = [], loading } = useCollection<any>(db ? collection(db, "customers") : null)
  const [search, setSearch] = React.useState("")
  const [isCreateOpen, setIsCreateOpen] = React.useState(false)
  const [editingCustomer, setEditingCustomer] = React.useState<any>(null)

  const filteredCustomers = React.useMemo(() => {
    const list = customers.length > 0 ? customers : INITIAL_DATA;
    return list.filter(c => 
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.industry.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, customers]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!db) return
    
    const formData = new FormData(e.currentTarget)
    const payload = {
      name: formData.get("name") as string,
      industry: formData.get("industry") as string,
      region: formData.get("region") as string,
      revenue: Number(formData.get("revenue")),
      manager: formData.get("manager") as string,
      satisfaction: 4.0,
      since: new Date().toISOString().split('T')[0]
    }

    try {
      if (editingCustomer) {
        await updateDoc(doc(db, "customers", editingCustomer.id), payload)
        toast({ title: "Customer Updated" })
      } else {
        await addDoc(collection(db, "customers"), payload)
        toast({ title: "Customer Created" })
      }
      setIsCreateOpen(false)
      setEditingCustomer(null)
    } catch (err) {
      toast({ title: "Error saving customer", variant: "destructive" })
    }
  }

  const handleDelete = async (id: string) => {
    if (!db) return
    try {
      await deleteDoc(doc(db, "customers", id))
      toast({ title: "Customer Deleted" })
    } catch (err) {
      toast({ title: "Error deleting customer", variant: "destructive" })
    }
  }

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="text-3xl font-bold font-headline">Customer Ledger</h1>
          <p className="text-muted-foreground">Unified registry of contacts and historical interaction logs.</p>
        </div>
        <div className="flex items-center gap-3">
          <Dialog open={isCreateOpen} onOpenChange={(o) => { setIsCreateOpen(o); if(!o) setEditingCustomer(null); }}>
            <DialogTrigger asChild>
              <Button className="bg-primary gap-2">
                <Plus className="h-4 w-4" /> New Contact
              </Button>
            </DialogTrigger>
            <DialogContent>
              <form onSubmit={handleSave}>
                <DialogHeader>
                  <DialogTitle>{editingCustomer ? "Edit Customer" : "New Customer"}</DialogTitle>
                  <DialogDescription>Enter the enterprise client details below.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid gap-2">
                    <Label>Company Name</Label>
                    <Input name="name" defaultValue={editingCustomer?.name} required placeholder="e.g. HOSHŌ Corp" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="grid gap-2">
                      <Label>Industry</Label>
                      <Input name="industry" defaultValue={editingCustomer?.industry} required placeholder="e.g. Tech" />
                    </div>
                    <div className="grid gap-2">
                      <Label>Region</Label>
                      <Input name="region" defaultValue={editingCustomer?.region} required placeholder="e.g. North" />
                    </div>
                  </div>
                  <div className="grid gap-2">
                    <Label>Annual Revenue ($)</Label>
                    <Input name="revenue" type="number" defaultValue={editingCustomer?.revenue} required placeholder="1000000" />
                  </div>
                  <div className="grid gap-2">
                    <Label>Account Manager</Label>
                    <Input name="manager" defaultValue={editingCustomer?.manager} required placeholder="e.g. Allison Hill" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Save Customer</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search name, industry..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-card/30 border-border/50 h-10" 
          />
        </div>
      </div>

      <Card className="border-border/50 bg-card/20 backdrop-blur-sm">
        <div className="max-h-[600px] overflow-auto">
          <Table>
            <TableHeader className="sticky top-0 bg-background z-10 shadow-sm">
              <TableRow className="border-border/30 hover:bg-transparent">
                <TableHead className="w-[300px]">Client / Contact</TableHead>
                <TableHead>Industry / Region</TableHead>
                <TableHead>Annual Revenue</TableHead>
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
                    <div className="flex flex-col">
                      <span className="text-sm font-medium opacity-70">{customer.industry}</span>
                      <span className="text-[10px] text-muted-foreground">{customer.region}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-code text-sm font-bold">
                    ${(customer.revenue || 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-xs text-muted-foreground">
                    {customer.manager}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-primary" onClick={() => { setEditingCustomer(customer); setIsCreateOpen(true); }}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive" onClick={() => handleDelete(customer.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  )
}
