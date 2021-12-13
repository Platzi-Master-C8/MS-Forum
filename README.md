# MS-Forum
This backend API is used as an interface for Forum interaction with backend. 

## Steps to run & deploy
### Load and Connect Database

### Running in dev
For running your server in dev environment please use the following command: 

    npm run dev
 If everything is correct you will receive following message in console: 
 

    Server listening on port 3000
port 3000 is the default port and it is not yet configurable.

### Running in Production
For running your server in dev environment please use the following command: 

    npm run start
 If everything is correct you will receive following message in console: 
 

    Server listening on port 3000
port 3000 is the default port and it is not yet configurable.

## Business Logic


## Endpoints
### Get Discussions
You can get a list of all products using endpoint `/api/discussions`by a GET HTTP Request, this list is used typically by the FrontEnd for picking values. 

### Get Discussion by Id
You can get a list of all invoices using endpoint `/api/discussions/{id}` by a GET HTTP Request, this list can be used to access to a particular discussion id, it will always retrieve last version created in database. Below is a JSON example of this request answer: 


```json
{ 
	"id": 1, 
	"title": "Example Title",
	"content": "Example Content",
	"category": 1,
	"created_at": "2012-04-23T18:25:43.511Z",
	"created_by": 1,
	"modified_at": null,
	"modified_by": null,
	"status": 1,
	"discussion_version_no": 1
}
```
### Create a new discussion
You can create a new discussion using endpoint `/api/discussions/create` by a POST HTTP request with following body: 
```json
{  
	"title": "Example Title",
	"content": "Example Content",
	"category": 1,
}
```
This will return the created discussion with void comments as: 
```json
{ 
	"id": 1, 
	"title": "Example Title",
	"content": "Example Content",
	"category": 1,
	"created_at": "2012-04-23T18:25:43.511Z",
	"created_by": 1,
	"modified_at": null,
	"modified_by": null,
	"status": 1,
	"discussion_version_no": 1
}
```
### Get all discussion likes
You can get a list of all products using endpoint `/api/likes/discussions` by a GET HTTP Request, this list is used typically by the FrontEnd for picking values. It retrieves a list of JSON objects with likes details:

```json
[{  
	"id": 1, 
    "discussionId": 1,
    "likedAt": "2012-04-23T18:25:43.511Z",
    "userId": 1,
    "isActive": true
}
,
{  
	"id": 2, 
    "discussionId": 1,
    "likedAt": "2012-04-23T18:25:43.511Z",
    "userId": 2,
    "isActive": true
}
,
{  
	"id": 3, 
    "discussionId": 1,
    "likedAt": "2012-04-23T18:25:43.511Z",
    "userID": 3,
    "isActive": true
},
{  
	"id": 4, 
    "discussionId": 2,
    "likedAt": "2012-04-23T18:25:43.511Z",
    "userId": 2,
    "isActive": true
}]	
```

### Give like/unlike to a discussion
You can give like to an existing discussion using endpoint `/api/likes/discussions` by a POST HTTP request with following body: 
```json
{  
	"discussionId": 1,
	"user_id": 2
}	
```
This will return the created like as: 
```json
{ 
	"id": 1, 
    "discussionId": 1,
    "likedAt": "2012-04-23T18:25:43.511Z",
    "userId": 2,
    "isActive": true,
    "currentdiscussionLikes": 2
}
```
if the like is already created, isActive will be false.

### Get likes for a discussion and user
You can give like to an existing discussion using endpoint `/api/likes/discussions` by a GET HTTP request. This can be filtered using params :
`discussionId` -> optional param
`userId` -> optional param
`groupBy` -> optional param

if `userId`  is  present (`/api/likes/discussions?userId=2`) then this will return the like as:
 
```json
[{  
	"id": 1, 
    "discussionId": 1,
    "likedAt": "2012-04-23T18:25:43.511Z",
    "userId": 2,
    "isActive": true,
    "currentdiscussionLikes": 3
},
{ 
	"id": 4, 
    "discussionId": 2,
    "likedAt": "2012-04-23T18:25:43.511Z",
    "userId": 2,
    "isActive": true,
    "currentdiscussionLikes": 1
}]
```

if `groupBy` is present and it corresponds to a JSON object property (`/api/likes/discussions?userId=2&groupBy='discussionId'`) then endpoint will return the like as: 

```json
[{  
	
    "discussionId": 2,
    "count": 1
},
{
      
	
    "discussionId": 1,
    "count": 3

}


```
if `discussionId` is present and it corresponds to a JSON object property (`/api/likes/discussions?discussionId=1`) then endpoint will return the like as:

```json
[{  
	"id": 1, 
    "discussionId": 1,
    "likedAt": "2012-04-23T18:25:43.511Z",
    "userId": 1,
    "isActive": true,
    "currentdiscussionLikes": 3
}
,
{  
	"id": 2, 
    "discussionId": 1,
    "likedAt": "2012-04-23T18:25:43.511Z",
    "userId": 2,
    "isActive": true,
    "currentdiscussionLikes": 3
}
,
{  
	"id": 3, 
    "discussionId": 1,
    "likedAt": "2012-04-23T18:25:43.511Z",
    "userID": 3,
    "isActive": true,
    "currentdiscussionLikes": 3
}]

```

Also you can use `groupBy` to obtain the count of every discussion (`/api/likes/discussions?groupBy=discussionId`) the endpoint will return:

```json
[{  
	
    "discussionId": "1",
    "count": 3
}
,
{  
	
    "discussionId": "2",
    "count":1
}
]

```




if nothing is found, then you will receive a 404 HTTP status. 
## To Do



