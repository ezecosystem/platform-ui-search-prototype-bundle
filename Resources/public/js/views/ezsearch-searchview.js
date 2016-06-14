YUI.add('ezsearch-searchview', function (Y) {
    Y.namespace('eZSearch');

    Y.eZSearch.SearchView = Y.Base.create('ezsearchSearchView', Y.eZ.TemplateBasedView, [], {
        events: {
            '.ezsearch-form': {
                'submit': '_handleFormSubmit'
            },
        },

        initializer: function () {
            this.after('userSearchStringChange', function() {
                this.fire('searchRequest', {
                    searchString: this.get('userSearchString'),
                    limit: this.get('loadMoreAddingNumber'),
                });
            });
            this.after('ezsearchSearchListView:offsetChange', function(e) {
                this._set('limit', this.get('limit') + this.get('loadMoreAddingNumber'));
                this.fire('searchRequest', {
                    searchString: this.get('searchString'),
                    limit: this.get('limit'),
                });
            });
        },

        render: function () {
            this.get('container').setHTML(
                this.template({
                    "searchString": this.get("searchString"),
                })
            );
            this._uiSetMinHeight();
            
            if (this.get('searchString')) {
                this._renderSearchListView();
            }
            return this;
        },

        _renderSearchListView: function () {
            this.get('container').one('.ezsearch-searchlist-content').append(
                this.get('searchListView').render().get('container')
            );
        },

        _handleFormSubmit: function (e) {
            var form = e.currentTarget,
                searchString = form.get('searchstring').get('value');

            e.preventDefault();
            this._set('userSearchString', searchString);
        },
        
        _uiSetMinHeight: function () {
            var container = this.get('container');

            container.one('.ezsearch-searchview-content').setStyle(
                'minHeight', container.get('winHeight') + 'px'
            );
        },
    }, {
        ATTRS: {
            userSearchString: {
                readOnly: true
            },
            limit: {},
            loadMoreAddingNumber: {},
            searchString: {},
            searchResultList: {},
            searchResultCount: {},
            searchListView: {
                writeOnce: 'initOnly',
                valueFn: function () {
                    return new Y.eZSearch.SearchListView({
                        items: this.get('searchResultList'),
                        searchResultCount: this.get('searchResultCount'),
                        limit: this.get('loadMoreAddingNumber'),
                        offset: this.get('limit'),
                        bubbleTargets: this,
                    });
                },
            },
        }
    });
});
