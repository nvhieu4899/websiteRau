const paginate = require('handlebars-paginate');
const Handlebars = require('hbs');
Handlebars.registerHelper('paginate', paginate);
Handlebars.registerHelper('switch', function(value, options) {
    this.switch_value = value;
    return options.fn(this);
});

Handlebars.registerHelper('case', function(value, options) {
    if (value == this.switch_value) {
        return options.fn(this);
    }
});
module.exports = Handlebars;