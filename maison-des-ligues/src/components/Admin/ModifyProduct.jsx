import React, { useState, useEffect } from 'react';
import '../../styles/Admin/Produits.css';

const ModifyProduct = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState('');

    useEffect(() => {
        fetch("http://localhost:3000/api/produitsroute/produit")
            .then((response) => response.json())
            .then((data) => setProducts(data))
            .catch((error) => console.error(error));
    }, []);

    const handleSelectProduct = (product) => {
        setSelectedProduct(product);
        setName(product.name);
        setDetails(product.details);
        setPrice(product.price);
        setQuantity(product.quantity);
        setImage(product.image);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('details', details);
        formDataToSend.append('price', price);
        formDataToSend.append('image', image);
        formDataToSend.append('quantity', quantity);

        try {
            const response = await fetch(`http://localhost:3000/api/produitsroute/produit/${selectedProduct.pid}`, {
                method: 'PUT',
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const productData = await response.json();
            setProducts(products.map(product => product.pid === productData.pid ? productData : product));
            alert('Product updated successfully');
        } catch (error) {
            console.error('An error occurred while updating the product', error);
        }
    };

    return (
        <div className="Produits">
            <h1>Modify Product</h1>
            <select onChange={(e) => handleSelectProduct(products[e.target.value])}>
                {products.map((product, index) => (
                    <option key={product.pid} value={index}>{product.name}</option>
                ))}
            </select>
            <form onSubmit={handleSubmit}>
                <input type="text" name="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
                <input type="text" name="details" value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Details" required />
                <input type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" required />
                <input type="number" name="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" required />
                <input type="file" name="image" onChange={(e) => setImage(e.target.files[0])} required />
                <button type="submit">Modify Product</button>
            </form>
        </div>
    );
};

export default ModifyProduct;