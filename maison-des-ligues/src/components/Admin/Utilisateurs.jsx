import React, { useEffect, useState } from "react";
import Cookies from 'js-cookie';

function Utilisateurs() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await fetch("http://localhost:3000/api/usersroute/utilisateurs");
            if (!response.ok) {
                throw new Error("Erreur lors de la récupération des utilisateurs");
            }
            const data = await response.json();
            setUsers(data);
        } catch (error) {
            console.error(error);
        }
    };

    const handleDelete = async (uid) => {
        try {
            const token = Cookies.get('token'); // Récupérez le token JWT depuis le cookie

            const response = await fetch(`http://localhost:3000/api/usersroute/utilisateurs/${uid}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`, // Inclure le token JWT dans l'en-tête Authorization
                    'Content-Type': 'application/json', // Spécifier le type de contenu
                },
            });

            if (response.ok) {
                // Mettez à jour l'état des utilisateurs localement
                setUsers(users.filter(user => user.uid !== uid));
            } else {
                console.error('Erreur lors de la suppression de l\'utilisateur :', response.statusText);
            }
        } catch (error) {
            console.error('Erreur lors de la suppression de l\'utilisateur :', error);
        }
    };
    return (
        <div>
            <h1>Liste des utilisateurs</h1>
            <ul>
                {users && users.length > 0 ? (
                    users.map((user) => (
                        !user.admin && (
                            <li key={user.uid}>
                                {user.name} - {user.email}
                                <button onClick={() => handleDelete(user.uid)}>Supprimer</button>
                            </li>
                        )
                    ))
                ) : (
                    <li>Aucun utilisateur trouvé</li>
                )}
            </ul>
        </div>
    );
}

export default Utilisateurs;
