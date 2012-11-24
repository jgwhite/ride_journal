RideJournal.MapView = Ember.View.extend({
  mapIdBinding: 'context.mapId',
  boundsBinding: 'context.bounds',

  classNames: ['map-view'],

  didInsertElement: function() {
    var layer = mapbox.layer().id(this.get('mapId')),
        map = mapbox.map(this.get('element'), [layer]),
        points = this.get('context.points'),
        midPoint = points.objectAt(Math.round(points.length / 2));

    map.centerzoom(midPoint, 12);

    // var extent = new MM.Extent(
    //   this.get('bounds.minlat'),
    //   this.get('bounds.minlon'),
    //   this.get('bounds.maxlat'),
    //   this.get('bounds.maxlon')
    // );
    // map.setExtent(extent);
  }
});
