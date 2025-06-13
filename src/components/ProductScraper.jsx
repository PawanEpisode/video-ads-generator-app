import { useState } from 'react';
import axios from 'axios';

const ProductScraper = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [productData, setProductData] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setProductData(null);

    try {
      const response = await axios.post('http://localhost:8000/api/v1/products/scrape', {
        url: url
      });
      setProductData(response.data);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to scrape product information');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-violet-500 from-0% via-blue-500 via-50% to-red-500 to-100% animate-gradient bg-[length:300%_auto]">Product Scraper</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="flex gap-4">
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter product URL (e.g., https://store.myshopify.com/products/example)"
            className="flex-1 p-3 text-black border bg-white border-gray-900 rounded-lg focus:outline-none focus:ring-4 focus:ring-gray-200"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {loading ? 'Scraping...' : 'Scrape'}
          </button>
        </div>
      </form>

      {error && (
        <div className="p-4 mb-6 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {productData && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl text-gray-500 font-bold mb-4">{productData.title}</h2>
          
          {productData.brand && (
            <p className="text-gray-600 mb-4">Brand: {productData.brand}</p>
          )}
          
          {productData.price > 0 && (
            <p className="text-xl text-orange-400 font-semibold mb-4">${productData.price.toFixed(2)}</p>
          )}
          
          {productData.description && (
            <div className="mb-6">
              <h3 className="text-lg text-blue-300 font-semibold mb-2">Overview</h3>
              <p className="text-gray-700">
                {productData.description.split('\n\n').map((paragraph, index) => (
                  <span key={index}>
                    {paragraph}
                    {index < productData.description.split('\n\n').length - 1 && <><br /><br /></>}
                  </span>
                ))}
              </p>
            </div>
          )}
          
          {productData.features && productData.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="list-disc list-inside text-gray-700">
                {productData.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}
          
          {productData.images && productData.images.length > 0 && (
            <div>
              <h3 className="text-lg text-blue-300 font-semibold mb-2">Images</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {productData.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Product image ${index + 1}`}
                    className="w-full h-48 rounded-lg"
                  />
                ))}
              </div>
            </div>
          )}

          {productData.videos && productData.videos.length > 0 && (
            <div className="product-videos">
              {productData.videos.map((video, idx) => (
                <video
                  key={idx}
                  controls
                  poster={video.poster}
                  className="w-full my-2"
                  aria-label={video.alt}
                  style={{ maxWidth: 400 }}
                >
                  <source src={video.src} type="video/mp4" />
                  {video.alt && <track kind="descriptions" label={video.alt} />}
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductScraper; 