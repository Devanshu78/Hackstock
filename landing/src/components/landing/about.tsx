"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Users, ShieldCheck, Zap, Database, BarChart3, LayoutDashboard } from "lucide-react"

const clientFeatures = [
    { title: "Project Submission", description: "Easily submit and manage project proposals.", icon: Zap },
    { title: "Bidding System", description: "Place bids on projects with a transparent system.", icon: BarChart3 },
    { title: "Real-time Tracking", description: "Track project status and deadlines effortlessly.", icon: LayoutDashboard },
]

const adminFeatures = [
    { title: "User Management", description: "Efficiently manage students and teachers.", icon: Users },
    { title: "Dispute Resolution", description: "Handle conflicts with dedicated tools.", icon: ShieldCheck },
    { title: "Consistent Database", description: "Reliable data storage and backup support.", icon: Database },
]

import { SectionWrapper } from "@/components/section-wrapper"

export function About() {
    return (
        <section id="about" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
                <SectionWrapper className="text-center mb-16">
                    <Badge variant="outline" className="mb-4">Features</Badge>
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Built for Everyone</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Whether you are a student, teacher, or administrator, our platform provides tailored tools for your success.
                    </p>
                </SectionWrapper>

                <div className="grid gap-8 md:grid-cols-2">
                    <SectionWrapper delay={0.2} className="space-y-6">
                        <h3 className="text-2xl font-semibold text-center md:text-left text-primary">Client Experience</h3>
                        <div className="grid gap-4">
                            {clientFeatures.map((feature, idx) => (
                                <Card key={idx} className="transition-all hover:scale-[1.02] hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                        <div className="p-2 bg-primary/10 rounded-full">
                                            <feature.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <CardTitle className="text-base">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </SectionWrapper>
                    <SectionWrapper delay={0.4} className="space-y-6">
                        <h3 className="text-2xl font-semibold text-center md:text-left text-primary">Admin Control</h3>
                        <div className="grid gap-4">
                            {adminFeatures.map((feature, idx) => (
                                <Card key={idx} className="transition-all hover:scale-[1.02] hover:shadow-lg">
                                    <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                                        <div className="p-2 bg-primary/10 rounded-full">
                                            <feature.icon className="h-5 w-5 text-primary" />
                                        </div>
                                        <CardTitle className="text-base">{feature.title}</CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <p className="text-sm text-muted-foreground">{feature.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </SectionWrapper>
                </div>
            </div>
        </section>
    )
}
