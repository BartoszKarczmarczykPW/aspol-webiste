"use client";


import Breadcrumb from "@/components/ui/navigation/Breadcrumb";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function PrivacyPolicyPage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">

        <main className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Privacy Policy" }
              ]}
            />

            <h1 className="text-5xl font-bold text-gray-900 mb-6 mt-8">Privacy Policy</h1>
            <p className="text-lg text-gray-600 mb-12">Last updated: November 12, 2025</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <p className="text-gray-700 leading-relaxed">
                  ASPOL (Association des Étudiants Polonais en France) is committed to protecting your
                  privacy and ensuring the security of your personal data. This Privacy Policy explains
                  how we collect, use, store, and protect your personal information in accordance with
                  the General Data Protection Regulation (GDPR) and French data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Data Controller</h2>
                <div className="text-gray-700 leading-relaxed space-y-2">
                  <p><strong>Organization:</strong> ASPOL - Association des Étudiants Polonais en France</p>
                  <p><strong>Email:</strong> office@aspol.fr</p>
                  <p><strong>Address:</strong> Paris, France</p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Data We Collect</h2>
                <p className="text-gray-700 leading-relaxed mb-4">We may collect the following types of personal data:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Contact Information:</strong> Name, email address, phone number</li>
                  <li><strong>Profile Information:</strong> University, field of study, graduation year</li>
                  <li><strong>Communication Data:</strong> Messages and inquiries sent through our contact form</li>
                  <li><strong>Technical Data:</strong> IP address, browser type, device information, cookies</li>
                  <li><strong>Usage Data:</strong> Pages visited, time spent on site, referral source</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">4. How We Use Your Data</h2>
                <p className="text-gray-700 leading-relaxed mb-4">We use your personal data for the following purposes:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>To process your membership application</li>
                  <li>To communicate with you about events, activities, and opportunities</li>
                  <li>To send newsletters and updates (with your consent)</li>
                  <li>To respond to your inquiries and provide support</li>
                  <li>To improve our website and services</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Legal Basis for Processing</h2>
                <p className="text-gray-700 leading-relaxed mb-4">We process your data based on:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Consent:</strong> When you voluntarily provide information (e.g., newsletter signup)</li>
                  <li><strong>Legitimate Interest:</strong> To operate and improve our association activities</li>
                  <li><strong>Contractual Necessity:</strong> To fulfill membership obligations</li>
                  <li><strong>Legal Obligation:</strong> To comply with applicable laws and regulations</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Data Sharing</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  We do not sell your personal data to third parties. We may share your data with:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Service Providers:</strong> Website hosting, email services, event management platforms</li>
                  <li><strong>Partner Organizations:</strong> For collaborative events (with your consent)</li>
                  <li><strong>Legal Authorities:</strong> When required by law</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Cookies</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Our website uses cookies to improve your browsing experience. Cookies are small text files
                  stored on your device. We use:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Essential Cookies:</strong> Required for website functionality</li>
                  <li><strong>Preference Cookies:</strong> Remember your language and settings</li>
                  <li><strong>Analytics Cookies:</strong> Help us understand how visitors use our site</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  You can manage cookie preferences through your browser settings or our cookie consent banner.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Data Retention</h2>
                <p className="text-gray-700 leading-relaxed">
                  We retain your personal data only for as long as necessary to fulfill the purposes outlined
                  in this policy or as required by law. Membership data is retained for the duration of your
                  membership plus 3 years for legal compliance purposes. You may request deletion of your data
                  at any time.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Your Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">Under GDPR, you have the following rights:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li><strong>Right to Access:</strong> Request a copy of your personal data</li>
                  <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                  <li><strong>Right to Erasure:</strong> Request deletion of your data (&quot;right to be forgotten&quot;)</li>
                  <li><strong>Right to Restriction:</strong> Limit how we use your data</li>
                  <li><strong>Right to Data Portability:</strong> Receive your data in a machine-readable format</li>
                  <li><strong>Right to Object:</strong> Object to processing of your data</li>
                  <li><strong>Right to Withdraw Consent:</strong> Withdraw consent at any time</li>
                </ul>
                <p className="text-gray-700 leading-relaxed mt-4">
                  To exercise your rights, contact us at office@aspol.fr
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Data Security</h2>
                <p className="text-gray-700 leading-relaxed">
                  We implement appropriate technical and organizational measures to protect your personal data
                  against unauthorized access, alteration, disclosure, or destruction. However, no method of
                  transmission over the internet is 100% secure.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">11. International Transfers</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your data is primarily stored and processed within the European Union. If we transfer data
                  outside the EU, we ensure appropriate safeguards are in place in accordance with GDPR.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Children&apos;s Privacy</h2>
                <p className="text-gray-700 leading-relaxed">
                  Our services are intended for students aged 18 and over. We do not knowingly collect data
                  from individuals under 18 years of age.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Changes to This Policy</h2>
                <p className="text-gray-700 leading-relaxed">
                  We may update this Privacy Policy from time to time. We will notify you of any significant
                  changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
                  We encourage you to review this policy periodically.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">14. Contact & Complaints</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For questions about this Privacy Policy or to exercise your rights, contact us:
                </p>
                <div className="text-gray-700 space-y-2 mb-4">
                  <p><strong>Email:</strong> office@aspol.fr</p>
                  <p><strong>Address:</strong> ASPOL, Paris, France</p>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  If you believe your data protection rights have been violated, you have the right to lodge a
                  complaint with the French data protection authority (CNIL):
                </p>
                <div className="text-gray-700 space-y-1 mt-2">
                  <p><strong>CNIL</strong></p>
                  <p>3 Place de Fontenoy, TSA 80715</p>
                  <p>75334 PARIS CEDEX 07</p>
                  <p>Website: <a href="https://www.cnil.fr" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">www.cnil.fr</a></p>
                </div>
              </section>
            </div>
          </div>
        </main>

      </div>
    </LanguageProvider>
  );
}
