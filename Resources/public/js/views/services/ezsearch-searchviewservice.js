YUI.add('ezsearch-searchviewservice', function (Y) {
    Y.namespace('eZSearch');

    Y.eZSearch.SearchViewService = Y.Base.create('ezsearchSearchViewService', Y.eZ.ViewService, [], {
        _load: function (callback) {
            this.set('searchString', this.get('request').params.searchString);

            if (this.get('searchString')) {
                this.fire('locationSearch', {
                    viewName: 'search-' + this.get('searchString'),
                    resultAttribute: 'searchResultList',
                    resultTotalCountAttribute: 'searchResultCount',
                    loadContent: true,
                    loadContentType: true,
                    search: {
                        criteria: {
                            "FullTextCriterion": this.get('searchString'),
                        },
                        offset: 0,
                        limit: 10,
                    },
                });

                this.onceAfter('searchResultListChange', function () {
                    callback();
                })
            } else {
                callback();
            }
        },

        _getViewParameters: function () {
            return {
                searchString: this.get('searchString'),
                searchResultList: this.get('searchResultList'),
                searchResultCount: this.get('searchResultCount'),
            };
        },

    }, {
        ATTRS: {
            searchString: {},
            searchResultList: {},
            searchResultCount: {},
            
        }
    });
    Y.eZ.PluginRegistry.registerPlugin(
        Y.eZ.Plugin.Search, ['ezsearchSearchViewService']
    );
});