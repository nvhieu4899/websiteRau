const paginate = require('handlebars-paginate');
const Handlebars = require('hbs');
Handlebars.registerHelper('paginate', paginate);
module.exports = Handlebars;