import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  GraduationCap,
  Target,
  Users,
  Award,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const stats = [
  { label: "Active Learners", value: "10,000+" },
  { label: "Courses Available", value: "50+" },
  { label: "Expert Trainers", value: "25+" },
  { label: "Course Completion Rate", value: "94%" },
];

const values = [
  {
    icon: Target,
    title: "Excellence",
    description:
      "We strive for excellence in every course we create, ensuring our learners receive the highest quality education.",
  },
  {
    icon: Users,
    title: "Community",
    description:
      "Learning is better together. We foster a supportive community where learners can connect and grow.",
  },
  {
    icon: Zap,
    title: "Innovation",
    description:
      "We leverage cutting-edge technology including AI to provide personalized, engaging learning experiences.",
  },
  {
    icon: Globe,
    title: "Accessibility",
    description:
      "Education should be accessible to everyone. Our platform is designed to be inclusive and user-friendly.",
  },
];

const team = [
  {
    name: "Sarah Chen",
    role: "CEO & Founder",
    bio: "Former real estate executive with 15+ years of industry experience.",
  },
  {
    name: "Michael Torres",
    role: "Chief Learning Officer",
    bio: "EdTech veteran who has designed curricula for Fortune 500 companies.",
  },
  {
    name: "Emily Watson",
    role: "Head of Content",
    bio: "Award-winning instructional designer with expertise in adult learning.",
  },
  {
    name: "David Kim",
    role: "CTO",
    bio: "Tech entrepreneur focused on AI-powered education solutions.",
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="outline" className="mb-4">
              About LearnHub
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Empowering Careers Through
              <span className="text-primary"> Quality Education</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
              LearnHub is a modern learning management system dedicated to providing
              world-class real estate training and professional development courses.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-bold text-primary">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Our Mission</h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We believe that everyone deserves access to high-quality professional
                education. Our mission is to democratize learning by providing
                comprehensive, engaging, and affordable training programs that help
                professionals advance their careers.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Industry-leading curriculum developed by experts",
                  "AI-powered personalized learning experiences",
                  "Gamification to keep learners engaged",
                  "Flexible self-paced and cohort-based options",
                  "Recognized certifications upon completion",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-primary/10 blur-3xl" />
                <div className="relative flex h-64 w-64 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/50">
                  <GraduationCap className="h-32 w-32 text-primary-foreground" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Our Values</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              These core values guide everything we do at LearnHub.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <Card key={value.title}>
                <CardContent className="pt-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 font-semibold">{value.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Leadership Team</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Meet the passionate individuals driving LearnHub&apos;s mission forward.
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name}>
                <CardContent className="pt-6 text-center">
                  <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-primary/20 to-primary/5">
                    <span className="text-2xl font-bold text-primary">
                      {member.name.split(" ").map((n) => n[0]).join("")}
                    </span>
                  </div>
                  <h3 className="mt-4 font-semibold">{member.name}</h3>
                  <p className="text-sm text-primary">{member.role}</p>
                  <p className="mt-2 text-sm text-muted-foreground">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-20 text-primary-foreground">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <Award className="mx-auto h-16 w-16" />
          <h2 className="mt-6 text-3xl font-bold">
            Ready to Start Your Learning Journey?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-primary-foreground/80">
            Join thousands of professionals who have advanced their careers with LearnHub.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/courses">
                Browse Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10"
              asChild
            >
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
