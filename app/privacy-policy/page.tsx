'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function PrivacyPolicy() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
      <div className="bg-white rounded-lg p-8"
      >
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Privacy Policy, Disclaimer, and Cookies Policy</h1>
        <h2 className="text-2xl font-semibold text-center mb-2 text-gray-700">Estovir Technologies</h2>
        
        <div className="text-center mb-8">
          <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
            Effective Date: 29/03/2025
          </span>
        </div>

        <div className="prose max-w-none">
          <p className="mb-6 text-gray-600">
            At Estovir Technologies (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), we value your privacy and are committed to protecting your personal information. 
            This document outlines our Privacy Policy, Disclaimer, and Cookies Policy to inform you about how we handle your data.
          </p>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Privacy Policy</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Information We Collect</h3>
            <p className="mb-4 text-gray-600">We may collect the following types of information:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li><span className="font-medium text-gray-800">Personal Information:</span> Name, email address, phone number, and other details you provide when you contact us or sign up for services.</li>
              <li><span className="font-medium text-gray-800">Technical Data:</span> IP address, browser type, device information, and browsing history when using our website.</li>
              <li><span className="font-medium text-gray-800">Cookies and Tracking Technologies:</span> Information gathered via cookies and similar tracking tools to improve user experience.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How We Use Your Information</h3>
            <p className="mb-4 text-gray-600">We use the collected information for the following purposes:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>To provide, operate, and improve our services.</li>
              <li>To communicate with you, respond to inquiries, and send updates.</li>
              <li>To analyze trends and enhance website performance.</li>
              <li>To comply with legal and regulatory obligations.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Sharing of Information</h3>
            <p className="mb-4 text-gray-600">We do not sell or rent your personal data. However, we may share your information with:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li><span className="font-medium text-gray-800">Service Providers:</span> Third-party vendors who assist in delivering our services.</li>
              <li><span className="font-medium text-gray-800">Legal Compliance:</span> If required by law, we may disclose your data to comply with legal obligations.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Data Security</h3>
            <p className="mb-4 text-gray-600">
              We implement security measures to protect your data from unauthorized access, alteration, or loss. 
              However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Your Rights and Choices</h3>
            <p className="mb-4 text-gray-600">You have the right to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Access, update, or delete your personal data.</li>
              <li>Opt out of marketing communications.</li>
              <li>Manage cookies through browser settings.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Third-Party Links</h3>
            <p className="mb-4 text-gray-600">
              Our website may contain links to third-party sites. We are not responsible for the privacy practices of those sites.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Changes to This Privacy Policy</h3>
            <p className="mb-4 text-gray-600">
              We may update this Privacy Policy from time to time. Any changes will be posted on this page with the updated effective date.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Disclaimer Policy</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">General Information</h3>
            <p className="mb-4 text-gray-600">
              The content on our website and services is provided for general informational purposes only. 
              While we strive for accuracy, we do not guarantee the completeness, reliability, or timeliness of any information.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">No Liability</h3>
            <p className="mb-4 text-gray-600">
              We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising from the use of our website, 
              services, or reliance on any information provided.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Third-Party Links</h3>
            <p className="mb-4 text-gray-600">
              Our website may contain links to third-party websites. We do not endorse or take responsibility for the content, 
              accuracy, or practices of these third-party sites.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Cookies Policy</h2>
            
            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">What Are Cookies?</h3>
            <p className="mb-4 text-gray-600">
              Cookies are small text files stored on your device when you visit a website. 
              They help improve your experience by remembering preferences, enabling functionalities, and analyzing website performance.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">How We Use Cookies</h3>
            <p className="mb-4 text-gray-600">We use cookies to:</p>
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li>Improve website functionality and performance.</li>
              <li>Analyze user behavior and enhance user experience.</li>
              <li>Deliver personalized content and advertisements.</li>
            </ul>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Managing Cookies</h3>
            <p className="mb-4 text-gray-600">
              You can control or disable cookies through your browser settings. 
              However, disabling cookies may affect the functionality of our website.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Third-Party Cookies</h3>
            <p className="mb-4 text-gray-600">
              Some third-party services we use (such as analytics and advertising) may place cookies on your device. 
              We do not control these cookies and recommend reviewing their respective policies.
            </p>

            <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Changes to This Cookies Policy</h3>
            <p className="mb-4 text-gray-600">
              We may update this Cookies Policy periodically. Any changes will be reflected on this page.
            </p>
          </div>

          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-10">
            <h2 className="text-2xl font-bold text-blue-700 mb-4">Contact Us</h2>
            <p className="mb-4 text-gray-600">
              If you have any questions about our Privacy Policy, Disclaimer, or Cookies Policy, please contact us at:
            </p>
            <div className="mt-4">
              <p className="font-semibold text-gray-800">Estovir Technologies</p>
              <p className="text-gray-600 mt-2">
                <span className="font-medium">Address:</span> Plot No. 89, Sector-59, HSIIDC Industrial Estate, Faridabad, Haryana – 121 004
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Email:</span> <a href="mailto:info@estovir.in" className="text-blue-600 hover:underline">info@estovir.in</a>
              </p>
              <p className="text-gray-600 mt-1">
                <span className="font-medium">Phone No.:</span> <a href="tel:+911294158827" className="text-blue-600 hover:underline">+91 129 4158827</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}