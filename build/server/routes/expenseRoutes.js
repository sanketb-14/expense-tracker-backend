import {Router} from 'express'
import { protect } from '../controllers/authController.js'
import {addExpense, deleteTransaction, editTransaction, getTransactionByCategories ,getAllCategories,razorCheckout,razorVerify, } from '../controllers/expenseController.js'
import { generatePDFController } from '../utils/pdfGenerator.js'

import {myAccount}from '../controllers/userController.js'

const router = Router()

router.use(protect)

router.route('/addExpense').post(addExpense)
router.route('/myAccount').get(myAccount)
router.route('/getAllCategories').get(getAllCategories)
router.route('/editExpense/:transactionId').patch(editTransaction).delete(deleteTransaction)
router.route('/transactions/:categories').get(getTransactionByCategories)
router.route('/checkout').post(razorCheckout)
router.route('/verify').post(razorVerify)
router.route('/generatePDF').post(generatePDFController)

router.route('/myAccount/:categories').get(getTransactionByCategories)
export default router