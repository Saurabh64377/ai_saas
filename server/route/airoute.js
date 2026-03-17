import {Router} from 'express'
import { auth } from '../middleware/auth.js'
import { generateArticle } from '../controllers/aiContoller.js'

const aiRouter = Router()


aiRouter.post('/generate-article' ,auth , generateArticle)

export default aiRouter