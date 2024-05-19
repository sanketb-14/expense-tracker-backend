import {Router} from 'express' ;
import {signup,login,logout,protect,restrictTo, forgotPassword, resetPassword} from '../controllers/authController.js'
import { fetchAllUsers,deleteMe } from '../controllers/userController.js';


const router = Router()

router.route('/signup').post(signup)
router.route('/login').post(login)
router.get('/logout',logout)

router.post('/forgotPassword' , forgotPassword)
router.patch('/resetPassword/:token', resetPassword)

router.use(protect)

router.route('/fetchAllUsers').get(fetchAllUsers)


router.route('/deleteMe').delete(deleteMe)
router.use(restrictTo('ADMIN'))

// router.route('/:id').delete( deleteUser)


export default router;

