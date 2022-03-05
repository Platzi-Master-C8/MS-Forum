
const express = require('express')
const { groupBy,countObjectValues } = require('../helpers/utils')

const router = express.Router()
const LikesService = require('../services/likes.service')

const likesService = new LikesService()

router.get('/discussions', async (req, res,next) => {
 try{
    const query = {
        
        userId: req.query.userId,
        groupBy: req.query.groupBy,
        discussionId: req.query.discussionId
      }   
    //just return active discussionLikes    
    let likes = {}
    
    if (typeof query.discussionId !=='undefined' && typeof query.userId !=='undefined'){
      likes = await likesService.findByDiscussionId(parseInt(query.discussionId),parseInt(query.userId))  
    }else if (typeof query.discussionId !=='undefined') {
      likes = await likesService.findByDiscussionId(parseInt(query.discussionId))
    }
    else if (typeof query.userId !=='undefined') {
      likes = await likesService.findUserLikes(parseInt(query.userId))
    } else{
      likes = await likesService.findDiscussionLikes()
    }

    let likesCount = likes
    if (typeof query.groupBy !== 'undefined'){
        likes = groupBy(likes, query.groupBy)
        likesCount= countObjectValues(likes,query.groupBy)
    }

    res.json(likesCount) 

    }catch (error) {
        next(error)
    }

})

router.get('/users', async (req, res,next) => {
    try{
      //const { id } = req.params
        const query = {
        
            userId: req.query.userId,
            groupBy: req.query.groupBy
          } 

        let likes = await likesService.findUserLikes(parseInt(query.userId))
        


        if (typeof query.groupBy !== 'undefined'){
            likes = groupBy(likes, query.groupBy)

        }
        
        
        res.json(likes) 
    }
    catch (error) {
        next(error)
    }
    
  
  
  })


router.get('/discussions/:id', async (req, res, next) => {
    try {
      const { id } = req.params
      const query = {
        discussionId: req.query.discussionId,
        userId: req.query.userId,
        groupBy: req.query.groupBy
      }
      let likes = {}
      
      if (typeof query.discussionId !=='undefined' && typeof query.userId !=='undefined'){
        likes = await likesService.findByDiscussionId(parseInt(query.discussionId),parseInt(query.userId))  
      }else if (typeof query.discussionId !=='undefined') {
        likes = await likesService.findByDiscussionId(parseInt(query.discussionId))
      }
      else if (typeof query.userId !=='undefined') {
        likes = await likesService.findUserLikes(parseInt(query.userId))
      }
      else{
        likes = await likesService.findById(id)
      }
      
      let likesCount = likes
    if (typeof query.groupBy !== 'undefined'){
        likes = groupBy(likes, query.groupBy)
        likesCount= countObjectValues(likes,query.groupBy)
    }
      res.json(likesCount)

    } catch (error) {
      next(error)
    }
  })

  

  router.post('/discussions', async (req, res,next) => {
    
    try {
    const body = req.body

    const like = await likesService.giveLike(body)
    res.json(like)
    }
    catch (error) {
      next(error)
    }
  })

  router.patch('/discussions/:id', async (req, res) => {
    try {
      const { id } = req.params
      const body = req.body
      const like = await likesService.update(parseInt(id), body)
      res.json(like)
    } catch (error) {
      res.status(404).json({
        message: error.message
      })
    }
  
  })
  
  router.delete('/discussions/:id', async (req, res) => {
    const { id } = req.params
    const like = await likesService.delete(parseInt(id))
    res.json(like)
  })

  module.exports = router