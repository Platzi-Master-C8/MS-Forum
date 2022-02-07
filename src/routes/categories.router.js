const express = require('express')

const router = express.Router()
const CategoriesService = require('../services/categories.service')

const categoriesService = new CategoriesService()

router.get('/', async (req, res) => {
  try{
  
    const category = await categoriesService.find()
    res.json(category) 

  }catch(error){
    res.status(404).json({
      message: error.message
    })
  }
  


})

router.get('/:id', async (req, res, next) => {
    try {

      const { id } = req.params
      const category = await categoriesService.findById(parseInt(id))
      res.json(category)

    } catch (error) {
      next(error)
    }
  })

  module.exports = router