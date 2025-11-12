"use client";

import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Breadcrumb from "@/components/Breadcrumb";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function TermsOfUsePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">
        <Header />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb 
              items={[
                { label: "Home", href: "/" },
                { label: "Terms of Use" }
              ]}
            />

            <h1 className="text-5xl font-bold text-gray-900 mb-6 mt-8">Terms of Use</h1>
            <p className="text-lg text-gray-600 mb-12">Last updated: November 12, 2025</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  By accessing and using the ASPOL website (aspol.fr), you accept and agree to be bound by 
                  these Terms of Use. If you do not agree to these terms, please do not use this website.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Use of Website</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You agree to use this website only for lawful purposes and in a way that does not infringe 
                  the rights of, restrict, or inhibit anyone else&apos;s use and enjoyment of the website.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">Prohibited uses include:</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Attempting to gain unauthorized access to the website or its systems</li>
                  <li>Transmitting any harmful, threatening, defamatory, or illegal content</li>
                  <li>Using automated systems to access the website without permission</li>
                  <li>Interfering with or disrupting the website&apos;s operation</li>
                  <li>Impersonating any person or entity</li>
                  <li>Collecting or harvesting user information without consent</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Membership</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  Membership in ASPOL is open to Polish students in France. By becoming a member:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>You agree to provide accurate and truthful information</li>
                  <li>You agree to maintain the confidentiality of your account information</li>
                  <li>You are responsible for all activities under your account</li>
                  <li>You agree to notify us immediately of any unauthorized use</li>
                  <li>You accept ASPOL&apos;s code of conduct and values</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Intellectual Property Rights</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All content on this website, including text, graphics, logos, images, audio clips, 
                  digital downloads, and software, is the property of ASPOL or its content suppliers 
                  and is protected by French and international copyright, trademark, and other intellectual 
                  property laws.
                </p>
                <p className="text-gray-700 leading-relaxed mb-4">
                  You may not:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>Reproduce, duplicate, copy, sell, or resell any portion of the website</li>
                  <li>Use any ASPOL trademarks without prior written permission</li>
                  <li>Modify or create derivative works based on website content</li>
                  <li>Remove any copyright or proprietary notices</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">5. User-Generated Content</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  If you submit content to our website (e.g., comments, photos, testimonials):
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>You retain ownership of your content</li>
                  <li>You grant ASPOL a non-exclusive, royalty-free license to use, display, and distribute your content</li>
                  <li>You confirm that you have all necessary rights to submit the content</li>
                  <li>You agree that your content does not violate any laws or third-party rights</li>
                  <li>ASPOL reserves the right to remove any content at its discretion</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Events and Activities</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  By registering for ASPOL events:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>You agree to comply with event rules and regulations</li>
                  <li>You understand that events may be photographed/recorded for promotional purposes</li>
                  <li>You acknowledge that ASPOL is not liable for personal injury or property damage at events</li>
                  <li>You understand that events may be cancelled or rescheduled</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Privacy and Data Protection</h2>
                <p className="text-gray-700 leading-relaxed">
                  Your use of this website is also governed by our{" "}
                  <Link href="/privacy-policy" className="text-red-600 hover:text-red-700 underline">
                    Privacy Policy
                  </Link>, which explains how we collect, use, and protect your personal data in accordance 
                  with GDPR and French data protection laws.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">8. External Links</h2>
                <p className="text-gray-700 leading-relaxed">
                  This website may contain links to external websites. ASPOL is not responsible for the 
                  content, privacy policies, or practices of third-party websites. We encourage you to review 
                  the terms and privacy policies of any external sites you visit.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">9. Disclaimer of Warranties</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  This website is provided &quot;as is&quot; without warranties of any kind, either express or implied. 
                  ASPOL does not warrant that:
                </p>
                <ul className="list-disc list-inside space-y-2 text-gray-700 ml-4">
                  <li>The website will be uninterrupted or error-free</li>
                  <li>Defects will be corrected</li>
                  <li>The website is free of viruses or harmful components</li>
                  <li>Information on the website is accurate, complete, or current</li>
                </ul>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">10. Limitation of Liability</h2>
                <p className="text-gray-700 leading-relaxed">
                  To the fullest extent permitted by law, ASPOL shall not be liable for any indirect, 
                  incidental, special, consequential, or punitive damages arising out of or related to your 
                  use of the website, even if advised of the possibility of such damages.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">11. Indemnification</h2>
                <p className="text-gray-700 leading-relaxed">
                  You agree to indemnify and hold harmless ASPOL, its board members, volunteers, and partners 
                  from any claims, damages, losses, liabilities, and expenses (including legal fees) arising 
                  from your use of the website or violation of these Terms of Use.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">12. Modifications to Terms</h2>
                <p className="text-gray-700 leading-relaxed">
                  ASPOL reserves the right to modify these Terms of Use at any time. Changes will be effective 
                  immediately upon posting on this page. Your continued use of the website after changes 
                  constitutes acceptance of the modified terms.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">13. Termination</h2>
                <p className="text-gray-700 leading-relaxed">
                  ASPOL reserves the right to terminate or suspend your access to the website at any time, 
                  without notice, for conduct that violates these Terms of Use or is harmful to other users, 
                  ASPOL, or third parties.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">14. Governing Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These Terms of Use are governed by French law. Any disputes arising from these terms or 
                  your use of the website shall be subject to the exclusive jurisdiction of French courts.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">15. Severability</h2>
                <p className="text-gray-700 leading-relaxed">
                  If any provision of these Terms of Use is found to be invalid or unenforceable, the 
                  remaining provisions shall continue in full force and effect.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">16. Contact Information</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  For questions about these Terms of Use, please contact us:
                </p>
                <div className="text-gray-700 space-y-2">
                  <p><strong>Email:</strong> contact@aspol.fr</p>
                  <p><strong>Address:</strong> ASPOL, Paris, France</p>
                  <p><strong>Website:</strong> <a href="https://aspol.fr" className="text-red-600 hover:text-red-700">aspol.fr</a></p>
                </div>
              </section>

              <div className="mt-12 p-6 bg-gray-50 rounded-2xl">
                <p className="text-gray-700 text-sm">
                  <strong>Note:</strong> By using this website, you acknowledge that you have read, understood, 
                  and agree to be bound by these Terms of Use and our Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
}
