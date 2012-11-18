RideJournal.Router = Ember.Router.extend({
  location: 'none',

  root: Ember.Route.extend({

    // -- Actions --

    start: Ember.Route.transitionTo('ride'),

    // -- Routes --

    home: Ember.Route.extend({
      route: '/',

      connectOutlets: function(router) {
        router.get('applicationController').connectOutlet('home');
      }
    }),

    ride: Ember.Route.extend({
      route: '/ride',
      initialState: 'meta',

      connectOutlets: function(router) {
        var ride = RideJournal.store.createRecord(RideJournal.Ride);
        router.get('applicationController').connectOutlet('ride', ride);
      },

      // -- Routes --

      meta: Ember.Route.extend({
        route: '/',

        connectOutlets: function(router) {
          router.get('rideController').connectOutlet('rideMeta');
        },

        next: Ember.Route.transitionTo('map')
      }),

      map: Ember.Route.extend({
        route: '/map',

        connectOutlets: function(router) {
          router.get('rideController').connectOutlet('rideMap');
        }
      })

    })

  })
});
