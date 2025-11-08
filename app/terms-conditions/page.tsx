'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function TermsConditions() {
  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-12 max-w-5xl">
        <div className="bg-white rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-8 text-blue-800">Terms &amp; Conditions</h1>
          <h2 className="text-2xl font-semibold text-center mb-2 text-gray-700">Estovir Technologies</h2>
          
          <div className="text-center mb-8">
            <span className="inline-block bg-blue-100 text-blue-800 px-4 py-1 rounded-full text-sm font-medium">
              Effective Date: 29/03/2025
            </span>
          </div>

          <div className="prose max-w-none">
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">General Terms</h2>
              <p className="mb-4 text-gray-600">
                By accessing or using our website and services, you agree to comply with these Terms &amp; Conditions.
              </p>
              <p className="mb-4 text-gray-600">
                Estovir Technologies reserves the right to update or modify these Terms &amp; Conditions at any time.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Orders &amp; Payment</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Orders placed with Estovir Technologies are subject to availability and acceptance.</li>
                <li>Prices are subject to change without prior notice.</li>
                <li>100% advance payment is required before order processing unless otherwise agreed upon in writing.</li>
                <li>An 18% Goods and Services Tax (GST) will be applied to all orders.</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Delivery &amp; Shipping</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Delivery timelines are typically 2-3 weeks from the date of order confirmation.</li>
                <li>Shipping costs are charged as actuals and are to be borne by the customer.</li>
                <li>We are not responsible for delays caused by third-party logistics providers or unforeseen circumstances.</li>
                <li>Risk of loss or damage passes to the customer upon delivery.</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Packaging</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Standard packaging is included in the product price.</li>
                <li>Any special or customized packaging requirements will be charged as actuals.</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Returns &amp; Cancellations</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Orders can only be canceled before shipment; once shipped, cancellations are not allowed.</li>
                <li>Returns are accepted only for defective or damaged products and must be reported within 7 days of receipt.</li>
                <li>Refunds, if applicable, will be processed within 7 business days after the returned item is inspected.</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Warranty &amp; Liability</h2>
              <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
                <li>Products are covered by a 12-month limited warranty from the date of delivery.</li>
                <li>The warranty does not cover consumables, wear-and-tear parts, or damage caused by improper usage.</li>
                <li>We are not responsible for damages resulting from improper use, installation, or modifications.</li>
                <li>Our liability is strictly limited to the cost of the purchased product.</li>
              </ul>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Governing Law &amp; Jurisdiction</h2>
              <p className="mb-4 text-gray-600">
                These Terms &amp; Conditions are governed by the laws of Faridabad.
              </p>
              <p className="mb-4 text-gray-600">
                Any disputes arising shall be resolved exclusively in the courts of Faridabad.
              </p>
            </div>

            <div className="mb-10">
              <h2 className="text-2xl font-bold text-blue-700 mb-4 border-b pb-2">Grievance Officer</h2>
              <p className="mb-4 text-gray-600">
                In compliance with applicable laws, Estovir Technologies has designated a Grievance Officer to address any concerns, complaints, or grievances related to our products, services, or policies.
              </p>
              <p className="mb-4 text-gray-600">
                If you have any grievances, you may contact our Grievance Officer at:
              </p>
              
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6">
                <p className="font-semibold text-gray-800 mb-2">Name: Kamal Puri</p>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Email:</span> <a href="mailto:kamalkumarpuri@gmail.com" className="text-blue-600 hover:underline">kamalkumarpuri@gmail.com</a>
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Phone:</span> <a href="tel:+919810138219" className="text-blue-600 hover:underline">+91 98101 38219</a>
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Address:</span> Plot No. 89, Sector-59, HSIIDC Industrial Estate, Faridabad, Haryana – 121 004
                </p>
              </div>

              <p className="mb-4 text-gray-600">
                We will strive to resolve grievances in a timely and efficient manner.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mt-10">
              <h2 className="text-2xl font-bold text-blue-700 mb-4">Contact Us</h2>
              <p className="mb-4 text-gray-600">
                If you have any questions about our Terms &amp; Conditions, please contact us at:
              </p>
              <div className="mt-4">
                <p className="font-semibold text-gray-800">Estovir Technologies</p>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Phone:</span> <a href="tel:+911294158827" className="text-blue-600 hover:underline">+91 129 4158827</a>
                </p>
                <p className="text-gray-600 mt-1">
                  <span className="font-medium">Email:</span> <a href="mailto:info@estovir.in" className="text-blue-600 hover:underline">info@estovir.in</a>
                </p>
                <p className="text-gray-600 mt-2">
                  <span className="font-medium">Address:</span> Plot No. 89, Sector-59, HSIIDC Industrial Estate, Faridabad, Haryana – 121 004
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
