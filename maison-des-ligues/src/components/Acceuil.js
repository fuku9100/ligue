import React, { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import '../styles/accueil.css';
import croppedBanniere from '../assets/cropped-bannic3a8reppe2.png';
function Acceuil() {
    const [userName, setUserName] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        // Récupérer le token à partir du cookie
        const token = Cookies.get('token');

        if (token) {
            // Décoder le token pour obtenir les informations
            const decodedToken = jwtDecode(token);
            const userEmail = decodedToken.email;
            const userIsAdmin = decodedToken.isAdmin;

            // Mettre à jour le nom d'utilisateur dans le state
            setUserName(userEmail);
            setIsAdmin(userIsAdmin);
        }
    }, []);

    return (
        
             <div className="banniere-image">
             <img src={croppedBanniere} alt="Logo Maison des Ligues de Lorraine" className="banniere-img" />
              
        </div>
    );
}

export default Acceuil;