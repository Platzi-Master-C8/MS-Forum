
const express = require('express')

const router = express.Router()
const ContributionsService = require('../services/contributions.service')

const contributionsService = new ContributionsService()

router.get('/', async (req, res) => {
    
  const contributions = await contributionsService.find()
  res.json(contributions) 


})



router.get('/:discussionId', async (req, res, next) => {
    try {

      const { discussionId } = req.params
      const contribution = await contributionsService.findByDiscussionId(parseInt(discussionId))
      res.json(contribution)

    } catch (error) {
      next(error)
    }
  })
  router.get('/:discussionId/comments', async (req, res, next) => {
    try {

      const { discussionId } = req.params
      const contribution = await contributionsService.findByContributionTypeId(parseInt(discussionId),1)
      res.json(contribution)

    } catch (error) {
      next(error)
    }
  })
  router.get('/:discussionId/questions/', async (req, res, next) => {
    try {

      const { discussionId } = req.params
      const contribution = await contributionsService.findByContributionTypeId(parseInt(discussionId),2)
      res.json(contribution)

    } catch (error) {
      next(error)
    }
  })

  router.post('/', async (req, res, next) => {
    try {

    const body = req.body
    const contribution = await contributionsService.create(body)
    res.json(contribution)
    }
    catch (error) {
      next(error)
    }
  })

  router.patch('/:Id', async (req, res) => {
    try {
      const { discussionId } = req.params
      const body = req.body
      const contribution = await contributionsService.update(parseInt(discussionId), body)
      res.json(contribution)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  
  })
  
  router.delete('/:Id', async (req, res) => {
    const { discussionId } = req.params
    const contribution = await contributionsService.delete(parseInt(discussionId))
    res.json(contribution)
  })

  module.exports = router
