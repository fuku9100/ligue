import '../styles/banniere.css';
import logo from '../assets/logo.png';
import logo_panier from '../assets/cart2.svg';
import { Link } from 'react-router-dom';
import MyComponent from './boutonprofil';
import React, { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';

function Banniere() {
    const [isAdmin, setIsAdmin] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // Récupérer le token à partir du cookie
        const token = Cookies.get('token');

        if (token) {
            // Décoder le token pour obtenir les informations
            const decodedToken = jwtDecode(token);
            setIsAdmin(decodedToken.isAdmin);
            setIsAuthenticated(true);
        }
    }, []);

    return (
        <nav>
             <img src={logo} alt="Logo" className='logo' />
             <h1>M2L</h1>
            <ul className='banniere-ul'>
                
                <li><Link to="/acceuil">Acceuil</Link></li>
                <li><Link to="/shop">Shop</Link></li>
                
                {/* Vérifiez si l'utilisateur est administrateur */}
                {isAdmin && <li><Link to="/admin/dashboard">Admin</Link></li>}
                
                <div className='logogo'>
                    {/* Affichez le lien vers le panier uniquement si l'utilisateur est connecté */}

                    <li><MyComponent /></li>

                    {isAuthenticated && <li><Link to="/panier"><img src={logo_panier} alt="Panier Logo" className='logo_panier' /></Link></li>}
                </div>
            </ul>
        </nav>
    );
}

export default Banniere;