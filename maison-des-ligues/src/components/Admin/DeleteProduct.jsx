import React, { useState, useEffect } from 'react';
import '../../styles/Admin/Produits.css';

const DeleteProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3000/api/produitsroute/produit")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
    };

    const handleDelete = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/produitsroute/produit/${selectedProduct.pid}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            setProducts(products.filter(product => product.pid !== selectedProduct.pid));
            alert('Product deleted successfully');
        } catch (error) {
            console.error('An error occurred while deleting the product', error);
        }
    };

    return (
        <div className="Produits">
            <h1>Delete Product</h1>
            <select onChange={(e) => handleSelectProduct(products[e.target.value])}>
                {products.map((product, index) => (
                    <option key={product.pid} value={index}>{product.name}</option>
                ))}
            </select>
            <button onClick={handleDelete}>Delete Product</button>
        </div>
    );
};

export default DeleteProduct;