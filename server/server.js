const express = require('express');

const app = express();

const PORT = 8082;

var path = require("path");
const request = require('request');

app.use(express.static('./dist/mancala'));

app.post('/newgame', (req, res) => {
  var post_options = {
    url: 'http://localhost:8014/newgame ',
    headers: {
      'Content-Type': 'application/json'
    },
    body: req
  };
  request.post(post_options, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res
        .header('')
        .status(response.statusCode)
        .json(JSON.parse(response.body));
    }
  });
});

app.get('/joingame', (req, res) => {
  request.get('http://localhost:8014/joingame/'+ req.query.gameId, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res
        .header('')
        .status(response.statusCode)
        .json(JSON.parse(response.body));
    }
  });
});

app.get('/refreshgame', (req, res) => {
  request.get('http://localhost:8014/refresh/'+ req.query.gameId, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res
        .header('')
        .status(response.statusCode)
        .json(JSON.parse(response.body));
    }
  });
});
app.put('/updateMancalaData', (req, res) => {
  console.log('put mancala');
  var put_options = {
    url: 'http://localhost:8014/execute ',
    headers: {
      'Content-Type': 'application/json'
    },
    body: req
  };
  request.put(put_options, (error, response) => {
    if (error) {
      res.send(error);
    } else {
      res
        .header('')
        .status(response.statusCode)
        .json(JSON.parse(response.body));
    }
  });
});

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});


