import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import CartContext from './CartContext';
import '../styles/shop.css';

function Shop() {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({}); 
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
        axios.get('http://localhost:3000/api/produitsroute/produit')
            .then(response => {
                setProducts(response.data);
            });
    }, []);

    const addToCart = async (product) => {
        const token = Cookies.get('token');
        const user = jwtDecode(token);
    
        axios.post('http://localhost:3000/api/produitsroute/ajouterAuPanier', {
            pid: product.pid,
            uid: user.uid,
            name: product.name,
            details: product.details,
            price: product.price,
            image: product.image,
            quantity: quantities[product.pid] || 1
        })
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.error(error);
        });
    };

    const handleQuantityChange = (pid, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [pid]: quantity
        }));
    };

    return (
        <CartContext.Provider value={quantities}>
            <div>
                <h1>Liste des produits :</h1>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
                    <option value="">All Categories</option>
                    <option value="clothes">Clothes</option>
                    <option value="ball">Ball</option>
                    <option value="accessory">Accessory</option>
                </select>
                <div className='liste'>
                    {products.filter(product => {
                        return (
                            (product.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
                            (!selectedCategory || product.category === selectedCategory)
                        );
                    }).map(product => (
                        <div key={product.pid} className="box-product">
                            {product.image && <img src={`http://localhost:3000/${product.image}`} alt={product.name} style={{ maxWidth: '50%' }} />}
                            <div className='details'>
                                <h2>{product.name}</h2>
                                <p>{product.details}</p>
                                <p>Catégorie : {product.category}</p>
                                <p>Prix : {product.price} €</p>
                                <p>Quantité disponible : {product.quantity}</p>
                                <input
                                    type="number"
                                    min="1"
                                    defaultValue={quantities[product.pid] || 1}
                                    onChange={(e) => handleQuantityChange(product.pid, parseInt(e.target.value))}
                                />
                                <button className="btn-panier" onClick={() => {
                                    addToCart(product);
                                }}>Ajouter au panier</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </CartContext.Provider>
    );
}

export default Shop;