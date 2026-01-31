import { Shield } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: January 31, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to LearnHub. We respect your privacy and are committed to protecting your personal data. This privacy policy will inform you about how we look after your personal data when you visit our website and tell you about your privacy rights and how the law protects you.
            </p>

            <h2>2. Information We Collect</h2>
            <p>We collect several types of information from and about users of our platform:</p>
            <ul>
              <li><strong>Personal Information:</strong> Name, email address, phone number, billing address, and payment information when you create an account or make a purchase.</li>
              <li><strong>Profile Information:</strong> Profile picture, bio, education history, and professional background that you choose to provide.</li>
              <li><strong>Learning Data:</strong> Course progress, quiz scores, assignment submissions, and learning preferences.</li>
              <li><strong>Usage Data:</strong> Information about how you use our platform, including pages visited, time spent, and features used.</li>
              <li><strong>Device Information:</strong> IP address, browser type, operating system, and device identifiers.</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <p>We use the information we collect for various purposes:</p>
            <ul>
              <li>To provide and maintain our platform</li>
              <li>To personalize your learning experience</li>
              <li>To process transactions and send related information</li>
              <li>To send promotional communications (with your consent)</li>
              <li>To respond to your comments, questions, and requests</li>
              <li>To monitor and analyze usage patterns and trends</li>
              <li>To detect, prevent, and address technical issues</li>
              <li>To improve our AI-powered features and recommendations</li>
            </ul>

            <h2>4. Information Sharing</h2>
            <p>We may share your personal information in the following situations:</p>
            <ul>
              <li><strong>With Instructors:</strong> Course instructors can see your name, profile, and progress in their courses.</li>
              <li><strong>With Service Providers:</strong> We share data with third-party vendors who help us operate our platform (payment processors, hosting providers, analytics services).</li>
              <li><strong>For Legal Reasons:</strong> We may disclose information if required by law or to protect our rights and safety.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            </ul>

            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational security measures to protect your personal data against unauthorized access, alteration, disclosure, or destruction. This includes:
            </p>
            <ul>
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and audits</li>
              <li>Access controls and authentication measures</li>
              <li>Employee training on data protection</li>
            </ul>

            <h2>6. Your Rights</h2>
            <p>Depending on your location, you may have the following rights:</p>
            <ul>
              <li><strong>Access:</strong> Request a copy of your personal data</li>
              <li><strong>Rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Erasure:</strong> Request deletion of your data</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Objection:</strong> Object to processing of your data</li>
              <li><strong>Withdrawal:</strong> Withdraw consent at any time</li>
            </ul>

            <h2>7. Cookies and Tracking</h2>
            <p>
              We use cookies and similar tracking technologies to collect and track information about your activity on our platform. For more details, please see our <a href="/cookies" className="text-primary hover:underline">Cookie Policy</a>.
            </p>

            <h2>8. International Data Transfers</h2>
            <p>
              Your information may be transferred to and processed in countries other than your own. We ensure appropriate safeguards are in place to protect your data in accordance with this privacy policy.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              Our platform is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you are a parent or guardian and believe your child has provided us with personal information, please contact us.
            </p>

            <h2>10. Changes to This Policy</h2>
            <p>
              We may update this privacy policy from time to time. We will notify you of any changes by posting the new privacy policy on this page and updating the &quot;Last updated&quot; date.
            </p>

            <h2>11. Contact Us</h2>
            <p>
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </p>
            <ul>
              <li>Email: privacy@learnhub.com</li>
              <li>Address: 123 Learning Street, Education City, EC 12345</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
