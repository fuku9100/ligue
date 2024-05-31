const express = require('express');
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const app = express();
const usercontroller = require('../controllers/userscontroller');
const { isadmin } = require('../midleware/middleware');
const { authenticator } = require('../midleware/middleware');
const cookieParser = require('cookie-parser');
app.use(cookieParser());

const defineRoutes = () => {
    router.post('/connexion', userController.connexion);
    router.post('/inscription', userController.inscription);
    router.get('/utilisateurs', userController.utilisateurs);
    router.get('/administrateurs', authenticator, isadmin, userController.administrateurs);
    router.delete('/utilisateurs/:uid', userController.delete);
    router.post('/deconnexion', userController.deconnexion);
    router.post('/connexionadmin', userController.connexionAdmin);
};

defineRoutes();

module.exports = router;