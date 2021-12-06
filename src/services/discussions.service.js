const faker = require('faker');
const {getRandomIntInclusive} = require('../helpers/utils');

class DiscussionsService {

  constructor(){
    this.discussions = [];
    this.generate();
  }

  generate() {
    const limit = 100;
    for (let index = 0; index < limit; index++) {
      this.discussions.push({
         
            "id": index, 
            "title": faker.hacker.phrase(),
            "content": faker.hacker.phrase(),
            "category": getRandomIntInclusive(1,6),
            "created_at":faker.date.recent(),
            "created_by": getRandomIntInclusive(1,200),
            "modified_at": null,
            "modified_by": null,
            "status": 1,
            "is_active": getRandomIntInclusive(0,1) ? true : false,
            "discussion_version_no": 1
        
      });
    }
  }

  create(data) {
    const title = data.title;
    const content = data.content;
    const category = data.category;
    //const created_at = data.created_at;
    const created_by = data.created_by;
    //const modified_at = data.modified_at;
    //const modified_by = data.modified_by;
    //const status = data.status;
    //const is_active = data.is_active;
    //const discussion_version_no = data.discussion_version_no;

    const discussionData = {
        title: title,
        content: content,
        category: category,
        created_at: Date.now(),
        created_by: created_by,
        modified_at: null,
        modified_by: null,
        status: 1,
        is_active: true,
        discussion_version_no: 1
    }
    const newDiscussion = {
        id: this.nextId(),
        ...discussionData,
      }
      this.discussions.push(newDiscussion);
      return newDiscussion;

  }

  find() {
    return this.discussions;
  }

  findById(id) {
    return this.discussions.find(item => item.id === id);
  }

  update(id,changes) {
    const index = this.discussions.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('discussion not found');
    }
    const discussion = this.discussions[index];
    this.discussions[index] = {
      ...discussion,
      ...changes,
        modified_at:Date.now(),
        modified_by: 1,
        status:2
    };
    return this.discussions[index];
  }

  delete(id) {
    const index = this.discussions.findIndex(item => item.id === id);
    if (index === -1) {
      throw new Error('discussion not found');
    }
    this.discussions.splice(index, 1);
    return { id };
  }
  nextId() {
    return this.discussions.length + 1;
  }
  

}

module.exports = DiscussionsService;