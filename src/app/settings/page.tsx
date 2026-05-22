
"use client"

import * as React from "react"
import { 
  Settings2, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Database, 
  Zap,
  CreditCard,
  ChevronRight
} from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"

export default function SystemSettings() {
  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-1">
        <h1 className="text-3xl font-bold font-headline">System Settings</h1>
        <p className="text-muted-foreground">Configure platform preferences and enterprise governance.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1 space-y-2">
          {[
            { label: "Profile", icon: User, active: true },
            { label: "Notifications", icon: Bell },
            { label: "Security", icon: Shield },
            { label: "Regional", icon: Globe },
            { label: "Integrations", icon: Zap },
            { label: "Billing", icon: CreditCard },
          ].map((item) => (
            <Button
              key={item.label}
              variant={item.active ? "secondary" : "ghost"}
              className="w-full justify-start gap-3 h-10 font-medium"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Button>
          ))}
        </aside>

        <main className="lg:col-span-3 space-y-6">
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">User Profile</CardTitle>
              <CardDescription>Managed enterprise identity for HOSHŌ access.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="h-20 w-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary font-bold text-2xl">
                  JD
                </div>
                <div className="space-y-2">
                  <Button variant="outline" size="sm">Change Photo</Button>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">JPG, PNG or GIF. Max size 5MB.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="John Doe" className="bg-background/50 border-border/50" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" defaultValue="john.doe@hosho.ai" className="bg-background/50 border-border/50" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/50">
            <CardHeader>
              <CardTitle className="text-xl">Platform Automation</CardTitle>
              <CardDescription>Configure AI-driven lead routing and orchestration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold">Predictive Routing</div>
                  <div className="text-xs text-muted-foreground">Automatically assign leads based on rep performance history.</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-border/30" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold">Discount Guardrails</div>
                  <div className="text-xs text-muted-foreground">Trigger approval workflows for discounts above 15%.</div>
                </div>
                <Switch defaultChecked />
              </div>
              <Separator className="bg-border/30" />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="text-sm font-bold">Public Roadmap Visibility</div>
                  <div className="text-xs text-muted-foreground">Share internal product bridge with external strategic partners.</div>
                </div>
                <Switch />
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-end gap-3">
            <Button variant="ghost">Discard Changes</Button>
            <Button className="bg-primary">Save Configuration</Button>
          </div>
        </main>
      </div>
    </div>
  )
}
