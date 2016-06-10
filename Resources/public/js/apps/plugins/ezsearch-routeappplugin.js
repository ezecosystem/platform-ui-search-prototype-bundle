YUI.add('ezsearch-routeappplugin', function (Y) {
    Y.namespace('eZSearch.Plugin');

    Y.eZSearch.Plugin.RouteAppPlugin = Y.Base.create('ezsearchRouteAppPlugin', Y.Plugin.Base, [], {
        initializer: function () {
            var app = this.get('host');

            app.views.ezsearchSearchView = {
                type: Y.eZSearch.SearchView,
            };

            this._addSearchRoute('searchPrototype', "/ezsearch/search");
            this._addSearchRoute('doSearchPrototype', "/ezsearch/search/:searchString/:limit");

            app.on('*:searchPrototypeAction', function() {
                app.navigateTo("searchPrototype");
            });

            app.on('*:searchRequest', function(e) {
                app.navigateTo("doSearchPrototype", {
                    searchString: e.searchString,
                    limit: e.limit,
                });
            })
        },

        _addSearchRoute: function(name, path) {
            this.get('host').route({
                name: name,
                path: path,
                view: "ezsearchSearchView",
                service: Y.eZSearch.SearchViewService,
                sideViews: {'navigationHub': true, 'discoveryBar': true},
                callbacks: ['open', 'checkUser', 'handleSideViews', 'handleMainView'],
            });
        },

    }, {
        NS: 'ezsearchRouteApp'
    });

    Y.eZ.PluginRegistry.registerPlugin(
        Y.eZSearch.Plugin.RouteAppPlugin, ['platformuiApp']
    );
});
