const express = require('express');
const router = express.Router();
const {
    getSignUp,
    getLogIn,
    postLogIn,
    postSignUp,
    updateUser,
    deleteUser,
    getLogOut
} = require('../controllers/AuthContoller');
const {
    getClient,
    searchBook,
    issueBook,
    renewBook,
    returnBook,
    clearFine,
    protectClientRoute
} = require('../controllers/ClientController');

router.get('/logIn',getLogIn);
router.post('/logIn',postLogIn);
router.get('/signUp',getSignUp);
router.post('/signUp',postSignUp);
router.post('/searchBook',searchBook);
router.patch('/issueBook',protectClientRoute,issueBook);
router.patch('/renewBook',protectClientRoute,renewBook);
router.patch('/returnBook',protectClientRoute,returnBook);
router.patch('/clearFine',protectClientRoute,clearFine);
router.get('/logOut',protectClientRoute,getLogOut);
router.get('/:userEmail',protectClientRoute,getClient);
router.delete('/:userEmail',protectClientRoute,deleteUser);
router.patch('/:userEmail ',protectClientRoute,updateUser);

module.exports = router;
