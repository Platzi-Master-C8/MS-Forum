

const Postgres = require('../libs/postgres')

const {models}= require ('./../libs/sequelize')

class ContributionsService {

  constructor(){

    this.contributions = []

    this.client = new Postgres();

    this.generate()
  }

  generate() {


   
  }


  async create(data) {

       

      const newContribution= await models.Contribution.create(data)
      return newContribution
      

  }

  async find() {
    const allContributions= await models.Contribution.findAll()
    const allContributionsUsers = await Promise.all(
      allContributions.map(async function(contribution) {
        const userName = await models.Users.findByPk(contribution.dataValues.userId);
        return {...contribution.dataValues,
                userFullName: userName.dataValues.fullName,
                profileImage: userName.dataValues.profileImage}
    }));
    return allContributionsUsers
    
  }

  async findById(id) {
    const contribution = await models.Contribution.findByPk(id)
    if (!contribution) {
      throw new Error('contribution not found')
    }
    const userName = await models.Users.findByPk(contribution.dataValues.userId);
    return {...contribution.dataValues,
            userFullName: userName.dataValues.fullName,
            profileImage: userName.dataValues.profileImage}
  }

  async findByDiscussionId(discussionId) {
    const contribution = await models.Contribution.findAll({
      where: {
        discussionId: discussionId
      }
    })
    if (!contribution) {
      throw new Error('contribution not found')
    }
    const allContributionsUsers = await Promise.all(
      contribution.map(async function(contribution) {
        const userName = await models.Users.findByPk(contribution.dataValues.userId);
        return {...contribution.dataValues,
                userFullName: userName.dataValues.fullName,
                profileImage: userName.dataValues.profileImage}
    }));
    return allContributionsUsers
  }

  async findByContributionTypeId(discussionId,contributionTypeId) {
    const contribution = await models.Contribution.findAll({
      where: {
        discussionId: discussionId,
        contributionTypeId: contributionTypeId
      }
    })
    if (!contribution) {
      throw new Error('contribution not found')
    }
    const allContributionsUsers = await Promise.all(
      contribution.map(async function(contribution) {
        const userName = await models.Users.findByPk(contribution.dataValues.userId);
        return {...contribution.dataValues,
                userFullName: userName.dataValues.fullName,
                profileImage: userName.dataValues.profileImage}
    }));
    return allContributionsUsers
  }

  async update(id,changes) {
    const contribution = await this.findById(id)
    const answer = await contribution.update(changes)
    return answer
  }

  async delete(id) {
    const contribution = await this.findById(id)
    if (!contribution) {
      throw new Error('contribution not found')
    }
    await contribution.destroy()
    return {id}
  }
  async nextId() {

    return this.contributions.length + 1

  }
  

}


module.exports = ContributionsService

