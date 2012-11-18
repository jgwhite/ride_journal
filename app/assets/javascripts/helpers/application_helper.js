Ember.Handlebars.registerHelper('calendarize', function(property, options) {
  return Ember.get(this, property).calendar();
});

Ember.Handlebars.registerHelper('momentFormat', function(property, options) {
  return Ember.get(this, property).format(options.hash.format);
});
