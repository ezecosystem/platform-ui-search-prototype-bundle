YUI.add('ezsearch-searchviewservice', function (Y) {
    Y.namespace('eZSearch');

    Y.eZSearch.SearchViewService = Y.Base.create('ezsearchSearchViewService', Y.eZ.ViewService, [], {
        _load: function (callback) {
            this.set('searchString', this.get('request').params.searchString);
            this.set('limit', this.get('request').params.limit ? Number(this.get('request').params.limit) : this.get('loadMoreAddingNumber'));

            if (this.get('searchString')) {
                this.search.findLocations({
                    viewName: 'search-' + this.get('searchString'),
                    loadContent: true,
                    loadContentType: true,
                    criteria: {
                        "FullTextCriterion": this.get('searchString'),
                    },
                    limit: this.get('limit'),
                    offset: 0
                }, Y.bind(function (error, results, resultCount) {
                    this.set('searchResultList', results);
                    this.set('searchResultCount', resultCount);
                    callback();
                }, this));
            } else {
                callback();
            }
        },

        _getViewParameters: function () {
            return {
                searchString: this.get('searchString'),
                searchResultList: this.get('searchResultList'),
                searchResultCount: this.get('searchResultCount'),
                loadMoreAddingNumber: this.get('loadMoreAddingNumber'),
                limit: this.get('limit'),
            };
        },

    }, {
        ATTRS: {
            loadMoreAddingNumber: {
                value: 10,
            },
            searchString: {},
            searchResultList: {},
            searchResultCount: {},
            limit: {},
            
        }
    });
    Y.eZ.PluginRegistry.registerPlugin(
        Y.eZ.Plugin.Search, ['ezsearchSearchViewService']
    );
});
