import React from 'react';
import { FiEdit, FiTrash2, FiWhatsapp } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { productAPI } from '../services/api';
import toast from 'react-hot-toast';

const ProductCard = ({ product, onEdit, onDelete, onWhatsApp }) => {
  const { isSuperAdmin } = useAuth();
  
  const handleWhatsApp = async () => {
    try {
      const response = await productAPI.getWhatsAppLink(product.shop_id, product.id);
      window.open(response.data.whatsapp_link, '_blank');
    } catch (error) {
      toast.error('Erreur lors de la génération du lien WhatsApp');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {product.image_url && (
        <img 
          src={product.image_url} 
          alt={product.name}
          className="w-full h-48 object-cover"
        />
      )}
      
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold">{product.name}</h3>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
            {product.category}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        
        <div className="mt-4 space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Prix de vente:</span>
            <span className="font-bold text-green-600">
              {product.selling_price?.toLocaleString()} FCFA
            </span>
          </div>
          
          {isSuperAdmin && product.purchase_price > 0 && (
            <div className="flex justify-between">
              <span className="text-gray-600">Prix d'achat:</span>
              <span className="text-gray-800">
                {product.purchase_price?.toLocaleString()} FCFA
              </span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span className="text-gray-600">Stock:</span>
            <span className={`font-semibold ${
              product.stock === 0 ? 'text-red-600' : 
              product.stock < 5 ? 'text-orange-600' : 'text-green-600'
            }`}>
              {product.stock === 0 ? 'Rupture' : product.stock}
            </span>
          </div>
        </div>
        
        <div className="mt-4 flex justify-end space-x-2">
          {onWhatsApp && (
            <button
              onClick={handleWhatsApp}
              className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="WhatsApp"
            >
              <FiWhatsapp size={20} />
            </button>
          )}
          
          {onEdit && (
            <button
              onClick={() => onEdit(product)}
              className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
            >
              <FiEdit size={20} />
            </button>
          )}
          
          {onDelete && (
            <button
              onClick={() => onDelete(product.id)}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <FiTrash2 size={20} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;