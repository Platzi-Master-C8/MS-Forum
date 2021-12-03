const express = require('express')

const router = express.Router()
const DiscussionsService = require('../services/discussions.service')

const discussionsService = new DiscussionsService()

router.get('/', async (req, res) => {
    
  const discussions = await discussionsService.find()
  res.json(discussions) 


})


router.get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const discussion = await discussionsService.findById(parseInt(id))
      res.json(discussion)

    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (req, res) => {
    const body = req.body
    const discussion = await discussionsService.create(body)
    res.json(discussion)
  })

  router.patch('/:id', async (req, res) => {
    try {
      const { id } = req.params
      const body = req.body
      const discussion = await discussionsService.update(parseInt(id), body)
      res.json(discussion)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  
  })
  
  router.delete('/:id', async (req, res) => {
    const { id } = req.params
    const discussion = await discussionsService.delete(parseInt(id))
    res.json(discussion)
  })

  module.exports = router