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
    

    const like = await models.DiscussionLikes.findOne({ where: {discussionId: discussionIdBody, userId: userIdBody}});
    

    if (like === null){
      const newLike = await models.DiscussionLikes.create( {discussionId: discussionIdBody, userId: userIdBody});
      const countdiscussionLikesUpdate = await models.DiscussionLikes.count({where: {discussionId: discussionIdBody, isActive: true}});
      return {...newLike.dataValues,
              currentdiscussionLikes: countdiscussionLikesUpdate
      }
    }
    

    const rta = await like.update({isActive: !like.dataValues.isActive});
    const countdiscussionLikes = await models.DiscussionLikes.count({where: {discussionId: discussionIdBody, isActive: true}});
    return {
      ...rta.dataValues,

      currentdiscussionLikes: countdiscussionLikes

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

    const rta = await models.DiscussionLikes.findByPk(id);

    return rta;

  }

  async findDiscussionLikes() {

    const rta = await models.DiscussionLikes.findAll();

    return rta;
  }

  async findUserLikes(userId) {

    const LikesByUserFiltered = await models.DiscussionLikes.findAll({ where: {userId: userId}});
    const LikesByUserTotal = await Promise.all(
      LikesByUserFiltered.map(async function(like) {
        const countdiscussionLikes = await models.DiscussionLikes.count({where: {discussionId: like.dataValues.discussionId}});

        return {...like.dataValues,
                currentdiscussionLikes: countdiscussionLikes}
    }));
    return LikesByUserTotal;
  }

  async findByDiscussionId(discussionId, userId=0){
    let discussionLikesFiltered;
    let countdiscussionLikes; 
    if (userId===0){

      discussionLikesFiltered = await models.DiscussionLikes.findAll({ where: {discussionId: discussionId}});
      
      const newDiscussionLikesFiltered = await Promise.all(
        discussionLikesFiltered.map(async function(like) {
          const countdiscussionLikes = await models.DiscussionLikes.count({where: {discussionId: discussionId}});

          return {...like.dataValues,
                  currentdiscussionLikes: countdiscussionLikes}
      }));

      return newDiscussionLikesFiltered;
    }
    else{

      discussionLikesFiltered = await models.DiscussionLikes.findOne({ where: {discussionId: discussionId, userId: userId}});
      countdiscussionLikes = await models.DiscussionLikes.count({where: {discussionId: discussionId}});


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