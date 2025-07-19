import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import API from '../services/api';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { getImageUrl } from '../utils/imageUtils';

const features = [
  { title: 'Free Shipping', desc: 'On all orders over $50', icon: '🚚' },
  { title: '24/7 Support', desc: 'We are here to help anytime', icon: '💬' },
  { title: 'Secure Payment', desc: '100% secure payment', icon: '🔒' },
  { title: 'Easy Returns', desc: '30-day money-back guarantee', icon: '↩️' },
];

const testimonials = [
  { name: 'Alice', text: 'Amazing products and fast delivery!', img: 'https://randomuser.me/api/portraits/women/68.jpg' },
  { name: 'Bob', text: 'Great customer service and quality.', img: 'https://randomuser.me/api/portraits/men/65.jpg' },
  { name: 'Carol', text: 'My go-to shop for everything!', img: 'https://randomuser.me/api/portraits/women/65.jpg' },
];

// Add sample brands array
const brands = [
  { name: 'Apple', img: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg' },
  { name: 'Samsung', img: 'https://upload.wikimedia.org/wikipedia/commons/2/24/Samsung_Logo.svg' },
  { name: 'Sony', img: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/sony.svg' },
  { name: 'Nike', img: 'https://upload.wikimedia.org/wikipedia/commons/a/a6/Logo_NIKE.svg' },
  { name: 'Adidas', img: 'https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg' },
  { name: 'LG', img: 'https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/lg.svg' },
  { name: 'Microsoft', img: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg' },
  { name: 'Dell', img: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Dell_Logo.svg' },
];

const featureCardBg = [
  'bg-indigo-700',
  'bg-pink-700',
  'bg-amber-700',
  'bg-teal-700',
];
const featureIconBg = [
  'bg-indigo-500',
  'bg-pink-500',
  'bg-amber-500',
  'bg-teal-500',
];

const HomePage = ({ onCartChange }) => {
    const [products, setProducts] = useState([]);
    const [banners, setBanners] = useState([]);
    const [slider, setSlider] = useState(0);
    const [cartMessage, setCartMessage] = useState('');

    useEffect(() => {
        const getProducts = async () => {
            try {
                const { data } = await fetchProducts();
                setProducts(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching products:', error);
                setProducts([]);
            }
        };
        const getBanners = async () => {
            try {
                const { data } = await API.get('/banners'); // Access banners through dedicated banner route
                setBanners(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error('Error fetching banners:', error);
                setBanners([]);
            }
        };
        getProducts();
        getBanners();
    }, []);

    useEffect(() => {
      if (!banners.length) return;
      const interval = setInterval(() => {
        setSlider((prev) => (prev + 1) % banners.length);
      }, 3500);
      return () => clearInterval(interval);
    }, [banners]);

    return (
        <div className="min-h-screen w-full bg-gradient-to-br from-blue-100 via-pink-100 to-purple-200 pb-12">
          {/* Slider */}
          <div className="relative w-full h-64 md:h-96 overflow-hidden mb-12 rounded-b-3xl shadow-2xl bg-white bg-opacity-60 backdrop-blur-lg">
            {Array.isArray(banners) && banners.map((banner, idx) => (
              <img
                key={banner._id || idx}
                src={getImageUrl(banner.image)}
                alt={banner.title || 'Shop banner'}
                className={`absolute w-full h-full object-cover transition-opacity duration-1000 ${slider === idx ? 'opacity-100' : 'opacity-0'}`}
                style={{ zIndex: slider === idx ? 1 : 0 }}
              />
            ))}
            {/* Arrows */}
            {Array.isArray(banners) && banners.length > 1 && (
              <>
                <button
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow text-3xl flex items-center justify-center"
                  onClick={() => setSlider((prev) => (prev - 1 + banners.length) % banners.length)}
                  aria-label="Previous banner"
                  style={{ zIndex: 2 }}
                >
                  <ChevronLeftIcon fontSize="inherit" />
                </button>
                <button
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-100 rounded-full p-2 shadow text-3xl flex items-center justify-center"
                  onClick={() => setSlider((prev) => (prev + 1) % banners.length)}
                  aria-label="Next banner"
                  style={{ zIndex: 2 }}
                >
                  <ChevronRightIcon fontSize="inherit" />
                </button>
              </>
            )}
            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {Array.isArray(banners) && banners.map((_, idx) => (
                <span key={idx} className={`w-3 h-3 rounded-full ${slider === idx ? 'bg-blue-600' : 'bg-white bg-opacity-60'} border border-blue-600`}></span>
              ))}
            </div>
          </div>

          {/* Top Sellers / Trending Products */}
          <div className="container mx-auto px-8 sm:px-0 mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-purple-700 drop-shadow-lg tracking-wide">Top Sellers</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 overflow-x-auto pb-2">
              {Array.isArray(products) && (products.length ? products.slice(0, 4) : []).map((product) => {
                return (
                  <div key={product._id} className="bg-white bg-opacity-70 backdrop-blur-lg rounded-3xl shadow-2xl p-3 sm:p-6 flex flex-col items-center min-w-[160px] sm:min-w-[220px] max-w-xs mx-auto border border-purple-100">
                    <img src={getImageUrl(product.image)} alt={product.name} className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-xl mb-3 sm:mb-4 shadow-lg" />
                    <h3 className="font-bold text-sm sm:text-lg mb-2 text-gray-800 text-center line-clamp-2 min-h-[40px] sm:min-h-[48px]">{product.name}</h3>
                    <div className="text-purple-700 font-extrabold text-lg sm:text-2xl mb-3">Rs {product.price}</div>
                    <button onClick={(e) => {
                      e.preventDefault();
                      let cart = JSON.parse(localStorage.getItem('cart')) || [];
                      const existItem = cart.find((x) => x.product === product._id);
                      if (existItem) {
                        cart = cart.map((x) =>
                          x.product === product._id ? { ...x, qty: x.qty + 1 } : x
                        );
                      } else {
                        cart.push({
                          product: product._id,
                          name: product.name,
                          image: product.image,
                          price: product.price,
                          stock: product.stock,
                          qty: 1,
                        });
                      }
                      localStorage.setItem('cart', JSON.stringify(cart));
                      setCartMessage(`${product.name} added to cart!`);
                      setTimeout(() => setCartMessage(''), 2000);
                      if (onCartChange) onCartChange();
                    }} className="mt-auto px-4 sm:px-6 py-2 rounded-full font-bold text-white bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 shadow-lg transition text-sm sm:text-base">Add to Cart</button>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features */}
          <div className="container mx-auto px-8 sm:px-0 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 mb-8 sm:mb-16">
            {features.map((f, i) => (
              <div
                key={f.title}
                className={`rounded-3xl shadow-2xl p-4 sm:p-8 flex flex-col items-center text-center ${featureCardBg[i % featureCardBg.length]} border-0 relative overflow-hidden`}
                style={{ minHeight: 'auto', sm: { minHeight: 200 } }}
              >
                <div className={`flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full ${featureIconBg[i % featureIconBg.length]} mb-3 sm:mb-5 shadow-lg` }>
                  <span className="text-3xl sm:text-5xl" style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.10))' }}>{f.icon}</span>
                </div>
                <h3 className="font-extrabold text-sm sm:text-xl mb-1 sm:mb-2 text-white drop-shadow-lg">{f.title}</h3>
                <p className="text-white text-opacity-90 text-xs sm:text-base font-medium drop-shadow-sm">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Brands Carousel */}
          <div className="container mx-auto px-4 sm:px-0 mb-8 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide">Brands We Carry</h2>
            <div className="rounded-3xl shadow-2xl bg-white bg-opacity-70 backdrop-blur-lg border-2 border-purple-200 px-4 py-8">
              <Slider
                dots={false}
                infinite={true}
                speed={500}
                slidesToShow={5}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={2000}
                arrows={true}
                responsive={[
                  { breakpoint: 1024, settings: { slidesToShow: 4 } },
                  { breakpoint: 768, settings: { slidesToShow: 3 } },
                  { breakpoint: 480, settings: { slidesToShow: 2 } },
                ]}
                className="px-2"
              >
                {brands.map((brand, idx) => (
                  <div key={brand.name} className={`flex flex-col items-center px-2`}>
                    <div className={`flex items-center justify-center h-24 w-28 rounded-3xl mb-3 shadow-2xl bg-gradient-to-br ${[
                      'from-pink-200 to-yellow-200',
                      'from-blue-200 to-cyan-200',
                      'from-green-200 to-lime-200',
                      'from-yellow-200 to-orange-200',
                      'from-purple-200 to-pink-200',
                      'from-orange-200 to-pink-100',
                      'from-cyan-200 to-blue-100',
                      'from-lime-200 to-green-100',
                    ][idx % 8]}`}>
                      <div className="bg-white rounded-full flex items-center justify-center h-16 w-16 shadow-xl">
                        <img src={brand.img} alt={brand.name} className="h-10 w-auto object-contain transition-transform duration-200 hover:scale-110 mx-auto" style={{ maxWidth: 56 }} />
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>

          {/* Latest Products */}
          <div className="container mx-auto px-8 sm:px-0 mb-8 sm:mb-16" id="products">
            <h1 className="text-2xl sm:text-3xl font-extrabold mb-6 sm:mb-8 text-center text-purple-700 drop-shadow-2xl tracking-wide">Latest Products</h1>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 lg:gap-10">
                {Array.isArray(products) && products.map((product) => (
                    <ProductCard
                        key={product._id}
                        product={product}
                        onAddToCart={() => {
                          let cart = JSON.parse(localStorage.getItem('cart')) || [];
                          const existItem = cart.find((x) => x.product === product._id);
                          if (existItem) {
                            cart = cart.map((x) =>
                              x.product === product._id ? { ...x, qty: x.qty + 1 } : x
                            );
                          } else {
                            cart.push({
                              product: product._id,
                              name: product.name,
                              image: product.image,
                              price: product.price,
                              stock: product.stock,
                              qty: 1,
                            });
                          }
                          localStorage.setItem('cart', JSON.stringify(cart));
                          setCartMessage(`${product.name} added to cart!`);
                          setTimeout(() => setCartMessage(''), 2000);
                          if (onCartChange) onCartChange();
                        }}
                    />
                ))}
            </div>
          </div>
         

          {/* Testimonials */}
          <div className="container mx-auto px-8 sm:px-0 mb-8 sm:mb-16 bg-white bg-opacity-70 backdrop-blur-lg py-8 sm:py-16 rounded-3xl shadow-2xl">
            <h2 className="text-xl sm:text-2xl font-extrabold mb-6 sm:mb-8 text-center bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg tracking-wide">What Our Customers Say</h2>
            
            {/* Mobile Carousel */}
            <div className="block md:hidden">
              <Slider
                dots={true}
                infinite={true}
                speed={500}
                slidesToShow={1}
                slidesToScroll={1}
                autoplay={true}
                autoplaySpeed={4000}
                arrows={false}
                className="px-4"
              >
                {testimonials.map((t) => (
                  <div key={t.name} className="px-2">
                    <div className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-6 text-center border border-purple-100">
                      <img src={t.img} alt={t.name} className="w-16 h-16 rounded-full mx-auto mb-3 object-cover border-4 border-white shadow-lg" />
                      <p className="text-gray-700 mb-2 text-base font-medium">"{t.text}"</p>
                      <div className="font-semibold text-purple-700 text-sm">- {t.name}</div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

            {/* Desktop Layout */}
            <div className="hidden md:flex flex-row gap-8 justify-center items-center">
              {testimonials.map((t) => (
                <div key={t.name} className="bg-white bg-opacity-80 rounded-2xl shadow-xl p-8 max-w-xs text-center border border-purple-100">
                  <img src={t.img} alt={t.name} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white shadow-lg" />
                  <p className="text-gray-700 mb-3 text-lg font-medium">"{t.text}"</p>
                  <div className="font-semibold text-purple-700">- {t.name}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div className="container mx-auto px-8 sm:px-0 pt-4 pb-4 sm:py-8 mb-0">
            <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-3xl p-10 flex flex-col md:flex-row items-center justify-between shadow-2xl">
              <div className="mb-6 md:mb-0">
                <h3 className="text-white text-2xl font-extrabold mb-2 drop-shadow-lg">Join Our Newsletter</h3>
                <p className="text-pink-100">Get exclusive offers and updates straight to your inbox.</p>
              </div>
              <form className="flex flex-col md:flex-row w-full md:w-auto">
                <input type="email" placeholder="Your email" className="rounded-l md:rounded-l px-4 py-2 outline-none text-gray-700 w-full md:w-auto mb-2 md:mb-0" />
                <button type="submit" className="bg-white text-purple-600 font-bold px-6 py-2 rounded-r md:rounded-r hover:bg-purple-100 transition w-full md:w-auto">Subscribe</button>
              </form>
            </div>
          </div>

          {cartMessage && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full shadow-lg z-50 text-lg font-bold animate-fade-in-out text-center">
              <div className="text-xl font-extrabold">{cartMessage.split(' added to cart!')[0]}</div>
              <div className="text-lg font-bold">added to cart!</div>
            </div>
          )}
        </div>
    );
};

export default HomePage; 