RideJournal.RideController = Ember.ObjectController.extend({

  mapUrl: 'http://api.tiles.mapbox.com/v3/ride-journal.map-ov3ln4no',
  mapFormat: '640x268.png',
  mapZoom: 13,

  mapSrc: function() {
    return [
      this.get('mapUrl'),
      this.get('mapLoc'),
      this.get('mapFormat')
    ].join('/');
  }.property('mapUrl', 'mapLoc', 'mapFormat'),

  mapLoc: function() {
    return [
      this.get('origin.lon'),
      this.get('origin.lat'),
      this.get('mapZoom')
    ].join(',');
  }.property('origin'),

  origin: function() {
    return this.get('gpx.points').objectAt(0);
  }.property('gpx'),

  metaComplete: function() {
    return this.get('title') &&
           this.get('subtitle') &&
           this.get('gpx');
  }.property('title', 'subtitle', 'gpx'),

  metaIncomplete: function() {
    return !this.get('metaComplete');
  }.property('metaComplete')

});
