import { RequestHandler, Request, Response, response } from 'express'
import prisma from '../utils/db'

// Get all
export const getProducts: RequestHandler = async (req, res) => {
   if (!req.user) {
      res.status(400).json({ message: 'No user sent with request' })
      return
   }

   const user = await prisma.user.findUnique({
      where: {
         id: req.user.id,
      },
      include: {
         products: true,
      },
   })

   res.json({ data: user?.products })
}

// Get one
export const getOneProduct: RequestHandler = async (req, res) => {
   const product = await prisma.product.findUnique({
      where: {
         id: req.params.id,
      },
   })

   res.json({ data: product })
}

// Create one
export const createProduct: RequestHandler = async (req, res) => {
   if (!req.user) {
      res.status(400).json({ message: 'No user sent with request' })
      return
   }

   const product = await prisma.product.create({
      data: {
         name: req.body.name,
         userId: req.user.id,
      },
   })

   res.json({ data: product })
}

// Update product
export const updateProduct: RequestHandler = async (req, res) => {
   if (!req.user) {
      res.status(400).json({ message: 'No user sent with request' })
      return
   }

   const updated = await prisma.product.update({
      where: {
         id_userId: {
            id: req.params.id,
            userId: req.user.id,
         },
      },
      data: {
         name: req.body.name,
      },
   })

   res.json({ data: updated })
}

// delete product
export const deleteProduct: RequestHandler = async (req, res) => {
   if (!req.user) {
      res.status(400).json({ message: 'No user sent with request' })
      return
   }

   const deleted = await prisma.product.delete({
      where: {
         id_userId: {
            id: req.params.id,
            userId: req.user.id,
         },
      },
   })

   res.json({ data: deleted })
}
