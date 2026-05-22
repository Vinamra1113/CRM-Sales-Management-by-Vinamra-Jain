
'use client';

import * as React from "react"
import { useRouter } from "next/navigation"
import { ChevronLeft, BarChart3, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"

export default function PowerBIInsights() {
  const router = useRouter()

  return (
    <div className="p-8 space-y-8 animate-in fade-in duration-700 min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 mb-2">
            <Button variant="ghost" size="sm" onClick={() => router.back()} className="h-8 w-8 p-0">
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <span className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Back</span>
          </div>
          <h1 className="text-3xl font-bold font-headline">Enterprise BI Insights</h1>
          <p className="text-muted-foreground">Global CRM Sales Management Analytics powered by Power BI.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="border-border/50 gap-2" asChild>
            <a href="https://app.powerbi.com/view?r=eyJrIjoiZjNiNTZjZmQtZTQwNi00YmYzLTk5OTItYmEzMjg5ZjczMjQ3IiwidCI6IjRhNzhmOWQwLWFiZGUtNDBjNC1hMDg4LTBiOTg5NTk5M2M0YSJ9&pageName=9094271621de86647121" target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" /> Open in New Tab
            </a>
          </Button>
        </div>
      </div>

      <Card className="flex-1 border-border/50 bg-card/30 overflow-hidden shadow-2xl">
        <CardContent className="p-0 h-[calc(100vh-250px)] w-full">
          <div className="relative w-full h-full">
            <iframe 
              title="CRM Sales Management Dashboard" 
              className="absolute inset-0 w-full h-full border-0 rounded-b-lg"
              src="https://app.powerbi.com/view?r=eyJrIjoiZjNiNTZjZmQtZTQwNi00YmYzLTk5OTItYmEzMjg5ZjczMjQ3IiwidCI6IjRhNzhmOWQwLWFiZGUtNDBjNC1hMDg4LTBiOTg5NTk5M2M0YSJ9&pageName=9094271621de86647121" 
              allowFullScreen={true}
            />
          </div>
        </CardContent>
      </Card>
      
      <p className="text-center text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold opacity-50 pb-4">
        BI Engine Nominal • Vinamra Jain™ Enterprise Environment
      </p>
    </div>
  )
}
