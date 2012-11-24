RideJournal.RideController = Ember.ObjectController.extend({

  mapId: 'ride-journal.map-ov3ln4no',

  points: function() {
    return this.get('gpx.trk.trkseg.trkpt');
  }.property('gpx.trk.trkseg.trkpt'),

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
  },

  distance: function() {
    if (!this.get('points')) return;

    var points = this.get('points'),
        result = 0;

    points.forEach(function(item, index) {
      if (index === 0) return;

      var prev = points[index - 1],
          a = this.locationToPoint(prev),
          b = this.locationToPoint(item),
          d = 0.001 * Math.round(this.calculateDistance(a, b));

      result += d;
    }, this);

    return Math.round(result * 100) / 100;
  }.property('points'),

  calculateDistance: function(ap, bp) {
    var dx = ap.x - bp.x;
    var dy = ap.y - bp.y;
    var dz = ap.z - bp.z;
    return Math.sqrt(dx*dx + dy*dy + dz*dz);
  },

  locationToPoint: function(c) {
    var lat = parseFloat(c.lat, 10) * Math.PI / 180.0;
    var lon = parseFloat(c.lon, 10) * Math.PI / 180.0;
    var radius = parseFloat(c.ele, 10) + this.earthRadiusInMeters(lat);
    var cosLon = Math.cos(lon);
    var sinLon = Math.sin(lon);
    var cosLat = Math.cos(lat);
    var sinLat = Math.sin(lat);
    var x = cosLon * cosLat * radius;
    var y = sinLon * cosLat * radius;
    var z = sinLat * radius;
    return { x: x, y: y, z: z, radius: radius };
  },

  earthRadiusInMeters: function(latitudeRadians) {
    var a = 6378137.0; // equatorial radius in meters
    var b = 6356752.3; // polar radius in meters
    var cos = Math.cos(latitudeRadians);
    var sin = Math.sin(latitudeRadians);
    var t1 = a * a * cos;
    var t2 = b * b * sin;
    var t3 = a * cos;
    var t4 = b * sin;
    return Math.sqrt ((t1*t1 + t2*t2) / (t3*t3 + t4*t4));
  }

});
