RideJournal.GPSField = Ember.View.extend({
  disabled: false,

  template: Ember.Handlebars.compile(
    '<input type="file" style="visibility: hidden; position: absolute">' +
    '<button class="btn">Upload GPS Data</button>'
  ),

  dragover: function(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  },

  drop: function(event) {
    event.preventDefault();
    this.readFile(event.dataTransfer.files[0]);
  },

  change: function(event) {
    this.readFile(event.target.files[0]);
  },

  click: function(event) {
    var target = $(event.target);

    if (target.is('button') && !target.is(':disabled')) {
      this.$('[type="file"]').click();
    }
  },

  readFile: function(file) {
    this.$('button').attr('disabled', true).html('Uploading GPS Data…');
    this.set('controller.file', file);
  }

});
