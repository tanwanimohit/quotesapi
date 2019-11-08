const express = require('express');

const PORT = process.env.PORT || 3000
const app = express();

const Controller = require('./controllers')

app.set('view engine', 'ejs');
app.use(express.static('views'));

app
  .get('/', Controller.Home)
  .get('/categories', Controller.Categories)
  .get('/author', Controller.Author)
  .get('/:id', Controller.Quotes)

app.listen(PORT, () => {
  console.log(
    'Express server listening on port %d in %s mode',
    this.address().port,
    app.settings.env
  );
});