//Routing Mechanism - URL Define Here.
const express = require('express');

//Object of Express
const app = express();
app.use(express.static('views'));

//File Stream to Read Quotes from file
//I am not using db faster execution :p
var fs = require('fs');

app.get('/', (req, res) => {
  fs.readFile('quotes.db', function(err, buf) {
    var qarr = JSON.parse(buf);
    var random = Math.floor(Math.random() * (qarr.length - 1));
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send(qarr[random]);
  });
});

app.get('/categories', (req, res) => {
  fs.readFile('quotes.db', function(err, buf) {
	var query = [];
	var seenNames = {};
	var i=0;
    var qarr = JSON.parse(buf).map(function(n) {
      if(n.category in seenNames)
	  {
		  return null;
	  }
	  else
	  {
		  seenNames[n.category] = true;
		  query[i++]=n.category ;
		  return n.category;
	  }
	  
    });
	//console.log(seenNames);
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send(JSON.stringify(query));
  });
});


app.get('/author', (req, res) => {
  if (
    Object.entries(req.query).length !== 0 &&
    req.query.constructor === Object
  ) {
    let authorName = Object.keys(req.query);
    authorName = authorName.map(author => author.toLowerCase())[0];
    let dbData;
    let authorQuotes = [];
    fs.readFile('quotes.db', function(err, buf) {
      dbData = JSON.parse(buf);
      for (var i = 0; i < dbData.length; i++) {
        if (dbData[i]['author'].toLowerCase().indexOf(authorName) != -1) {
          authorQuotes.push(dbData[i]);
        }
      }
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Access-Control-Allow-Methods', 'GET');
      res.setHeader(
        'Access-Control-Allow-Headers',
        'X-Requested-With,content-type'
      );
      res.setHeader('Access-Control-Allow-Credentials', true);
      res.send(JSON.stringify(authorQuotes));
    });
    return;
  }
  fs.readFile('quotes.db', function(err, buf) {
	var query = [];
	var seenNames = {};
	var i=0;
    var qarr = JSON.parse(buf).map(function(n) {
      if(n.author in seenNames)
	  {
		  return null;
	  }
	  else
	  {
		  seenNames[n.author] = true;
		  query[i++]=n.author ;
		  return n.author;
	  }
	  
    });
	//console.log(seenNames);
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.send(JSON.stringify(query));
  });
});


app.get('/:id', (req, res) => {
  fs.readFile('quotes.db', function(err, buf) {
    var qarr = JSON.parse(buf).filter(function(n) {
      return n.category === req.params.id;
    });
	//console.log(qarr.length);
    var random = Math.floor(Math.random() * (qarr.length));
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    if(qarr[random]==undefined)
	{
		res.send({});
	}
	else res.send(qarr[random]);
  });
});

//Httpserver Port Number 3000.
app.listen(process.env.PORT || 3000, function() {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env
  );
});

//Set The File Type To App As EJS.
app.set('view engine', 'ejs');
