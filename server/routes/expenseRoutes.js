import {Router} from 'express'
import { protect } from '../controllers/authController.js'
import {addExpense} from '../controllers/expenseController.js'
import {myAccount}from '../controllers/userController.js'

const router = Router()

router.use(protect)

router.route('/addExpense').post(addExpense)
router.route('/myAccount').get(myAccount)
export default router