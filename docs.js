const Docs = require('express-api-doc');
const app = require('./server'); // your app.js
const docs = new Docs(app);
docs.generate({
  path:     './docs/template.html',
});
