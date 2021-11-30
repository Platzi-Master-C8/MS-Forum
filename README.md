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
	"category": "Web Development",
	"created_at": "2012-04-23T18:25:43.511Z",
	"created_by": 1,
	"modified_at": null,
	"modified_by": null,
	"status": "Open",
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
	"category": "Web Development",
	"created_at": "2012-04-23T18:25:43.511Z",
	"created_by": 1,
	"modified_at": null,
	"modified_by": null,
	"status": "Open",
	"discussion_version_no": 1
}
```

## To Do



