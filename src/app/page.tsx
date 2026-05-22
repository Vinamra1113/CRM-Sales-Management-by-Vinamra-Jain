
"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { ShieldCheck, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // router.push("/dashboard")
  }, [router])

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-6">
      <div className="max-w-4xl w-full space-y-12 text-center">
        <div className="space-y-6 animate-in fade-in zoom-in-95 duration-1000">
          <div className="inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-primary text-white shadow-2xl shadow-primary/20 rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold font-headline tracking-tighter bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            HOSHŌ DIGITAL SALES
          </h1>
          <p className="text-xl text-muted-foreground font-body max-w-2xl mx-auto leading-relaxed">
            Enterprise-grade sales intelligence and performance optimization platform for strategic multi-role workflows.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 animate-in slide-in-from-bottom-8 duration-1000 delay-300">
          {[
            { title: "Velocity Pipeline", desc: "Real-time deal progression", href: "/pipeline" },
            { title: "Strategic Insights", desc: "Advanced executive analytics", href: "/dashboard" },
            { title: "Customer Ledger", desc: "Unified CRM & interaction log", href: "/customers" }
          ].map((feature, i) => (
            <div key={i} className="group p-8 rounded-2xl border border-border/50 bg-card/30 hover:bg-card/80 hover:border-primary/50 transition-all cursor-pointer text-left backdrop-blur-sm shadow-xl shadow-black/20" onClick={() => router.push(feature.href)}>
              <h3 className="text-lg font-bold font-headline mb-2 flex items-center justify-between group-hover:text-accent">
                {feature.title}
                <ArrowRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>

        <div className="pt-16">
          <Button size="lg" onClick={() => router.push("/dashboard")} className="h-14 px-12 rounded-full font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 transition-all hover:scale-105 active:scale-95 group">
            Launch Platform
            <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          <p className="mt-8 text-[10px] text-muted-foreground uppercase tracking-[0.3em] font-bold opacity-50">
            System Status: Nominal • Last Patch: 14.02.2024
          </p>
        </div>
      </div>
      
      {/* Background Decor */}
      <div className="fixed top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] -z-10" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/5 rounded-full blur-[120px] -z-10" />
    </div>
  )
}
