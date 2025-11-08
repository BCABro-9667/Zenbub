'use client';

import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Mail, Phone, MapPin, Clock, Send, ChevronDown, ChevronUp } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';
import emailjs from '@emailjs/browser';

// FAQ Accordion Component
const FAQItem = ({ 
  question, 
  answer, 
  isOpen, 
  onClick 
}: { 
  question: string; 
  answer: string; 
  isOpen: boolean;
  onClick: () => void;
}) => {
  return (
    <div className="border-b border-gray-200 last:border-0">
      <button
        className="flex justify-between items-center w-full py-4 text-left"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-primary" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="pb-4 pr-12">
          <p className="text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  // FAQ Data
  const faqData = [
    {
      question: "What products do you offer?",
      answer: "We offer a wide range of industrial machinery including SMT Machines, Pre Forming Machines, and other specialized equipment for manufacturing needs."
    },
    {
      question: "Do you provide after-sales service?",
      answer: "Yes, we provide comprehensive after-sales service including installation, training, maintenance, and technical support for all our products."
    },
    {
      question: "What are your shipping options?",
      answer: "We offer domestic and international shipping. Shipping costs and delivery times vary based on location and product specifications. Contact our sales team for specific details."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order is shipped, you will receive a tracking number via email that you can use to monitor your shipment&#39;s progress."
    },
    {
      question: "What is your return policy?",
      answer: "Our return policy allows returns within 30 days of delivery for most products, subject to inspection. Custom orders may have different terms. Please contact our customer service for specific details."
    }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Save to database
      const response = await axios.post('/api/leads', {
        ...formData,
        source: 'contact-page',
      });

      if (response.data.success) {
        // Send email notification via EmailJS
        try {
          await emailjs.send(
            process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
            process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
            {
              from_name: formData.name,
              from_email: formData.email,
              phone: formData.phone,
              message: formData.message,
              to_email: 'zenbu9256@gmail.com', // Your email
            },
            process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!
          );
          
          toast.success('Message sent successfully! We will get back to you soon.');
        } catch (emailError) {
          console.error('Email sending failed:', emailError);
          toast.success('Message saved! Email notification failed, but we received your message.');
        }
        
        setFormData({ name: '', email: '', phone: '', message: '' });
      }
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />
      
      <main className="min-h-screen">
        {/* Page Heading */}
        <section className="py-8 bg-white">
          <div className="container text-center">
            <h1 className="text-3xl font-bold text-gray-900 inline-block relative mx-auto after:content-[''] after:block after:w-2/5 after:h-1 after:bg-black after:mx-auto after:mt-2">Contact Us</h1>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section id="contact-form" className="py-16">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Contact Information */}
              <div className="lg:col-span-1 space-y-6">
                {/* Email */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600"><a href="mailto:info@zenbuindia.in" className="hover:text-primary transition-colors">info@zenbuindia.in</a></p>
                    {/* <p className="text-gray-600"><a href="mailto:sales@zanbu.com" className="hover:text-primary transition-colors">sales@zenbuindia.in</a></p> */}
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Phone</h3>
                    <p className="text-gray-600"><a href="tel:+919910091835" className="hover:text-primary transition-colors">+91 99100 91835 </a></p>
                    {/* <p className="text-gray-600"><a href="tel:+919810138219" className="hover:text-primary transition-colors">+91 98101 38219</a></p> */}
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Office</h3>
                    <p className="text-gray-600">Plot No. 89, Sector-59, HSIIDC Industrial Estate,</p>
                    <p className="text-gray-600"> Faridabad, Haryana - 121 004</p>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-100">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">Business Hours</h3>
                    <p className="text-gray-600">Monday-Saturday: 9:00 AM - 6:00PM</p>
                    {/* <p className="text-gray-600">Saturday: 10:00 AM - 4:00 PM</p> */}
                    <p className="text-gray-600">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          placeholder="Your Name"
                          className="input-field"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          placeholder="you@example.com"
                          className="input-field"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="+91 (000) 000-0000"
                        className="input-field"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        placeholder="Tell us how we can help you..."
                        className="input-field resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full md:w-auto px-8 py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      <Send className="w-5 h-5" />
                      {loading ? 'Sending...' : 'Send Message'}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Visit Our Location</h2>
              <p className="text-gray-600">Find us on the map and plan your visit</p>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3507.8899788453844!2d77.31426857549754!3d28.43897997577891!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cdde4f7c8e837%3A0x5c5c5c5c5c5c5c5c!2sPlot%20No.%2089%2C%20Sector-59%2C%20HSIIDC%20Industrial%20Estate%2C%20Faridabad%2C%20Haryana%20121004!5e0!3m2!1sen!2sin!4v1234567890123!5m2!1sen!2sin"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Office Location Map"
              />
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-16 bg-gray-50">
          <div className="container">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Frequently Asked Questions</h2>
            
            <div className="w-full">
              <div className="bg-white rounded-lg shadow-sm p-6">
                {faqData.map((faq, index) => (
                  <FAQItem 
                    key={index}
                    question={faq.question}
                    answer={faq.answer}
                    isOpen={openFaqIndex === index}
                    onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  />
                ))}
              </div>
              
              <div className="text-center mt-8">
                <p className="text-gray-600">
                  Can&#39;t find what you&#39;re looking for? <a href="#contact-form" className="text-primary font-medium hover:underline">Contact us</a> directly.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}