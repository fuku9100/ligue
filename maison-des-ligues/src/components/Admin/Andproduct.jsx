import React, { useState } from 'react';
import '../../styles/Admin/Produits.css';

const AndProduct = () => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const [price, setPrice] = useState('');
    const [image, setImage] = useState(null);
    const [quantity, setQuantity] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formDataToSend = new FormData();
        formDataToSend.append('name', name);
        formDataToSend.append('details', details);
        formDataToSend.append('price', price);
        formDataToSend.append('image', image);
        formDataToSend.append('quantity', quantity);

        try {
            const response = await fetch(`http://localhost:3000/api/produitsroute/produit`, {
                method: 'POST',
                body: formDataToSend
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            alert('Product added successfully');
        } catch (error) {
            console.error('An error occurred while adding the product', error);
        }
    };

    return (
        <div className="Produits">
            <h1>Add Product</h1>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <textarea placeholder="Details" value={details} onChange={(e) => setDetails(e.target.value)} required />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.value)} required />
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AndProduct;