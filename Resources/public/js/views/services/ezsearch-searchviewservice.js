YUI.add('ezsearch-searchviewservice', function (Y) {
    Y.namespace('eZSearch');

    Y.eZSearch.SearchViewService = Y.Base.create('ezsearchSearchViewService', Y.eZ.ViewService, [], {

        _load: function (callback) {
            this.set('searchString', this.get('request').params.searchString);
            callback();
        },

        _getViewParameters: function () {
            return {
                searchString: this.get('searchString'),
            };
        },
    }, {
        ATTRS: {
            searchString: {}
            
        }
    });
});