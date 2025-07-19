import React, { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { fetchProducts } from '../services/api';
import { getImageUrl } from '../utils/imageUtils';

const categories = [
  {
    name: 'Electronics',
    img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsPBvuiyKR9mI1stqv3SuIbXIHJBdvfBIh1d-45UeD03RPOLWm69ESoC86wC1j_1Jrcc4&usqp=CAU',
  },
  {
    name: 'Fashion',
    img: 'https://www.researchgate.net/publication/335442070/figure/fig3/AS:796713224777729@1566962643040/Example-images-showing-how-the-Fashion-Categories-detected-from-the-photoshoot-images-We.ppm',
  },
  {
    name: 'Sports',
    img: 'https://media.istockphoto.com/id/1188462138/photo/variety-of-sport-accessories-on-wooden-surface.jpg?s=612x612&w=0&k=20&c=y2l7DYNkxbVteZy-Kx_adCzm-soTRbiEypje4j8ENe0=',
  },
];

const CategoriesPage = ({ onCartChange }) => {
  const [products, setProducts] = useState([]);
  const [viewAllCategory, setViewAllCategory] = useState(null);
  const [cartMessage, setCartMessage] = useState('');

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await fetchProducts();
        setProducts(data);
      } catch (error) {
        setProducts([]);
      }
    };
    getProducts();
  }, []);

  const getCategoryProducts = (catName) =>
    products.filter((p) => p.category && p.category.toLowerCase() === catName.toLowerCase());

  const handleAddToCart = (product) => {
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
    setTimeout(() => setCartMessage(''), 1200);
    if (onCartChange) onCartChange();
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-white min-h-screen py-10">
      <div className="container mx-auto px-8 sm:px-0">
        <h1 className="text-4xl font-extrabold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-lg text-center">Shop by Category</h1>
        {cartMessage && (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 bg-green-100 text-green-700 px-6 py-2 rounded shadow-lg z-50">{cartMessage}</div>
        )}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {categories.map((cat) => {
            const catProducts = getCategoryProducts(cat.name);
            return (
              <div key={cat.name} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition flex flex-col">
                <img src={cat.img} alt={cat.name} className="h-64 w-full object-cover" />
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-2xl font-bold text-blue-700 mb-2">{cat.name}</h2>
                  <div className="flex gap-4 mb-2">
                    {catProducts.slice(0, 3).map((prod) => (
                      <div key={prod._id} className="flex flex-col items-center bg-blue-50 rounded-lg p-2 w-28">
                        <img src={getImageUrl(prod.image)} alt={prod.name} className="h-16 w-16 object-cover rounded mb-1" />
                        <div className="text-xs font-semibold text-gray-700 text-center line-clamp-2 min-h-[32px]">{prod.name}</div>
                        <div className="text-xs text-blue-600 font-bold">Rs {prod.price}</div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="mt-auto bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition"
                    onClick={() => setViewAllCategory(cat.name)}
                  >
                    View All
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* Modal or expanded section for View All */}
        {viewAllCategory && (
          <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center" onClick={() => setViewAllCategory(null)}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-2xl text-gray-500 hover:text-blue-700" onClick={() => setViewAllCategory(null)}>&times;</button>
              <h2 className="text-2xl font-bold text-blue-700 mb-6 text-center">{viewAllCategory} Products</h2>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
                {getCategoryProducts(viewAllCategory).map((product) => (
                  <ProductCard product={product} key={product._id} onAddToCart={() => handleAddToCart(product)} />
                ))}
                {getCategoryProducts(viewAllCategory).length === 0 && (
                  <div className="col-span-full text-center text-gray-500">No products found in this category.</div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage; 