import Link from "next/link";
import {
  Users,
  MessageSquare,
  Trophy,
  Calendar,
  BookOpen,
  Heart,
  Globe,
  Zap,
  ArrowRight,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const communityStats = [
  { value: "50,000+", label: "Active Members", icon: Users },
  { value: "10,000+", label: "Discussions", icon: MessageSquare },
  { value: "500+", label: "Study Groups", icon: BookOpen },
  { value: "100+", label: "Events/Month", icon: Calendar },
];

const communityFeatures = [
  {
    icon: MessageSquare,
    title: "Discussion Forums",
    description:
      "Engage in discussions about courses, career advice, industry trends, and more. Get help from peers and experts alike.",
  },
  {
    icon: BookOpen,
    title: "Study Groups",
    description:
      "Join or create study groups based on courses or topics. Learn together with like-minded individuals from around the world.",
  },
  {
    icon: Calendar,
    title: "Events & Webinars",
    description:
      "Attend live webinars, workshops, and networking events. Learn from industry experts and connect with professionals.",
  },
  {
    icon: Trophy,
    title: "Challenges & Competitions",
    description:
      "Participate in coding challenges, case studies, and competitions. Win prizes and showcase your skills to employers.",
  },
  {
    icon: Heart,
    title: "Mentorship Program",
    description:
      "Connect with experienced professionals who can guide your learning journey and career development.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description:
      "Build your professional network with learners and experts from over 150 countries around the world.",
  },
];

const featuredGroups = [
  {
    name: "AI & Machine Learning Enthusiasts",
    members: 8500,
    category: "Gen AI & Agentic AI",
    active: true,
  },
  {
    name: "Full Stack Developers",
    members: 12000,
    category: "Full Stack & Vibe Coding",
    active: true,
  },
  {
    name: "Real Estate Investors Network",
    members: 5200,
    category: "Real Estate",
    active: true,
  },
  {
    name: "Cloud Architecture Guild",
    members: 6800,
    category: "Cloud Computing",
    active: true,
  },
  {
    name: "Leadership & Management",
    members: 4500,
    category: "Soft Skills",
    active: false,
  },
  {
    name: "Investment Strategies",
    members: 7200,
    category: "Investment",
    active: true,
  },
];

const upcomingEvents = [
  {
    title: "Building AI Agents Workshop",
    date: "Feb 15, 2026",
    type: "Workshop",
    attendees: 250,
  },
  {
    title: "Real Estate Market Analysis Webinar",
    date: "Feb 18, 2026",
    type: "Webinar",
    attendees: 500,
  },
  {
    title: "AWS Solutions Architect AMA",
    date: "Feb 22, 2026",
    type: "Q&A Session",
    attendees: 180,
  },
];

export default function CommunityPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4" variant="secondary">
              <Users className="mr-1 h-3 w-3" />
              Join 50,000+ Learners
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Learn Together, Grow Together
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Join the LearnHub community to connect with fellow learners,
              participate in discussions, attend events, and accelerate your
              learning journey.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button size="lg" asChild>
                <Link href="/register">
                  Join the Community
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline">
                Explore Groups
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y bg-muted/30 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {communityStats.map((stat) => (
              <div key={stat.label} className="text-center">
                <stat.icon className="mx-auto h-8 w-8 text-primary" />
                <p className="mt-2 text-3xl font-bold">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Community Features</h2>
            <p className="mt-4 text-muted-foreground">
              Everything you need to learn and grow with others
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {communityFeatures.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="p-6">
                  <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Groups */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Popular Study Groups</h2>
              <p className="mt-2 text-muted-foreground">
                Join groups that match your interests
              </p>
            </div>
            <Button variant="outline">
              View All Groups
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {featuredGroups.map((group) => (
              <Card key={group.name} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold">{group.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {group.members.toLocaleString()} members
                      </p>
                    </div>
                    {group.active && (
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500">
                        <Zap className="mr-1 h-3 w-3" />
                        Active
                      </Badge>
                    )}
                  </div>
                  <Badge variant="outline" className="mt-3">
                    {group.category}
                  </Badge>
                  <Button className="mt-4 w-full" variant="outline" size="sm">
                    Join Group
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">Upcoming Events</h2>
              <p className="mt-2 text-muted-foreground">
                Learn from experts and connect with peers
              </p>
            </div>
            <Button variant="outline">
              View Calendar
              <Calendar className="ml-2 h-4 w-4" />
            </Button>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {upcomingEvents.map((event) => (
              <Card key={event.title}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge>{event.type}</Badge>
                    <span className="text-sm text-muted-foreground">
                      {event.date}
                    </span>
                  </div>
                  <CardTitle className="text-lg">{event.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">
                      <Users className="mr-1 inline h-4 w-4" />
                      {event.attendees} attending
                    </span>
                    <Button size="sm">Register</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links */}
      <section className="border-t bg-muted/30 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold">Connect With Us</h2>
            <p className="mt-2 text-muted-foreground">
              Follow us on social media for updates and tips
            </p>
            <div className="mt-6 flex justify-center gap-4">
              <Button variant="outline" size="lg">
                <Twitter className="mr-2 h-5 w-5" />
                Twitter
              </Button>
              <Button variant="outline" size="lg">
                <Linkedin className="mr-2 h-5 w-5" />
                LinkedIn
              </Button>
              <Button variant="outline" size="lg">
                <Github className="mr-2 h-5 w-5" />
                GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
