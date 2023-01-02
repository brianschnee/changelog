import prisma from '../utils/db'
import { hashPassword, comparePasswords, createJWT } from '../utils/auth'
import { Request, Response } from 'express'

export const createNewUser = async (req: Request, res: Response) => {
   const user = await prisma.user.create({
      data: {
         username: req.body.username,
         password: await hashPassword(req.body.password),
      },
   })

   const token = createJWT(user)
   res.json({ token })
}

export const signIn = async (req: Request, res: Response) => {
   const user = await prisma.user.findUnique({
      where: {
         username: req.body.username,
      },
   })

   if (!user) return res.status(401).json({ message: 'Invalid user' })

   const isValid = await comparePasswords(req.body.password, user.password)

   if (!isValid) return res.status(401).json({ message: 'Invalid user' })

   const token = createJWT(user)
   res.json({ token })
}
