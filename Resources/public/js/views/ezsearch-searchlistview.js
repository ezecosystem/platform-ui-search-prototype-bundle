/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ezsearch-searchlistview', function (Y) {
    "use strict";
  
    Y.namespace('eZSearch');

    Y.eZSearch.SearchListView = Y.Base.create('ezsearchSearchListView', Y.eZ.TemplateBasedView, [], {
        initializer: function () {
            this._itemViews = [];
        },
        render: function () {
            this.get('container').setHTML(this.template({
                searchResultCount: this.get('searchResultCount'),
            }));
            this._renderItems();
            return this;
        },
        
        _renderItems: function () {
            var contentNode = this.get('container').one('.ezsearch-searchlist-content'),
                ItemView = this.get('itemViewConstructor');

            if ( !this.get('searchResultList') ) {
                return;
            }
            this.get('searchResultList').forEach(function (struct) {
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
            searchResultList: {},
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
