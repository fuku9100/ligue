
const express = require('express');
const router = express.Router();
const produitsController = require('../controllers/productscontroller');
const upload = require('../midleware/multer');

router.use('/uploads', express.static('uploads'));

router.post('/produit', upload.single('image'), produitsController.ajoutproduit);
router.get('/produit', produitsController.afficheproduit);
router.delete('/produit/:pid', produitsController.supprimerproduit);
router.delete('/panier/:pid', produitsController.supprimerDuPanier);

router.post('/ajout', (req, res) => {
    const { pid, uid, name, details, price, image } = req.body;
    console.log('Data received for adding to cart:', { pid, uid, name, details, price, image });
    produitsController.ajouterAuPanier(req, res);
});

router.get('/panier', produitsController.getContenuPanier);
router.put('/produit/:pid', upload.single('image'), produitsController.updateProduct);

module.exports = router;