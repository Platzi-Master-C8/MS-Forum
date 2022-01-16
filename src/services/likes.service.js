const faker = require('faker')
const {getRandomIntInclusive} = require('../helpers/utils')

const { models } = require('./../libs/sequelize');

class LikesService {

  constructor(){
    this.discussionLikes = []
    this.generate()
  }

  generate() {
    const limit = 100
    for (let index = 0 ;index < limit; index++) {
      this.discussionLikes.push({
         
        
          "id": index+1, 
          "discussionId": getRandomIntInclusive(0,99),
          "likedAt": new Date(faker.date.recent()),
          "userId": getRandomIntInclusive(1,200),
          "isActive": getRandomIntInclusive(0,1) ? true : false
        
        
      })
    }
  }

  async giveLike(data){

    const discussionId = data.discussionId
    
    const userId= data.userId
    
    const index= this.discussionLikes.findIndex(like => like.discussionId=== discussionId && like.userId===userId)
    
    const currentdiscussionLikes = this.discussionLikes.filter(like => like.discussionId=== discussionId && like.isActive).length
    
    if (index===-1)
    {
      return {...this.create(data),
              currentdiscussionLikes:currentdiscussionLikes+1  
      }
    }

    this.discussionLikes[index]= {
      ...this.discussionLikes[index],
      isActive : !this.discussionLikes[index].isActive
    }

    return {
      ...this.discussionLikes[index],
      currentdiscussionLikes: this.discussionLikes[index].isActive ? currentdiscussionLikes+1: currentdiscussionLikes-1
    }

  }

  async create(data) {
    
    const discussionId = data.discussionId
    
    const userId= data.userId
    
    
    const likeData = {
      discussionId: discussionId,
      likedAt: new Date(),
      userId: userId,
      isActive: true
    }
    const newlike = {
        id: await this.nextId(),
        ...likeData,
      }
      this.discussionLikes.push(newlike)


      return newlike


  }

  async find() {
    return this.discussionLikes
  }

  async findById(id){
    const filteredDiscussionLikes= this.discussionLikes.filter(like => like.id ===id)
    return this.currentdiscussionLikes(filteredDiscussionLikes,"discussionId")
    }

  async findDiscussionLikes() {
    return this.discussionLikes
  }

  async findUserLikes(userId) {
    
    const filteredDiscussionLikes= this.discussionLikes.filter(like =>like.userId === userId)
    return this.currentdiscussionLikes(filteredDiscussionLikes,"discussionId")
  }

  async findByDiscussionId(discussionId, userId=0){
    let discussionLikesFiltered 
    if (userId===0){
      discussionLikesFiltered = this.discussionLikes.filter(like => like.discussionId === discussionId)
    }
    else{
      discussionLikesFiltered = this.discussionLikes.filter(like => like.discussionId === discussionId && like.userId === userId)
    }
    
    return this.currentdiscussionLikes(discussionLikesFiltered,"discussionId")
  }

  filterActivelikes(likes){
    return likes.filter(like => like.isActive)
  }

  async update(id,changes) {
    const index = this.discussionLikes.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('like not found')
    }
    const like = this.discussionLikes[index]
    this.discussionLikes[index] = {
      ...like,
      ...changes,
        
    }
    return this.discussionLikes[index]
  }

  async delete(id) {
    const index = this.discussionLikes.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('like not found')
    }
    this.discussionLikes[index].isActive= !this.discussionLikes[index].isActive
    return { id }
  }
  async nextId() {
    return this.discussionLikes.length + 1
  }
  
  async currentdiscussionLikes(likes,column){
    
    return likes.map(like => like = 
      {
        ...like, 
        currentdiscussionLikes:this.discussionLikes.filter(l => l[column]=== like[column] && l.isActive).length
      })
  }

}

module.exports = LikesService