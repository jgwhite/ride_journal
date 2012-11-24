RideJournal.MapView = Ember.View.extend({
  mapIdBinding: 'context.mapId',
  boundsBinding: 'context.gpx.bounds',

  classNames: ['map-view'],

  didInsertElement: function() {
    var layer = mapbox.layer().id(this.get('mapId'));
    var extent = new MM.Extent(
      this.get('bounds.minlat'),
      this.get('bounds.minlon'),
      this.get('bounds.maxlat'),
      this.get('bounds.maxlon')
    );
    var map = mapbox.map(this.get('element'), [layer]);
    map.setExtent(extent);
  }
});
