YUI.add('ezsearch-routeappplugin', function (Y) {
    Y.namespace('eZSearch.Plugin');

    Y.eZSearch.Plugin.RouteAppPlugin = Y.Base.create('ezsearchRouteAppPlugin', Y.Plugin.Base, [], {
        initializer: function () {
            var app = this.get('host');

            app.views.ezsearchSearchView = {
                type: Y.View,
            };

            app.route({
                name: "searchPrototype",
                path: "/ezsearch/search",
                view: "ezsearchSearchView",
                sideViews: {'navigationHub': true, 'discoveryBar': true},
                callbacks: ['open', 'checkUser', 'handleSideViews', 'handleMainView'],
            });

            app.on('*:searchPrototypeAction', function() {
                app.navigateTo("searchPrototype");
            });
        },
    }, {
        NS: 'ezsearchRouteApp'
    });

    Y.eZ.PluginRegistry.registerPlugin(
        Y.eZSearch.Plugin.RouteAppPlugin, ['platformuiApp']
    );
});
