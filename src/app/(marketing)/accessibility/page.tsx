import { Accessibility, Eye, Ear, Hand, Keyboard, Monitor, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function AccessibilityPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Accessibility className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Accessibility Statement</h1>
          <p className="mt-4 text-muted-foreground">
            Our commitment to making learning accessible for everyone
          </p>
        </div>
      </section>

      {/* Commitment Cards */}
      <section className="py-12 border-b">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Eye className="mx-auto h-10 w-10 text-primary" />
                <h3 className="mt-4 font-semibold">Visual</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Screen reader compatible
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Ear className="mx-auto h-10 w-10 text-blue-500" />
                <h3 className="mt-4 font-semibold">Auditory</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Captions & transcripts
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Hand className="mx-auto h-10 w-10 text-green-500" />
                <h3 className="mt-4 font-semibold">Motor</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Keyboard navigation
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <Keyboard className="mx-auto h-10 w-10 text-purple-500" />
                <h3 className="mt-4 font-semibold">Cognitive</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Clear, simple design
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>Our Commitment</h2>
            <p>
              LearnHub is committed to ensuring digital accessibility for people with disabilities. We are continually improving the user experience for everyone and applying the relevant accessibility standards.
            </p>

            <h2>Conformance Status</h2>
            <p>
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA standards. These guidelines explain how to make web content more accessible for people with disabilities and more user-friendly for everyone.
            </p>

            <h2>Accessibility Features</h2>

            <h3>Visual Accessibility</h3>
            <ul>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                High contrast mode support
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Resizable text up to 200% without loss of functionality
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Alternative text for all meaningful images
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Color is not the only means of conveying information
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Compatible with screen readers (NVDA, JAWS, VoiceOver)
              </li>
            </ul>

            <h3>Auditory Accessibility</h3>
            <ul>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Closed captions for all video content
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Transcripts available for audio content
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                No auto-playing audio or video
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Volume controls for all media
              </li>
            </ul>

            <h3>Motor Accessibility</h3>
            <ul>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Full keyboard navigation support
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Skip links to bypass repetitive content
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                No time limits on interactions
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Large click targets for interactive elements
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Focus indicators on all interactive elements
              </li>
            </ul>

            <h3>Cognitive Accessibility</h3>
            <ul>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Clear and consistent navigation
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Simple, straightforward language
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Error prevention and clear error messages
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Consistent page layouts
              </li>
              <li>
                <CheckCircle className="inline h-4 w-4 text-green-500 mr-2" />
                Progress indicators for multi-step processes
              </li>
            </ul>

            <h2>Supported Assistive Technologies</h2>
            <p>LearnHub is designed to be compatible with:</p>
            <ul>
              <li><strong>Screen Readers:</strong> NVDA, JAWS, VoiceOver, TalkBack</li>
              <li><strong>Screen Magnifiers:</strong> ZoomText, Windows Magnifier</li>
              <li><strong>Voice Control:</strong> Dragon NaturallySpeaking, Windows Voice Access</li>
              <li><strong>Keyboard Navigation:</strong> Full support for keyboard-only users</li>
            </ul>

            <h2>Browser Compatibility</h2>
            <p>Our platform is tested and optimized for:</p>
            <ul>
              <li>Google Chrome (latest 2 versions)</li>
              <li>Mozilla Firefox (latest 2 versions)</li>
              <li>Safari (latest 2 versions)</li>
              <li>Microsoft Edge (latest 2 versions)</li>
            </ul>

            <h2>Continuous Improvement</h2>
            <p>
              We are committed to continuous improvement in accessibility. Our team regularly:
            </p>
            <ul>
              <li>Conducts accessibility audits using automated tools and manual testing</li>
              <li>Tests with assistive technologies</li>
              <li>Gathers feedback from users with disabilities</li>
              <li>Provides accessibility training to our development team</li>
              <li>Includes accessibility in our design and development processes</li>
            </ul>

            <h2>Known Limitations</h2>
            <p>
              While we strive for full accessibility, some older content may not fully meet WCAG 2.1 AA standards. We are actively working to remediate any issues and appreciate your patience.
            </p>

            <h2>Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of LearnHub. Please let us know if you encounter accessibility barriers:
            </p>
            <ul>
              <li><strong>Email:</strong> accessibility@learnhub.com</li>
              <li><strong>Phone:</strong> 1-800-LEARN-HUB (1-800-532-7648)</li>
              <li><strong>Response Time:</strong> We aim to respond within 2 business days</li>
            </ul>

            <h2>Formal Complaints</h2>
            <p>
              If you are not satisfied with our response, you may escalate your complaint to relevant regulatory authorities in your jurisdiction.
            </p>
          </div>

          <div className="mt-12 flex justify-center gap-4">
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/help">Help Center</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
