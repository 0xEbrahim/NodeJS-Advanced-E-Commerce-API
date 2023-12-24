import express from 'express'
import {createCategory, getCategory} from '../services/categoryServices.js'
const router = express.Router();

router.route('/')
.post(createCategory)
.get(getCategory)

export default router