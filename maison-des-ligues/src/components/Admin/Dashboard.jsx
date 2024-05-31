import { Link } from 'react-router-dom';
import '../../styles/Admin/Dashboard.css';


function Dashboard({ productCount }) {
    return (
        <section className="dashboard-container">
            <h1 className="dashboard-header">TABLEAU DE BORD</h1>

            <div className="dashboard-box-container">
                <div className="dashboard-box">
                    <h3>Bienvenue</h3>
                    <p>Admin</p>
                </div>

                <div className="dashboard-box">
                    <h3>{productCount}</h3>
                    <p>Produits disponibles</p>
                    <Link to="/Admin/Produits" className="dashboard-button">Voir et ajouter des produits</Link>
                </div>

                <div className="dashboard-box">
                    <h3>Actions</h3>
                    <Link to="/Admin/CreateProduct" className="dashboard-button">Créer un produit</Link>
                    <Link to="/Admin/ModifyProduct" className="dashboard-button">Modifier un produit</Link>
                    <Link to="/Admin/DeleteProduct" className="dashboard-button">Supprimer un produit</Link>
                </div>
            </div>
        </section>
    );
}

export default Dashboard;