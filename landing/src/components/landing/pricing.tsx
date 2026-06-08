"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"

import { SectionWrapper } from "@/components/section-wrapper"

export function Pricing() {
    return (
        <section id="pricing" className="py-20 bg-muted/50">
            <div className="container mx-auto px-4">
                <SectionWrapper className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Simple, Transparent Pricing</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        Start for free and scale as your institution grows.
                    </p>
                </SectionWrapper>

                <div className="grid gap-8 md:grid-cols-2 lg:max-w-4xl lg:mx-auto">
                    {/* Free Tier */}
                    <SectionWrapper delay={0.2} className="h-full">
                        <Card className="flex flex-col h-full transition-transform hover:scale-105">
                            <CardHeader>
                                <CardTitle className="text-2xl">Starter</CardTitle>
                                <CardDescription>Perfect for small pilots and trials.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="text-4xl font-bold mb-6">Free <span className="text-lg font-normal text-muted-foreground">/ 3 months</span></div>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>Up to 20 Students</span></li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>Up to 5 Teachers</span></li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>100 Total Bids</span></li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>3 Projects per User</span></li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>Basic Assistance</span></li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full" variant="outline">Get Started Free</Button>
                            </CardFooter>
                        </Card>
                    </SectionWrapper>

                    {/* Paid Tier */}
                    <SectionWrapper delay={0.4} className="h-full">
                        <Card className="flex flex-col border-primary shadow-lg scale-105 relative h-full transition-transform hover:scale-[1.07]">
                            <div className="absolute -top-4 left-0 right-0 flex justify-center">
                                <span className="bg-primary text-primary-foreground text-sm font-medium px-3 py-1 rounded-full">Recommended</span>
                            </div>
                            <CardHeader>
                                <CardTitle className="text-2xl">Institution Pro</CardTitle>
                                <CardDescription>For established colleges and schools.</CardDescription>
                            </CardHeader>
                            <CardContent className="flex-1">
                                <div className="text-4xl font-bold mb-6">Custom <span className="text-lg font-normal text-muted-foreground">/ year</span></div>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>Up to 1000 Students</span></li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>Up to 100 Teachers</span></li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>Unlimited Bidding</span></li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>Unlimited Project Submissions</span></li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>Consistent Database Support</span></li>
                                    <li className="flex items-center gap-2"><Check className="h-4 w-4 text-primary" /> <span>Priority Assistance (24/7)</span></li>
                                </ul>
                            </CardContent>
                            <CardFooter>
                                <Button className="w-full">Contact Sales</Button>
                            </CardFooter>
                        </Card>
                    </SectionWrapper>
                </div>
            </div>
        </section>
    )
}
