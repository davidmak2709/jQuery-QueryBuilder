/**
 * @class FilterDescription
 * @memberof module:plugins
 * @description Provides three ways to display a description about a filter: inline, Bootsrap Popover or Bootbox.
 * @param {object} [options]
 * @param {string} [options.icon='fa fa-info-circle-o'] 
 * @throws ConfigError
 */
QueryBuilder.define('filter-description', function (options) {
    this.on('afterUpdateRuleFilter afterUpdateRuleOperator', function (e, rule) {
        var $p = rule.$el.find('p.filter-description');
        var description = e.builder.getFilterDescription(rule.filter, rule);

        if (!description) {
            $p.hide();
        }
        else {
            if ($p.length === 0) {
                $p = $($.parseHTML('<p class="filter-description"></p>'));
                $p.appendTo(rule.$el);
            }
            else {
                $p.css('display', '');
            }

            $p.html('<i class="' + options.icon + '"></i> ' + description);
        }
    });
}, {
    icon: 'fa fa-info-circle-o'
});

QueryBuilder.extend(/** @lends module:plugins.FilterDescription.prototype */ {
    /**
     * Returns the description of a filter for a particular rule (if present)
     * @param {object} filter
     * @param {Rule} [rule]
     * @returns {string}
     * @private
     */
    getFilterDescription: function (filter, rule) {
        if (!filter) {
            return undefined;
        }
        else if (typeof filter.description == 'function') {
            return filter.description.call(this, rule);
        }
        else {
            return filter.description;
        }
    }
});
