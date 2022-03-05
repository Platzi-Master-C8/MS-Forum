
const express = require('express')
const utils = require('../helpers/utils')
const router = express.Router()
const DiscussionsService = require('../services/discussions.service')

const discussionsService = new DiscussionsService()

router.get('/', async (req, res) => {
  try{
    const query= req.query
  
    const discussions = await discussionsService.find(query)
    res.json(discussions) 

  }catch(error){
    res.status(404).json({
      message: error.message
    })
  }
  


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

  router.post('/', async (req, res,next) => {
    try {
    const token = req.headers['authorization']
    const body = req.body

    if (!token){
      return res.status(400).json({
        message: 'token is required'
      })
    }
    const user = await utils.getUser(token)
    if (!user){
      return res.status(400).json({
        message: 'token is invalid'
      })
    }
    if (typeof body.userId === 'string') {
      body.userId = parseInt(body.userId)
    }
    if (typeof body.categoryId === 'string') {
      body.categoryId = parseInt(body.categoryId)
    }
    body.userId = user.id
    const discussion = await discussionsService.create(body)
    res.json(discussion)
    }
    catch (error) {
      next(error)
    }
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
