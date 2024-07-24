const express = require("express")
const router = new express.Router()


const clientController = require("../controller/clientController")
const userController = require("../controller/userController")

const checkPermission = require('../controller/permission');
const { verifyToken } = require('../controller/middleware');




// router.put('/edit-organization/:id',verifyToken,checkPermission('Admin'),organizationController.updateOrganization)



//Internal

router.get('/delete-all',clientController.deleteAll)




//Register
// router.post('/register',userController.register)



//Login
router.post('/login',userController.login)

router.post('/verify-otp',userController.verifyOtp)




module.exports = router
















// const checkPermission = require('./middleware/checkPermission');

// router.post('/item', checkPermission('ItemCreate'), (req, res) => {
//   // Logic for creating an item
//   res.status(200).json({ message: 'Item created successfully' });
// });