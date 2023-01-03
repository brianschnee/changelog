import { User } from '@prisma/client'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export const comparePasswords = (password: string, hash: string) => {
   return bcrypt.compare(password, hash)
}

export const hashPassword = (password: string) => {
   return bcrypt.hash(password, 10)
}

export const createJWT = (user: User) => {
   const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET!
   )
   return token
}

export const authenticate: RequestHandler = (req, res, next) => {
   const bearer = req.headers.authorization

   if (!bearer) {
      res.status(401).json({ message: 'Not authorized' })
      return
   }

   const [, token] = bearer.split(' ')

   if (!token) {
      res.status(401).json({ message: 'Not authorized' })
      return
   }

   try {
      const user = jwt.verify(token, process.env.JWT_SECRET!) as Pick<
         User,
         'id' | 'username'
      >
      req.user = user

      next()
   } catch (e) {
      console.error(e)
      res.status(401).json({ message: 'Invalid token provided' })
   }
}
