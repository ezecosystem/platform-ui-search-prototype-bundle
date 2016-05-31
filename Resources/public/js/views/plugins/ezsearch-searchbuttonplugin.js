YUI.add('ezsearch-searchbuttonplugin', function (Y) {
    Y.namespace('eZSearch.Plugin');

    Y.eZSearch.Plugin.SearchButtonPlugin = Y.Base.create('ezsearchSearchButtonPlugin', Y.Plugin.Base, [], {
        initializer: function () {
            var discoverybar = this.get('host'); // the plugged object is called host

            console.log("Hey, I'm a plugin for discoverybar!");
            console.log("And I'm plugged in ", discoverybar);
        },
    }, {
        NS: 'ezsearchButton'
    });


    Y.eZ.PluginRegistry.registerPlugin(
        Y.eZSearch.Plugin.SearchButtonPlugin, ['discoveryBarView']
    );
});