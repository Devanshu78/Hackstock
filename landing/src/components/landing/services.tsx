"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2 } from "lucide-react"

const services = [
    {
        title: "Digital Transformation",
        description: "Modernize your project management workflow. Move away from paper-based submissions to a sleek, digital platform.",
    },
    {
        title: "Enhanced Collaboration",
        description: "Foster teamwork between students and mentors. Our platform enables seamless communication and feedback loops.",
    },
    {
        title: "Talent Showcase",
        description: "Give your students a platform to shine. Publicly showcase top projects to potential recruiters and the community.",
    },
    {
        title: "Streamlined Administration",
        description: "Reduce administrative overhead with automated tracking, grading assistance, and comprehensive reporting tools.",
    },
]

import { SectionWrapper } from "@/components/section-wrapper"

export function Services() {
    return (
        <section id="services" className="py-20">
            <div className="container mx-auto px-4">
                <SectionWrapper className="text-center mb-16">
                    <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Why Partner With Us?</h2>
                    <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
                        We bring the future of project management to your campus. Designed specifically for the unique needs of educational institutions.
                    </p>
                </SectionWrapper>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
                    {services.map((service, index) => (
                        <SectionWrapper key={index} delay={index * 0.1} className="h-full">
                            <Card className="border-none shadow-none bg-transparent h-full transition-all hover:-translate-y-2">
                                <CardHeader>
                                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                                        <CheckCircle2 className="h-6 w-6 text-primary" />
                                    </div>
                                    <CardTitle className="text-xl">{service.title}</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <p className="text-muted-foreground">{service.description}</p>
                                </CardContent>
                            </Card>
                        </SectionWrapper>
                    ))}
                </div>
            </div>
        </section>
    )
}
