"use client";

import Link from "next/link";

import Breadcrumb from "@/components/ui/navigation/Breadcrumb";
import { LanguageProvider } from "@/contexts/LanguageContext";

export default function LegalNoticePage() {
  return (
    <LanguageProvider>
      <div className="min-h-screen bg-white">

        <main className="pt-32 pb-20 px-6">
          <div className="max-w-4xl mx-auto">
            <Breadcrumb
              items={[
                { label: "Home", href: "/" },
                { label: "Legal Notice" }
              ]}
            />

            <h1 className="text-5xl font-bold text-gray-900 mb-6 mt-8">Legal Notice</h1>
            <p className="text-lg text-gray-600 mb-12">Last updated: November 12, 2025</p>

            <div className="prose prose-lg max-w-none space-y-8">
              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">1. Website Publisher</h2>
                <p className="text-gray-700 leading-relaxed">
                  This website is published by ASPOL (Association des Étudiants Polonais en France),
                  a registered student association under French law (loi 1901).
                </p>
                <div className="mt-4 space-y-2 text-gray-700">
                  <p><strong>Association Name:</strong> ASPOL - Association des Étudiants Polonais en France</p>
                  <p><strong>Headquarters:</strong> Paris, France</p>
                  <p><strong>Email:</strong> office@aspol.fr</p>
                  <p><strong>Website:</strong> <a href="https://aspol.fr" className="text-red-600 hover:text-red-700">aspol.fr</a></p>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">2. Website Hosting</h2>
                <p className="text-gray-700 leading-relaxed">
                  This website is hosted by a third-party hosting service provider.
                  For technical information regarding hosting, please contact us at office@aspol.fr.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">3. Intellectual Property</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  All content on this website, including but not limited to text, graphics, logos, images,
                  and software, is the property of ASPOL or its content suppliers and is protected by
                  French and international copyright laws.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  The ASPOL logo and name are trademarks of the association. Any reproduction,
                  modification, or distribution of website content without prior written authorization
                  is strictly prohibited.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">4. Personal Data</h2>
                <p className="text-gray-700 leading-relaxed">
                  ASPOL is committed to protecting your personal data in accordance with the GDPR
                  (General Data Protection Regulation) and French data protection laws. For detailed
                  information about how we collect, use, and protect your data, please refer to our{" "}
                  <Link href="/privacy-policy" className="text-red-600 hover:text-red-700 underline">
                    Privacy Policy
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">5. Cookies</h2>
                <p className="text-gray-700 leading-relaxed">
                  This website uses cookies to improve user experience and analyze website traffic.
                  You can manage your cookie preferences through your browser settings. For more
                  information, see our{" "}
                  <Link href="/privacy-policy" className="text-red-600 hover:text-red-700 underline">
                    Privacy Policy
                  </Link>.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">6. Liability</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  ASPOL strives to ensure the accuracy and currency of the information provided on this
                  website. However, ASPOL cannot be held responsible for errors, omissions, or results
                  obtained from the use of this information.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  External links on this website are provided for convenience. ASPOL is not responsible
                  for the content of external websites and does not endorse their content.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">7. Applicable Law</h2>
                <p className="text-gray-700 leading-relaxed">
                  These legal notices are governed by French law. Any dispute relating to the use of
                  this website shall be subject to the exclusive jurisdiction of French courts.
                </p>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">8. Contact</h2>
                <p className="text-gray-700 leading-relaxed">
                  For any questions regarding these legal notices or the website, please contact us:
                </p>
                <div className="mt-4 space-y-2 text-gray-700">
                  <p><strong>Email:</strong> office@aspol.fr</p>
                  <p><strong>Address:</strong> Paris, France</p>
                  <p><strong>Social Media:</strong></p>
                  <ul className="list-disc list-inside ml-4 space-y-1">
                    <li>Facebook: <a href="https://www.facebook.com/aspologne" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">@aspologne</a></li>
                    <li>Instagram: <a href="https://www.instagram.com/aspolska/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">@aspolska</a></li>
                    <li>LinkedIn: <a href="https://www.linkedin.com/company/aspolscpo/" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-700">ASPOL</a></li>
                  </ul>
                </div>
              </section>
            </div>
          </div>
        </main>

      </div>
    </LanguageProvider>
  );
}
