import React, { useState } from 'react';
import { FaShippingFast, FaHeadset, FaShieldAlt, FaSmile, FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';

const team = [
  {
    name: 'Jane Doe',
    role: 'Founder & CEO',
    img: 'https://randomuser.me/api/portraits/women/44.jpg',
    desc: 'Visionary leader and e-commerce enthusiast.',
    socials: { fb: '#', tw: '#', li: '#' }
  },
  {
    name: 'John Smith',
    role: 'CTO',
    img: 'https://randomuser.me/api/portraits/men/32.jpg',
    desc: 'Tech guru and product innovator.',
    socials: { fb: '#', tw: '#', li: '#' }
  },
  {
    name: 'Emily Lee',
    role: 'Customer Success',
    img: 'https://randomuser.me/api/portraits/women/68.jpg',
    desc: 'Always here to help you shop happy.',
    socials: { fb: '#', tw: '#', li: '#' }
  }
];

const facts = [
  { label: 'Founded', value: '2022' },
  { label: 'Customers', value: '10,000+' },
  { label: 'Products', value: '1,200+' },
  { label: 'Countries', value: '12' },
];

const milestones = [
  { year: '2022', title: 'Founded', desc: 'ShopEase is born with a mission to make shopping easy.' },
  { year: '2023', title: '10,000 Customers', desc: 'Reached our first major customer milestone.' },
  { year: '2023', title: 'Global Expansion', desc: 'Started shipping to 12 countries.' },
  { year: '2024', title: 'Awarded Best Startup', desc: 'Recognized for innovation and customer service.' },
];

const testimonials = [
  { name: 'Alice', text: 'ShopEase made my shopping experience so smooth and fun!', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { name: 'Bob', text: 'Great prices, fast shipping, and amazing support.', img: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Carol', text: 'I love the variety and quality of products!', img: 'https://randomuser.me/api/portraits/women/66.jpg' },
];

const whyShop = [
  { icon: <FaShippingFast className="text-3xl text-blue-600" />, title: 'Fast Shipping', desc: 'Get your orders quickly, wherever you are.' },
  { icon: <FaHeadset className="text-3xl text-purple-600" />, title: '24/7 Support', desc: 'We are always here to help you.' },
  { icon: <FaShieldAlt className="text-3xl text-pink-600" />, title: 'Secure Shopping', desc: 'Your data and payments are always safe.' },
  { icon: <FaSmile className="text-3xl text-yellow-500" />, title: 'Customer Happiness', desc: 'Our #1 priority is your satisfaction.' },
];

const AboutPage = () => {
  const [testimonialIdx, setTestimonialIdx] = useState(0);
  const nextTestimonial = () => setTestimonialIdx((testimonialIdx + 1) % testimonials.length);
  const prevTestimonial = () => setTestimonialIdx((testimonialIdx - 1 + testimonials.length) % testimonials.length);

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 text-white py-20 mb-12 text-center shadow-lg">
        <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg tracking-tight">About ShopEase</h1>
        <p className="text-2xl max-w-3xl mx-auto opacity-95 font-medium mb-6">Making online shopping easy, affordable, and enjoyable for everyone. Discover our story, our team, and what makes us different.</p>
        <a href="/categories" className="inline-block bg-white text-blue-700 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-blue-100 transition text-lg mt-4">Start Shopping</a>
      </div>

      {/* Company Story & Facts */}
      <div className="container mx-auto px-4 mb-16">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-3xl font-bold mb-4 text-blue-800">Our Story</h2>
          <p className="text-gray-700 text-lg">ShopEase was founded in 2022 with a passion for connecting people to the products they love. From humble beginnings, we've grown into a trusted online destination for thousands of happy customers. Our commitment to quality, value, and service drives everything we do.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl mx-auto mb-8">
          {facts.map(f => (
            <div key={f.label} className="bg-white rounded-xl shadow p-6 text-center">
              <div className="text-2xl font-bold text-blue-700 mb-1">{f.value}</div>
              <div className="text-gray-500 text-sm uppercase tracking-wide">{f.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Why Shop With Us */}
      <div className="bg-white py-12 mb-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="text-2xl font-bold mb-8 text-center text-blue-800">Why Shop With Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {whyShop.map((item, i) => (
              <div key={i} className="flex flex-col items-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl shadow-lg p-8">
                {item.icon}
                <div className="font-bold text-lg text-blue-700 mt-3 mb-1">{item.title}</div>
                <div className="text-gray-600 text-center">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline / Milestones */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-800">Our Journey</h2>
        <div className="relative max-w-2xl mx-auto">
          <div className="border-l-4 border-blue-200 absolute h-full left-6 top-0"></div>
          {milestones.map((m, i) => (
            <div key={i} className="mb-10 flex items-start relative">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-400 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg z-10 mr-6">{m.year}</div>
              <div className="bg-white rounded-xl shadow p-6 flex-1">
                <div className="font-bold text-blue-700 text-lg mb-1">{m.title}</div>
                <div className="text-gray-600">{m.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials Carousel */}
      <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 py-16 mb-16">
        <h2 className="text-2xl font-bold mb-8 text-center text-blue-800">What Our Customers Say</h2>
        <div className="flex flex-col items-center">
          <div className="relative w-full max-w-xl">
            <button onClick={prevTestimonial} className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-blue-200 rounded-full p-2 shadow text-2xl z-10">&#8592;</button>
            <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center mx-12">
              <img src={testimonials[testimonialIdx].img} alt={testimonials[testimonialIdx].name} className="w-20 h-20 rounded-full mb-3 object-cover border-4 border-blue-100 shadow" />
              <div className="font-bold text-lg text-blue-700 mb-1">{testimonials[testimonialIdx].name}</div>
              <div className="text-gray-600 text-center italic">"{testimonials[testimonialIdx].text}"</div>
            </div>
            <button onClick={nextTestimonial} className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-blue-200 rounded-full p-2 shadow text-2xl z-10">&#8594;</button>
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="bg-white py-12 mb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl font-bold mb-3 text-blue-800">Our Mission</h2>
              <p className="text-gray-700 mb-6">To deliver quality products at great prices, while providing exceptional customer service and a seamless shopping experience.</p>
              <h3 className="text-xl font-semibold mb-2 text-blue-700">Our Values</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>Customer First: We put our customers at the heart of everything we do.</li>
                <li>Integrity: We are honest, transparent, and committed to doing what's best.</li>
                <li>Innovation: We embrace change and strive to improve every day.</li>
                <li>Quality: We stand behind the products we sell.</li>
              </ul>
            </div>
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80" alt="Our Mission" className="rounded-xl shadow-lg w-full h-64 object-cover" />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="container mx-auto px-4 mb-16">
        <h2 className="text-3xl font-bold mb-8 text-blue-800 text-center">Meet Our Team</h2>
        <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
          {team.map(member => (
            <div key={member.name} className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center w-full md:w-72">
              <img src={member.img} alt={member.name} className="w-24 h-24 rounded-full mb-3 object-cover border-4 border-blue-100 shadow" />
              <div className="font-bold text-lg text-blue-700 mb-1">{member.name}</div>
              <div className="text-gray-500 text-sm mb-2">{member.role}</div>
              <div className="text-gray-600 text-sm text-center mb-2">{member.desc}</div>
              <div className="flex gap-3 mt-2">
                <a href={member.socials.fb} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800"><FaFacebook /></a>
                <a href={member.socials.tw} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600"><FaTwitter /></a>
                <a href={member.socials.li} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900"><FaLinkedin /></a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-blue-700 via-purple-600 to-pink-500 py-16 text-center text-white shadow-lg">
        <h2 className="text-3xl font-bold mb-2">Thank you for choosing ShopEase!</h2>
        <p className="text-xl mb-4">We're excited to serve you and help you discover your next favorite product.</p>
        <a href="/categories" className="inline-block bg-white text-blue-700 font-bold px-10 py-4 rounded-full shadow-lg hover:bg-blue-100 transition text-lg mt-4">Browse Categories</a>
      </div>
    </div>
  );
};

export default AboutPage; 