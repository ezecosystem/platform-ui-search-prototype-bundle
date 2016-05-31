YUI.add('ezsearch-searchbuttonplugin', function (Y) {
    Y.namespace('eZSearch.Plugin');

    Y.eZSearch.Plugin.SearchButtonPlugin = Y.Base.create('ezsearchSearchButtonPlugin', Y.Plugin.Base, [], {
        initializer: function () {
            var discoverybar = this.get('host'),
                searchButton =  new Y.eZ.ButtonActionView({
                    actionId: "searchPrototype",
                    disabled: false,
                    label: "Search",
                    priority: 900
                });

            discoverybar.addAction(searchButton);
        },
    }, {
        NS: 'ezsearchButton'
    });
    
    Y.eZ.PluginRegistry.registerPlugin(
        Y.eZSearch.Plugin.SearchButtonPlugin, ['discoveryBarView']
    );
});
