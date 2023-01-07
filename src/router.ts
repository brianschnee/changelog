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
import {
   createUpdate,
   deleteUpdate,
   getOneUpdate,
   getUpdates,
   updateUpdate
} from './handlers/update'

const router = Router()

// Product
router.get('/product', getProducts)
router.get('/product/:id', getOneProduct)
router.put('/product/:id', productRules(), validate, updateProduct)
router.post('/product', productRules(), validate, createProduct)
router.delete('/product/:id', deleteProduct)

// Update
router.get('/update', getUpdates)
router.get('/update/:id', getOneUpdate)
router.put('/update/:id', updateUpdateRules(), validate, updateUpdate)
router.post('/update', updateRules(), validate, createUpdate)
router.delete('/update/:id', deleteUpdate)

// BulletPoint
router.get('/bulletpoint', () => {})
router.get('/bulletpoint/:id', () => {})
router.put('/bulletpoint/:id', updateBulletPointRules(), validate, () => {})
router.post('/bulletpoint', bulletPointRules(), validate, () => {})
router.delete('/bulletpoint/:id', () => {})

export default router
