import { Cookie } from "lucide-react";

export default function CookiesPage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-background to-primary/5 py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <Cookie className="mx-auto h-12 w-12 text-primary" />
          <h1 className="mt-4 text-4xl font-bold tracking-tight">Cookie Policy</h1>
          <p className="mt-4 text-muted-foreground">
            Last updated: January 31, 2026
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="prose prose-gray dark:prose-invert max-w-none">
            <h2>1. What Are Cookies?</h2>
            <p>
              Cookies are small text files that are placed on your computer or mobile device when you visit a website. They are widely used to make websites work more efficiently and provide information to website owners. Cookies help us remember your preferences and understand how you interact with our platform.
            </p>

            <h2>2. How We Use Cookies</h2>
            <p>
              LearnHub uses cookies and similar technologies for several purposes:
            </p>
            <ul>
              <li><strong>Essential Cookies:</strong> Required for the platform to function properly, including authentication and security.</li>
              <li><strong>Performance Cookies:</strong> Help us understand how visitors interact with our platform by collecting anonymous information.</li>
              <li><strong>Functionality Cookies:</strong> Remember your preferences and settings to provide a personalized experience.</li>
              <li><strong>Analytics Cookies:</strong> Allow us to measure and improve the performance of our platform.</li>
              <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements and track marketing campaign effectiveness.</li>
            </ul>

            <h2>3. Types of Cookies We Use</h2>

            <h3>3.1 Essential Cookies</h3>
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Cookie Name</th>
                  <th className="border p-2 text-left">Purpose</th>
                  <th className="border p-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">session_id</td>
                  <td className="border p-2">Maintains your login session</td>
                  <td className="border p-2">Session</td>
                </tr>
                <tr>
                  <td className="border p-2">csrf_token</td>
                  <td className="border p-2">Security token to prevent attacks</td>
                  <td className="border p-2">Session</td>
                </tr>
                <tr>
                  <td className="border p-2">auth_token</td>
                  <td className="border p-2">Authentication verification</td>
                  <td className="border p-2">30 days</td>
                </tr>
              </tbody>
            </table>

            <h3>3.2 Performance & Analytics Cookies</h3>
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Cookie Name</th>
                  <th className="border p-2 text-left">Purpose</th>
                  <th className="border p-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">_ga</td>
                  <td className="border p-2">Google Analytics - distinguishes users</td>
                  <td className="border p-2">2 years</td>
                </tr>
                <tr>
                  <td className="border p-2">_gid</td>
                  <td className="border p-2">Google Analytics - distinguishes users</td>
                  <td className="border p-2">24 hours</td>
                </tr>
                <tr>
                  <td className="border p-2">_gat</td>
                  <td className="border p-2">Google Analytics - throttle request rate</td>
                  <td className="border p-2">1 minute</td>
                </tr>
              </tbody>
            </table>

            <h3>3.3 Functionality Cookies</h3>
            <table className="w-full border-collapse border">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Cookie Name</th>
                  <th className="border p-2 text-left">Purpose</th>
                  <th className="border p-2 text-left">Duration</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border p-2">theme</td>
                  <td className="border p-2">Stores your theme preference (light/dark)</td>
                  <td className="border p-2">1 year</td>
                </tr>
                <tr>
                  <td className="border p-2">language</td>
                  <td className="border p-2">Stores your language preference</td>
                  <td className="border p-2">1 year</td>
                </tr>
                <tr>
                  <td className="border p-2">video_quality</td>
                  <td className="border p-2">Remembers video playback settings</td>
                  <td className="border p-2">1 year</td>
                </tr>
              </tbody>
            </table>

            <h2>4. Third-Party Cookies</h2>
            <p>
              Some cookies on our platform are set by third-party services. These include:
            </p>
            <ul>
              <li><strong>Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong>Stripe:</strong> For secure payment processing</li>
              <li><strong>Intercom:</strong> For customer support chat functionality</li>
              <li><strong>YouTube:</strong> For embedded video content</li>
            </ul>

            <h2>5. Managing Cookies</h2>
            <p>
              You can control and manage cookies in several ways:
            </p>
            <h3>Browser Settings</h3>
            <p>
              Most browsers allow you to manage cookie preferences through their settings. You can:
            </p>
            <ul>
              <li>Block all cookies</li>
              <li>Block third-party cookies only</li>
              <li>Delete cookies when you close your browser</li>
              <li>Browse in &quot;private&quot; or &quot;incognito&quot; mode</li>
            </ul>

            <h3>Cookie Preference Center</h3>
            <p>
              You can update your cookie preferences at any time using our cookie preference center. Click the &quot;Cookie Settings&quot; link in the footer to access it.
            </p>

            <h2>6. Impact of Disabling Cookies</h2>
            <p>
              If you choose to disable cookies, some features of our platform may not function properly:
            </p>
            <ul>
              <li>You may need to log in each time you visit</li>
              <li>Your preferences may not be saved</li>
              <li>Some interactive features may not work</li>
              <li>Video playback may be affected</li>
            </ul>

            <h2>7. Do Not Track Signals</h2>
            <p>
              Some browsers have a &quot;Do Not Track&quot; feature that signals to websites that you do not want to be tracked. Our platform currently does not respond to Do Not Track signals, but you can manage tracking through our cookie preference center.
            </p>

            <h2>8. Updates to This Policy</h2>
            <p>
              We may update this Cookie Policy from time to time to reflect changes in technology or legal requirements. We will post any changes on this page with an updated revision date.
            </p>

            <h2>9. Contact Us</h2>
            <p>
              If you have questions about our use of cookies, please contact us at:
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
