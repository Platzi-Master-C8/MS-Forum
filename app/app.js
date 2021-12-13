const express = require('express');
const routerApi = require('./routes');

const app = express();
const port = 3001;


routerApi(app);


app.listen(port, () => {
  console.log('App listening on port: ' +  port);
});

