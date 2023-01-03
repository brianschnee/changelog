import { Router } from 'express'
import { body } from 'express-validator'
import {
   createProduct,
   deleteProduct,
   getOneProduct,
   getProducts,
} from './handlers/product'
import { validateReqBody } from './utils/middleware'

const router = Router()

// Product
router.get('/product', getProducts)
// body('name') <- req.body should have a field on it called 'name'
router.get('/product/:id', body('name'), getOneProduct)
router.put(
   '/product/:id',
   body('name').exists().isString(),
   validateReqBody,
   (req, res) => {}
)
router.post(
   '/product',
   body('name').exists().isString(),
   validateReqBody,
   createProduct
)
router.delete('/product/:id', deleteProduct)

// Update
router.get('/update', () => {})
router.get('/update/:id', () => {})
router.put(
   '/update/:id',
   body('title').optional(),
   body('body').optional(),
   body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
   body('version').optional(),
   validateReqBody,
   (req, res) => {}
)
router.post(
   '/update',
   body('title').exists().isString(),
   body('body').exists().isString(),
   validateReqBody,
   (req, res) => {}
)
router.delete('/update/:id', () => {})

// UpdatePoint
router.get('/updatepoint', () => {})
router.get('/updatepoint/:id', () => {})
router.put(
   '/updatepoint/:id',
   body('name').optional().isString(),
   body('description').optional().isString(),
   validateReqBody,
   () => {}
)
router.post(
   '/updatepoint',
   body('name').exists().isString(),
   body('description').exists().isString(),
   body('updateId').exists().isString(),
   validateReqBody,
   () => {}
)
router.delete('/updatepoint/:id', () => {})

export default router
