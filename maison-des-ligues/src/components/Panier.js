import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie'; // Importez le module Cookies pour accéder aux cookies
import '../styles/panier.css';

function Panier() {
    const [produitsSupprimables, setProduitsSupprimables] = useState([]);

    useEffect(() => {
        fetchPanier(); // Appel de la fonction fetchPanier lors du chargement initial de la page
    }, []);

    // Fonction pour récupérer le contenu du panier depuis le backend
    const fetchPanier = async () => {
        try {
            const token = Cookies.get('token'); // Récupérez le token depuis le cookie
            if (!token) {
                throw new Error('Token not found');
            }

            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken); // Ajout du console.log pour afficher decodedToken

            const response = await axios.get('http://localhost:3000/api/produitsroute/panier', {
                params: { uid: decodedToken.uid }
            });
            setProduitsSupprimables(response.data); // Met à jour l'état des produits supprimables avec les données récupérées depuis le backend
        } catch (error) {
            console.error('Erreur lors de la récupération du panier :', error);
        }
    };

    // Fonction pour supprimer un produit du panier
    const supprimerProduit = async (id) => {
        try {
            const token = Cookies.get('token');
            if (!token) {
                throw new Error('Token not found');
            }

            const decodedToken = jwtDecode(token);
            console.log('Decoded Token:', decodedToken);

            await axios.delete(`http://localhost:3001/api/produitsroute/panier/${id}`, {
                params: { uid: decodedToken.uid }
            });

            setProduitsSupprimables(produitsSupprimables.filter((produit) => produit.id!== id));
        } catch (error) {
            console.error('Erreur lors de la suppression du produit :', error);
        }
    };

    return (
        <div className="panier-container">
            <h1>Contenu du panier :</h1>
            <ul>
                {produitsSupprimables.map((produit, index) => (
                    <li key={index} className="produit">
                        <div className="produit-info">
                            <img src={`http://localhost:3000/${produit.image}`} alt={produit.name} />
                            <span className="produit-nom">{produit.name}</span>
                            <span className="produit-prix">{produit.price} €</span>
                            <button className="remove-button" onClick={() => supprimerProduit(produit.id)}>X</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Panier;