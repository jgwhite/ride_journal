RideJournal.RideController = Ember.ObjectController.extend({

  mapId: 'ride-journal.map-ov3ln4no',

  metaComplete: function() {
    return this.get('title') &&
           this.get('subtitle') &&
           this.get('gpx');
  }.property('title', 'subtitle', 'gpx'),

  metaIncomplete: function() {
    return !this.get('metaComplete');
  }.property('metaComplete'),

  fileDidChange: function() {
    if (this.get('file')) this.fetchGpx();
  }.observes('file'),

  fetchGpx: function() {
    var self = this,
        data = new FormData();

    data.append('file', this.get('file'));

    $.ajax('/gpsbabel', {
      type: 'POST',
      contentType: false,
      processData: false,
      data: data,
      dataType: 'json'
    }).then(function(data) {
      self.set('gpx', data.gpx);
    });
  }

});
