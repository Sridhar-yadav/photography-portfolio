import { useState, useEffect } from 'react';
import { AdminTable } from '../../components/ui/AdminTable';
import { Modal } from '../../components/ui/Modal';
import { Dropzone } from '../../components/ui/Dropzone';
import { productsAPI } from '../../services/api';

const StoreManager = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: '', description: '', price: '' });
  const [productImage, setProductImage] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await productsAPI.getAll();
      setProducts(res.data);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('description', formData.description);
    if (formData.price) data.append('price', formData.price);
    if (productImage) data.append('image', productImage);

    try {
      await productsAPI.create(data);
      fetchProducts();
      setIsModalOpen(false);
      setFormData({ name: '', category: '', description: '', price: '' });
      setProductImage(null);
    } catch (error) {
      console.error('Failed to create product', error);
      alert('Failed to save product. Check backend logs.');
    }
  };

  const columns = [
    { header: 'Product Name', accessor: 'name' },
    { header: 'Category', accessor: 'category' },
    { header: 'Price', render: (row) => row.price ? `₹${row.price}` : 'N/A' },
    { header: 'Date', render: (row) => new Date(row.created_at).toLocaleDateString() },
  ];

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-display mb-1">Store Products</h2>
          <p className="text-sm text-textSecondary uppercase tracking-widest">Manage your prints and presets</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">Add New Product</button>
      </div>

      {isLoading ? (
        <p className="text-textSecondary">Loading products...</p>
      ) : (
        <AdminTable columns={columns} data={products} />
      )}

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="Add New Product">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Product Name</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary" required />
            </div>
            <div>
              <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Category</label>
              <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary appearance-none" required>
                <option value="">Select Category</option>
                <option value="Presets">Presets</option>
                <option value="Prints">Prints</option>
                <option value="Albums">Albums</option>
                <option value="Digital">Digital</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Description</label>
            <textarea rows="3" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary resize-none" required />
          </div>
          <div>
            <label className="block text-xs uppercase tracking-widest text-textSecondary mb-2">Price (₹)</label>
            <input type="number" step="0.01" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} className="w-full bg-surface/30 border border-textPrimary/20 p-3 focus:outline-none focus:border-textPrimary" placeholder="Optional" />
          </div>
          
          <Dropzone file={productImage} setFile={setProductImage} label="Product Image" />

          <button type="submit" className="w-full btn-primary">Save Product</button>
        </form>
      </Modal>
    </div>
  );
};

export default StoreManager;
