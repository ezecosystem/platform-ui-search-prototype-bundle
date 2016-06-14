YUI.add('ezsearch-searchviewservice', function (Y) {
    Y.namespace('eZSearch');

    Y.eZSearch.SearchViewService = Y.Base.create('ezsearchSearchViewService', Y.eZ.ViewService, [], {
        _load: function (callback) {
            this.set('searchString', this.get('request').params.searchString);
            this.set('limit', this.get('request').params.limit ? Number(this.get('request').params.limit) : this.get('loadMoreAddingNumber'));

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
                        limit: this.get('limit'),
                        offset: 0
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
