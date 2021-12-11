function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
  }

function groupBy(data, key){

 // `data` is an array of objects, `key` is the key (or property accessor) to group by
    // reduce runs this anonymous function on each element of `data` (the `item` parameter,
    // returning the `storage` parameter at the end
    return data.reduce(function(storage, item) {
      // get the first instance of the key by which we're grouping
      const group = item[key]
      
      // set `storage` for this instance of group to the outer scope (if not empty) or initialize it
      storage[group] = storage[group] || []
      
      // add this item to its group within `storage`
      storage[group].push(item)
      
      // return the updated storage to the reduce function, which will then loop through the next 
      return storage 
    }, {}) // {} is the initial value of the storage
 
}

function countObjectValues(storage,columName)  {
  
  let result = []
  Object.entries(storage).forEach(([key, value]) => {
    
    const returnObject = {}
    if (columName === 'discussionId'){
      key= parseInt(key)
    }
    value= filterIsActive(value)
    returnObject[columName]= key
    returnObject["count"]= value.length
    
    result.push(returnObject)  
    
  })

  return result

}

function dataReviver(key, value)
{ 
  if (key === 'discussionId'){
    return parseInt(value)
  }
  if (key === 'likedAt') {
    return new Date(value)
  } else {
    return value

  }
}

function filterIsActive(data){
  return data.filter(item => item.isActive)
}

  module.exports = { getRandomIntInclusive, groupBy, countObjectValues, dataReviver  }

