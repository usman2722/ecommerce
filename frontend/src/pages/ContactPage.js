import React, { useState } from 'react';

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-extrabold mb-2 text-blue-800 text-center">Contact Us</h1>
        <p className="text-lg text-gray-600 mb-10 text-center max-w-2xl mx-auto">We'd love to hear from you! Fill out the form below and our team will get back to you as soon as possible.</p>
        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-blue-700">Send a Message</h2>
            {submitted ? (
              <div className="bg-green-100 text-green-700 p-4 rounded text-center font-semibold">Thank you for your message! We'll be in touch soon.</div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="name">Name</label>
                  <input type="text" name="name" id="name" value={form.name} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="email">Email</label>
                  <input type="email" name="email" id="email" value={form.email} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition" required />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-1" htmlFor="message">Message</label>
                  <textarea name="message" id="message" value={form.message} onChange={handleChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 outline-none transition" rows={5} required />
                </div>
                <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg shadow transition">Send Message</button>
              </form>
            )}
          </div>
          {/* Contact Info & Map */}
          <div className="flex flex-col gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-4 text-blue-700">Contact Information</h2>
              <ul className="text-gray-700 space-y-2">
                <li><strong>Email:</strong> <a href="mailto:support@shopease.com" className="text-blue-600 underline">support@shopease.com</a></li>
                <li><strong>Phone:</strong> <a href="tel:+1234567890" className="text-blue-600 underline">+1 (234) 567-890</a></li>
                <li><strong>Address:</strong> 123 Market St, City, Country</li>
              </ul>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg h-64 w-full">
              <iframe
                title="ShopEase Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363153169!3d-37.81627977975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f6e0b1%3A0x5045675218ce6e0!2s123%20Market%20St%2C%20Melbourne%20VIC%203000%2C%20Australia!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage; 