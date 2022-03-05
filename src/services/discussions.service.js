
const faker = require('faker')
const {getRandomIntInclusive} = require('../helpers/utils')

const dummyJson = require('../tests/dummy-data.json')
const Postgres = require('../libs/postgres')

const {models}= require ('./../libs/sequelize')
const { DiscussionLikes } = require('../db/models/likes.model')
const{Sequelize} = require('sequelize');

class DiscussionsService {

  constructor(){

    this.discussions = []

    this.client = new Postgres();

    this.generate()
  }

  generate() {


    dummyJson.demo_discussions.forEach(item => {
      
      const discussionData = {
        id: this.nextId(),
        ...item,
        "category": getRandomIntInclusive(1,3),
        "created_at":new Date(faker.date.recent()),
        "created_by": getRandomIntInclusive(1,200),
        "modified_at": null,
        "modified_by": null,
        "status": 1,
        "is_active": true,
        "discussion_version_no": 1
       }
       this.discussions.push(discussionData)
      })

    const limit = 100
    for (let index = 0 ; index < limit ; index++) {

      this.discussions.push({
         

            "id": this.nextId(), 
            "title": faker.hacker.phrase(),
            "content": faker.hacker.phrase(),
            "category": getRandomIntInclusive(1,3),
            "created_at":new Date(faker.date.recent()),
            "created_by": getRandomIntInclusive(1,200),
            "modified_at": null,
            "modified_by": null,
            "status": 1,
            "is_active": getRandomIntInclusive(0,1) ? true : false,
            "discussion_version_no": 1
        

      })

    }
  }
 

  async create(data) {

    
    

      const newDiscussion= await models.Discussion.create(data)
      return newDiscussion
      

  }

  async find(query) {
    const options = {
      /*attributes: { 
        include: [[Sequelize.fn("COUNT", Sequelize.col("likes")), 'likesCount']]
      },
    */

      include: ['likes'],
      where: {
        isActive: true,
        //counts the number of likes for each discussion+
        
        
      },
      order: [
        ['createdAt', 'DESC']
      ],
      
    }
    const {limit, offset} = query

    if (limit && offset) {
      options.offset = offset
      options.limit = limit
    }
    const discussionsCount = await models.Discussion.count({where: {isActive: true}})
    let allDiscussions= (await models.Discussion.findAndCountAll(options))
    allDiscussions.rows = allDiscussions.rows.map(item => {
        item.dataValues.likes = item.dataValues.likes.filter(like => like.isActive).length
       
        return item})
    
    allDiscussions.count = discussionsCount

    
    return allDiscussions
    
  }

  async findById(id) {
    const discussion = await models.Discussion.findByPk(id)
    if (!discussion) {
      throw new Error('discussion not found')
    }
    return discussion
  }

  async update(id,changes) {
    const discussion = await this.findById(id)
    const answer = await discussion.update(changes)
    return answer
  }

  async delete(id) {
    const discussion = await this.findById(id)
    if (!discussion) {
      throw new Error('discussion not found')
    }
    await discussion.destroy()
    return {id}
  }
  async nextId() {

    return this.discussions.length + 1

  }
  

}


module.exports = DiscussionsService

