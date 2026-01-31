"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  HelpCircle,
  Building,
  CheckCircle,
} from "lucide-react";

const contactInfo = [
  {
    icon: Mail,
    label: "Email",
    value: "support@learnhub.com",
    description: "We typically respond within 24 hours",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+1 (555) 123-4567",
    description: "Mon-Fri, 9am-6pm EST",
  },
  {
    icon: MapPin,
    label: "Address",
    value: "123 Learning Street",
    description: "San Francisco, CA 94102",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Monday - Friday",
    description: "9:00 AM - 6:00 PM EST",
  },
];

const faqs = [
  {
    question: "How do I enroll in a course?",
    answer:
      "Simply browse our course catalog, select a course, and click 'Enroll'. You'll need to create an account or log in to complete enrollment.",
  },
  {
    question: "Are certificates provided upon completion?",
    answer:
      "Yes! Upon successfully completing a course and passing all assessments, you'll receive a verified digital certificate.",
  },
  {
    question: "Can I access courses on mobile devices?",
    answer:
      "Absolutely. Our platform is fully responsive and works on all devices including smartphones, tablets, and desktop computers.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards, PayPal, and bank transfers. Enterprise customers can also request invoice billing.",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <Badge variant="outline" className="mb-4">
          Get in Touch
        </Badge>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Contact Us
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
          Have questions about our courses or need help? We&apos;re here to assist you
          on your learning journey.
        </p>
      </div>

      {/* Contact Info Cards */}
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {contactInfo.map((info) => (
          <Card key={info.label}>
            <CardContent className="flex items-start gap-4 p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <info.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold">{info.label}</p>
                <p className="text-sm text-foreground">{info.value}</p>
                <p className="text-xs text-muted-foreground">{info.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent>
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="mt-4 text-xl font-semibold">Message Sent!</h3>
                <p className="mt-2 text-muted-foreground">
                  Thank you for contacting us. We&apos;ll get back to you within 24 hours.
                </p>
                <Button className="mt-6" onClick={() => setSubmitted(false)}>
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="firstName" className="text-sm font-medium">
                      First Name
                    </label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="lastName" className="text-sm font-medium">
                      Last Name
                    </label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium">
                    Subject
                  </label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="general">General Inquiry</SelectItem>
                      <SelectItem value="courses">Course Information</SelectItem>
                      <SelectItem value="technical">Technical Support</SelectItem>
                      <SelectItem value="billing">Billing Question</SelectItem>
                      <SelectItem value="enterprise">Enterprise Solutions</SelectItem>
                      <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="How can we help you?"
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div>
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="mt-6 space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold">{faq.question}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Enterprise CTA */}
          <Card className="mt-8 bg-primary text-primary-foreground">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary-foreground/10">
                  <Building className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold">Enterprise Solutions</h3>
                  <p className="mt-1 text-sm text-primary-foreground/80">
                    Looking to train your entire team? We offer custom enterprise
                    packages with dedicated support, custom content, and volume
                    discounts.
                  </p>
                  <Button variant="secondary" className="mt-4" size="sm">
                    Contact Sales
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
