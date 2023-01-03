import { RequestHandler } from 'express'
import { body, validationResult } from 'express-validator'

// rules for properties existing on request object
export const productRules = () => {
   return body('name').exists().isString()
}

export const updateRules = () => {
   return [body('title').exists().isString(), body('body').exists().isString()]
}

export const updateUpdateRules = () => {
   return [
      body('title').optional(),
      body('body').optional(),
      body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']),
      body('version').optional()
   ]
}

export const bulletPointRules = () => {
   return [
      body('name').exists().isString(),
      body('description').exists().isString(),
      body('updateId').exists().isString()
   ]
}

export const updateBulletPointRules = () => {
   return [
      body('name').optional().isString(),
      body('description').optional().isString()
   ]
}

// if any rules werent met before reaching the handler, display errors
export const validate: RequestHandler = (req, res, next) => {
   const errors = validationResult(req)

   if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() })
      return
   }

   next()
}
