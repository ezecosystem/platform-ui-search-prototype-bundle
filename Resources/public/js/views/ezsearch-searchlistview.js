/*
 * Copyright (C) eZ Systems AS. All rights reserved.
 * For full copyright and license information view LICENSE file distributed with this source code.
 */
YUI.add('ezsearch-searchlistview', function (Y) {
    "use strict";
  
    Y.namespace('eZSearch');

    Y.eZSearch.SearchListView = Y.Base.create('ezsearchSearchListView', Y.eZ.TemplateBasedView, [], {
      
        render: function () {
            this.get('container').setHTML(this.template({
                searchResultItems: this._getResultItems(),
                searchResultCount: this.get('searchResultCount'),
            }));
            return this;
        },
        
        _getResultItems: function () {
            var searchResultItems = [];

            if ( !this.get('searchResultList') ) {
                return this.get('searchResultList');
            }

            this.get('searchResultList').forEach(function (struct) {
                searchResultItems.push({
                    content: struct.content.toJSON(),
                    contentType: struct.contentType.toJSON(),
                    location: struct.location.toJSON(),
                });
            }, this);
            return searchResultItems;
        },

    }, {
        ATTRS: {
            searchResultList: {},
            searchResultItems: {},
            searchResultCount: {},
        }
    });
});