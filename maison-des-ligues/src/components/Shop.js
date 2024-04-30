import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';
import '../styles/shop.css';

function Shop() {
    const [products, setProducts] = useState([]);
    const [quantities, setQuantities] = useState({}); // Utiliser un objet pour stocker les quantités individuelles

    useEffect(() => {
        console.log("Fetching products...");
        axios.get('http://localhost:3000/api/produitsroute/produit')
            .then(response => {
                console.log("Products fetched successfully:", response.data);
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const addToCart = async (product) => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                throw new Error('Token not found');
            }

            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken); // Affichage du token décodé

            const quantity = quantities[product.pid] || 1; // Récupération de la quantité à partir de l'état local

            const data = {
                pid: product.pid,
                uid: decodedToken.uid,
                name: product.name,
                details: product.details,
                price: product.price,
                image: product.image,
                quantity: quantity // Utilisation de la quantité correcte
            };

            const response = await fetch('http://localhost:3000/api/produitsroute/ajout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            });

            if (response.ok) {
                console.log('Product added to cart successfully');
                window.location.reload(); // Rechargement de la page après l'ajout au panier
            } else {
                console.error('Failed to add product to cart');
            }
        } catch (error) {
            console.error('Error while adding to cart:', error);
        }
    };
    const handleQuantityChange = (pid, quantity) => {
        setQuantities(prevQuantities => ({
            ...prevQuantities,
            [pid]: quantity
        }));
    };

    console.log("Rendering component with products:", products);
    return (
        <div>
            <h1>Liste des produits :</h1>
            <div className='liste'>
                {products.map(product => (
                    <div key={product.pid} className="box-product">
                        {product.image && <img src={`http://localhost:3000/${product.image}`} alt={product.name} style={{ maxWidth: '50%' }} />}
                        <div className='details'>
                            <h2>{product.name}</h2>
                            <p>{product.details}</p>
                            <p>Prix : {product.price} €</p>
                            <p>Quantité disponible : {product.quantity}</p>
                            <input
                                type="number"
                                min="1"
                                defaultValue={quantities[product.pid] || 1}
                                onChange={(e) => handleQuantityChange(product.pid, parseInt(e.target.value))}
                            />
                            <button className="btn-panier" onClick={() => {
                                console.log("Button clicked, product:", product);
                                addToCart(product);
                            }}>Ajouter au panier</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Shop;