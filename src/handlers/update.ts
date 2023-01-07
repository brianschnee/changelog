import prisma from '../utils/db'
import { RequestHandler } from 'express'
import { Update } from '@prisma/client'

export const getOneUpdate: RequestHandler = async (req, res) => {
   const update = await prisma.update.findUnique({
      where: {
         id: req.params.id
      }
   })

   console.log(update)

   res.status(200).json({ data: update })
}

export const getUpdates: RequestHandler = async (req, res) => {
   if (!req.user) {
      res.status(400).json({ message: 'No user sent with request' })
      return
   }

   try {
      const products = await prisma.product.findMany({
         where: {
            userId: req.user.id
         },
         include: {
            updates: true
         }
      })

      if (!products) throw new Error('No products found')

      const updates = products.reduce((allUpdates: Update[], product) => {
         return [...allUpdates, ...product.updates]
      }, [])

      res.status(200).json({ data: updates })
   } catch (e) {
      console.error(e)
      res.status(400).json({ message: e })
   }
}

export const createUpdate: RequestHandler = async (req, res) => {
   try {
      const product = await prisma.product.findUnique({
         where: {
            id: req.body.productId
         }
      })

      if (!product) throw new Error('Product does not belong to you')

      const update = await prisma.update.create({
         data: {
            title: req.body.title,
            body: req.body.body,
            product: { connect: { id: product.id } }
         }
      })

      res.status(200).json({ data: update })
   } catch (e) {
      console.error(e)
      res.status(400).json({ message: e })
   }
}

export const updateUpdate: RequestHandler = async (req, res) => {
   if (!req.user) return res.status(400).json({ message: 'No user on request' })

   const products = await prisma.product.findMany({
      where: {
         userId: req.user.id
      },
      include: {
         updates: true
      }
   })

   if (!products) return res.status(400).json({ message: 'No products found' })

   const updates = products.reduce((allUpdates: Update[], product) => {
      return [...allUpdates, ...product.updates]
   }, [])

   const match = updates.find((update) => update.id === req.params.id)

   if (!match)
      return res.status(400).json({ message: 'No updates match the id' })

   const update = await prisma.update.update({
      where: {
         id: req.params.id
      },
      data: req.body
   })

   res.status(200).json({ data: update })
}

export const deleteUpdate: RequestHandler = async (req, res) => {
   if (!req.user) return res.status(400).json({ message: 'No user on request' })

   const products = await prisma.product.findMany({
      where: {
         userId: req.user.id
      },
      include: {
         updates: true
      }
   })

   if (!products) return res.status(400).json({ message: 'No products found' })

   const updates = products.reduce((allUpdates: Update[], product) => {
      return [...allUpdates, ...product.updates]
   }, [])

   const match = updates.find((update) => update.id === req.params.id)

   if (!match)
      return res.status(400).json({ message: 'No updates match the id' })

   const deleted = await prisma.update.delete({
      where: {
         id: req.params.id
      }
   })

   res.status(200).json({ message: deleted })
}
