const {models}= require ('./../libs/sequelize')

class CategoriesService {

  constructor(){
    this.categories = [];
  }

  async create(data) {

      const newCategory = await models.Category.create(data);
      return newCategory;

  }

  async find() {
    const options = {
      where: {
        isActive: true
      }
    };

    const allCategories= await models.Category.findAll(options);
    
    return allCategories;
    
  }

  async findById(id) {
    const options = {
      where : {
        categoryId: id,
        },
      };

    const discussions = await models.Discussion.findAll(options);
    if (!discussions) {
      throw new Error('discussion not found')
    }
    
    return discussions;
  }

}


module.exports = CategoriesService