const express = require('express');
const router = express.Router();
const {
    getSignUp,
    getLogIn,
    postLogIn,
    postSignUp,
    updateUser,
    deleteUser
} = require('../controllers/AuthContoller');
const {
    getAdmin,
    addBook,
    modifyBook,
    deleteBook,
    protectAdminRoute,
    getBookList
} = require('../controllers/AdminController');

router.get('/logIn',getLogIn);
router.post('/logIn',postLogIn);
router.get('/signUp',getSignUp);
router.post('/signUp',postSignUp);
router.get('/bookList',protectAdminRoute,getBookList);
router.post('/addBook',protectAdminRoute,addBook);
router.patch('/modifyBook',protectAdminRoute,modifyBook);
router.delete('/deleteBook',protectAdminRoute,deleteBook);
router.get('/:userEmail',protectAdminRoute,getAdmin);
router.delete('/:userEmail',protectAdminRoute,deleteUser);
router.patch('/:userEmail',protectAdminRoute,updateUser);

module.exports = router;
// count 
// cookies sessions

