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
                });
            })
        },

        render: function () {
            this.get('container').setHTML(
                this.template({
                    "searchString": this.get("searchString"),
                })
            );
            this._uiSetMinHeight();
            return this;
        },

        /**
         * Handles the `submitForm` event by preventing the original form to be
         * submitted by the browser and by changing searchRequest attribute.
         *
         * @method _handleFormSubmit
         * @protected
         * @param {EventFacade} e
         */
        _handleFormSubmit: function (e) {
            var form = e.currentTarget,
                searchString = form.get('searchstring').get('value');

            e.preventDefault();
            this._set('userSearchString', searchString);
        },

        /**
         * Sets the minimum height of the view
         *
         * @private
         * @method _uiSetMinHeight
         */
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
            searchString: {},
        }
    });
});
