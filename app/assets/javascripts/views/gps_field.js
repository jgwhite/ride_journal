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
    this.$('button').attr('disabled', true).html('GPS Data Loaded');

    var self = this;
    reader = new FileReader();
    reader.onload = function(event) {
      self.set('value', self.parseGPX(event.target.result));
    }
    reader.readAsText(file);
  },

  parseGPX: function(string) {
    var $xml = $(this.parseXML(string));

    var data = Ember.Object.create({
      time: moment($xml.find('metadata time').text()),
      points: $xml.find('trkpt').map(function(i, p) {
        p = $(p);

        return Ember.Object.create({
          lat: +p.attr('lat'),
          lon: +p.attr('lon'),
          ele: +p.find('ele').text(),
          time: moment(p.find('time').text())
        })
      }).get()
    });

    return data;
  },

  parseXML: function(string) {
    return $.parseXML(string);
  }
});
