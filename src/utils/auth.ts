import { User } from '@prisma/client'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET ?? 'cookie'

export const createJWT = (user: User) => {
   const token = jwt.sign(user.id, JWT_SECRET)
   return token
}

export const authenticate = (
   req: Request,
   res: Response,
   next: NextFunction
) => {
   const bearer = req.headers.authorization

   if (!bearer) return res.status(401).json({ message: 'Not authorized' })

   const [, token] = bearer.split(' ')

   if (!token) return res.status(401).json({ message: 'Not authorized' })

   try {
      const user = jwt.verify(token, JWT_SECRET) as Pick<
         User,
         'id' | 'username'
      >
      req.user = user
      next()
   } catch (e) {
      console.error(e)
      return res.status(401).json({ message: 'Invalid token provided' })
   }
}
