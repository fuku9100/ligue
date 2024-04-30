import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import '../styles/connexion.css';
const Connexion = () => {
    const navigate = useNavigate();


    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleTokenUpdate = (token) => {
        const decodedToken = jwtDecode(token);
        console.log('Decoded Token:', decodedToken); // Vérifiez les informations du token décodé
        if (decodedToken.isAdmin) {
            navigate('/admin/dashboard');
            window.location.reload();
        } else {
            navigate('/acceuil');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/usersroute/connexion', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const { token } = await response.json();

                // Créez le cookie token
                Cookies.set('token', token);



                window.dispatchEvent(new Event('tokenUpdated')); // Émettre un événement
                handleTokenUpdate(token);
            } else {
                const errorData = await response.json();
                setError(errorData.error);
            }
        } catch (error) {
            console.error('Erreur lors de la soumission du formulaire :', error);
            setError('Erreur réseau lors de la connexion.');
        }
    };
    

    return (
        <form onSubmit={handleSubmit}>
            <label>Email:</label>
            <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
            />

            <label>Mot de passe:</label>
            <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
            />

            <button type="submit">Se connecter</button>

            {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
    );
};

export default Connexion;
