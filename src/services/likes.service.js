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

    const discussionIdBody = data.discussionId
    const userIdBody = data.userId
    
    const like = await models.Likes.findOne({ where: {discussionId: discussionIdBody, likedBy: userIdBody}});
    const countdiscussionLikes = await models.Likes.count({where: {discussionId: discussionIdBody}});

    if (like === null){
      const newLike = await models.Likes.create({isActive: true, likedAt: new Date(), discussionId: discussionIdBody, likedBy: userIdBody});
      return {...newLike.dataValues,
              currentdiscussionLikes: countdiscussionLikes+1
      }
    }

    const rta = await like.update({isActive: !like.dataValues.isActive});

    return {
      ...rta.dataValues,
      currentdiscussionLikes: rta.dataValues.isActive ? countdiscussionLikes+1: countdiscussionLikes-1
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
    const rta = await models.Likes.findByPk(id);
    return rta;

  }

  async findDiscussionLikes() {
    const rta = await models.Likes.findAll();
    return rta;
  }

  async findUserLikes(userId) {
    const LikesByUserFiltered = await models.Likes.findAll({ where: {likedBy: userId}});
    const LikesByUserTotal = await Promise.all(
      LikesByUserFiltered.map(async function(like) {
        const countdiscussionLikes = await models.Likes.count({where: {discussionId: like.dataValues.discussionId}});
        return {...like.dataValues,
                currentdiscussionLikes: countdiscussionLikes}
    }));
    return LikesByUserTotal;
  }

  async findByDiscussionId(discussionId, userId=0){
    let discussionLikesFiltered;
    let countdiscussionLikes; 
    if (userId===0){
      discussionLikesFiltered = await models.Likes.findAll({ where: {discussionId: discussionId}});
      
      const newDiscussionLikesFiltered = await Promise.all(
        discussionLikesFiltered.map(async function(like) {
          const countdiscussionLikes = await models.Likes.count({where: {discussionId: discussionId}});
          return {...like.dataValues,
                  currentdiscussionLikes: countdiscussionLikes}
      }));

      return newDiscussionLikesFiltered;
    }
    else{
      discussionLikesFiltered = await models.Likes.findOne({ where: {discussionId: discussionId, likedBy: userId}});
      countdiscussionLikes = await models.Likes.count({where: {discussionId: discussionId}});

      return {...discussionLikesFiltered.dataValues,
        currentdiscussionLikes: countdiscussionLikes
      }
    }
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