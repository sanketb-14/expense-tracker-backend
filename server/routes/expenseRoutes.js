import {Router} from 'express'
import { protect } from '../controllers/authController.js'
import {addExpense, deleteTransaction, editTransaction, getTransactionByCategories} from '../controllers/expenseController.js'
import {myAccount}from '../controllers/userController.js'

const router = Router()

router.use(protect)

router.route('/addExpense').post(addExpense)
router.route('/myAccount').get(myAccount)
router.route('/editExpense/:transactionId').patch(editTransaction).delete(deleteTransaction)
router.route('/myAccount/:categories').get(getTransactionByCategories)
export default router