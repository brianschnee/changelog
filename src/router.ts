import { Router } from 'express'
import {
   bulletPointRules,
   productRules,
   updateBulletPointRules,
   updateRules,
   updateUpdateRules,
   validate
} from './utils/middleware'
import {
   createProduct,
   deleteProduct,
   getOneProduct,
   getProducts,
   updateProduct
} from './handlers/product'

const router = Router()

// Product
router.get('/product', getProducts)
router.get('/product/:id', productRules(), validate, getOneProduct)
router.put('/product/:id', productRules(), validate, updateProduct)
router.post('/product', productRules(), validate, createProduct)
router.delete('/product/:id', deleteProduct)

// Update
router.get('/update', () => {})
router.get('/update/:id', () => {})
router.put('/update/:id', updateUpdateRules(), validate, () => {})
router.post('/update', updateRules(), validate, () => {})
router.delete('/update/:id', () => {})

// BulletPoint
router.get('/bulletpoint', () => {})
router.get('/bulletpoint/:id', () => {})
router.put('/bulletpoint/:id', updateBulletPointRules(), validate, () => {})
router.post('/bulletpoint', bulletPointRules(), validate, () => {})
router.delete('/bulletpoint/:id', () => {})

export default router
