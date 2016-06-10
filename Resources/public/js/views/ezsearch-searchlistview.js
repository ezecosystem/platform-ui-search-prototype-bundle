/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ezsearch-searchlistview', function (Y) {
    "use strict";
  
    Y.namespace('eZSearch');

    Y.eZSearch.SearchListView = Y.Base.create('ezsearchSearchListView', Y.eZ.TemplateBasedView, [Y.eZ.LoadMorePagination], {
        initializer: function () {
            this._itemViews = [];
            this._ItemView = this.get('itemViewConstructor');
            this._itemViewBaseConfig = {
                displayedProperties: this.get('displayedProperties'),
            };
            this._getExpectedItemsCount = this._getSearchResultCount;
        },
        render: function () {
            var  unloadedItemCount= this.get('searchResultCount') - this._countLoadedItems();

            this.get('container').setHTML(this.template({
                searchResultCount: this.get('searchResultCount'),
                displayCount: this._countLoadedItems(),
                remainingCount: this.get('limit') <= unloadedItemCount ? this.get('limit') : unloadedItemCount,
            }));
            this._renderItems();
            return this;
        },

        _getSearchResultCount: function () {
            return this.get('searchResultCount');
        },

        _renderItems: function () {
            var contentNode = this.get('container').one('.ezsearch-searchlist-content'),
                ItemView = this.get('itemViewConstructor');

            if ( !this.get('items') ) {
                return;
            }
            this.get('items').forEach(function (struct) {
                var view = new ItemView({
                        displayedProperties: this.get('displayedProperties'),
                        location: struct.location,
                        content: struct.content,
                        contentType: struct.contentType,
                        bubbleTargets: this,
                    });

                this._itemViews.push(view);
                contentNode.append(view.render().get('container'));
            }, this);
            if( this.get('searchResultCount') > this._countLoadedItems() ) {
                this._enableLoadMore();
            }
        },
        
        _getColumns: function () {
            return this.get('displayedProperties').map(function (identifier) {
                return {
                    name: this.get('propertyNames')[identifier],
                    identifier: identifier,
                };
            }, this);
        },

    }, {
        ATTRS: {
            searchResultCount: {},
            /**
             * The properties to display
             *
             * @attribute displayedProperties
             * @type Array
             */
            displayedProperties: {
                value: ['name', 'lastModificationDate', 'contentType', 'translations'],
            },

            /**
             * A key value object to store the human readable names of the
             * columns.
             *
             * @attribute propertyNames
             * @type {Object}
             */
            propertyNames: {
                value: {
                    'name': 'Name',
                    'lastModificationDate': 'Modified',
                    'contentType': 'Content type',
                    'translations': 'Translations',
                }
            },
            itemViewConstructor: {
                valueFn: function () {
                    return Y.eZ.SubitemListItemView;
                },
            },
        }
    });
});
