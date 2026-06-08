"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"

import { SectionWrapper } from "@/components/section-wrapper"
import { Send } from "lucide-react"

export function Contact() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [description, setDescription] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const subject = encodeURIComponent(`Contact Request from ${name}`)
        const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nDescription:\n${description}`)
        window.open(`mailto:devanshup.pandey281@gmail.com?subject=${subject}&body=${body}`, '_blank')
    }

    return (
        <section id="contact" className="py-20">
            <div className="container mx-auto px-4">
                <SectionWrapper className="mx-auto max-w-2xl">
                    <Card>
                        <CardHeader className="text-center">
                            <CardTitle className="text-3xl">Get in Touch</CardTitle>
                            <CardDescription>
                                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div className="grid gap-2">
                                    <Label htmlFor="name">Name</Label>
                                    <Input
                                        id="name"
                                        placeholder="Your Name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="your@email.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="grid gap-2">
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        placeholder="How can we help you?"
                                        className="min-h-[120px]"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>
                                <Button type="submit" className="w-full group">
                                    Send Message
                                    <Send className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </form>
                        </CardContent>
                    </Card>
                </SectionWrapper>
            </div>
        </section>
    )
}
