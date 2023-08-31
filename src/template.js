QueryBuilder.templates.group =`
<div id="{{= it.group_id }}" class="rules-group-container"> 
    <div class="rules-group-header"> 
        <div class="u-pullRight group-actions"> 
          <button type="button" class="t-Button t-Button--small t-Button--icon t-Button--iconLeft" data-add="rule"> 
            <span aria-hidden="true" class="t-Icon t-Icon--left {{= it.icons.add_rule }}"></span>{{= it.translate("add_rule") }} 
          </button> 
          {{? it.settings.allow_groups===-1 || it.settings.allow_groups>=it.level }} 
            <button type="button" class="t-Button t-Button--small t-Button--icon t-Button--iconLeft" data-add="group"> 
                <span aria-hidden="true" class="t-Icon t-Icon--left {{= it.icons.add_group }}"></span>{{= it.translate("add_group") }} 
            </button> 
          {{?}} 
          {{? it.level>1 }} 
            <button type="button" class="t-Button t-Button--small t-Button--icon t-Button--iconLeft" data-delete="group"> 
                <span aria-hidden="true" class="t-Icon t-Icon--left {{= it.icons.remove_group }}"></span>{{= it.translate("delete_group") }} 
            </button> 
          {{?}} 
        </div> 
        <div class="group-conditions"> 
            <div class="t-Form-fieldContainer rel-col t-Form-fieldContainer--radioButtonGroup apex-item-wrapper apex-item-wrapper--has-initial-value apex-item-wrapper--radiogroup" id="{{= it.group_id }}_CONTAINER"> 
                <div class="t-Form-inputContainer col col-null"> 
                    <div class="t-Form-itemWrapper">
                        <div tabindex="-1" id="{{= it.group_id }}_B" class="radio_group apex-item-group apex-item-group--rc apex-item-radio" role="group">
                            <div class="apex-item-grid radio_group">
                                <div class="apex-item-grid-row">
                                    {{~ it.conditions: condition }}
                                        <div class="apex-item-option">
                                            <input type="radio" name="{{= it.group_id }}_cond" data-display="{{= it.translate("conditions", condition) }}" value="{{= condition }}">
                                                <label class="u-radio" for="{{= it.group_id }}_{{= condition }}_cond">{{= it.translate("conditions", condition) }}</label>
                                        </div>
                                    {{~}}
                                </div>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            {{? it.settings.display_errors }}
                <div class="error-container">
                  <span aria-hidden="true" class="{{= it.icons.error }}"></span>              
                </div>
            {{?}}
        </div>
    <div class="rules-group-body margin-top-md">
        <div class=rules-list></div>
    </div>
</div>
`;

QueryBuilder.templates.rule = `
<div id="{{= it.rule_id }}" class="rule-container">
    <div class="rule-header">
        <div class="u-pullRight rule-actions">
            <button type="button" class="t-Button t-Button--small t-Button--noLabel t-Button--icon t-Button--iconLeft" data-delete="rule">
                <span aria-hidden="true" class="t-Icon t-Icon--left {{= it.icons.remove_rule }}"></span>
            </button>
        </div>
    </div>
    {{? it.settings.display_errors }}
        <div class="error-container margin-left-sm">
            <span aria-hidden="true" class="{{= it.icons.error }}"></span>
        </div>
    {{?}}
    <div class="container">
        <div class="row">
            <div class="rule-filter-container col {{? it.expandFilterSelector }} col-12 {{?}} {{? !it.expandFilterSelector }} col-4 {{?}} apex-col-auto"></div>
            <div class="rule-operator-container col {{? !it.expandFilterSelector }} col-4 {{?}} apex-col-auto"></div>
            <div class="rule-value-container col {{? !it.expandFilterSelector }} col-4 {{?}} apex-col-auto"></div>
        </div>
    </div>
</div>
`;

QueryBuilder.templates.filterSelect = `
{{ var optgroup = null; }} 
<div class="t-Form-fieldContainer t-Form-fieldContainer--stacked t-Form-fieldContainer--stretchInputs apex-item-wrapper apex-item-wrapper--select-list js-show-label">
     <div class="t-Form-labelContainer">
         <label for="{{= it.rule.id }}_filter" id="{{= it.rule.id }}_filter_LABEL" class="t-Form-label">
            {{= it.translate("filter") }}
        </label>
     </div>
     <div class="t-Form-inputContainer">
         <div class="t-Form-itemWrapper">
         <select name="{{= it.rule.id }}_filter" class="form-control apex-item-select" style="text-indent: 0px;">
             {{? it.settings.display_empty_filter }}
             <option value="-1">{{= it.settings.select_placeholder }}</option>
             {{?}}
             {{~ it.filters: filter }}
                 {{? optgroup !== filter.optgroup }}
                 {{? optgroup !== null }}</optgroup>{{?}}
                 {{? (optgroup = filter.optgroup) !== null }}
                     <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}">
                 {{?}}
                 {{?}}
                 <option value="{{= filter.id }}" {{? filter.icon}}data-icon="{{= filter.icon}}"{{?}}>{{= it.translate(filter.label) }}</option>
             {{~}}
             {{? optgroup !== null }}</optgroup>{{?}}
         </select>
         </div>
     </div>
 </div>
 `;

QueryBuilder.templates.operatorSelect = `
{{? it.operators[0].type !== 'hidden' }}
<div class="t-Form-fieldContainer t-Form-fieldContainer--stacked t-Form-fieldContainer--stretchInputs apex-item-wrapper apex-item-wrapper--select-list js-show-label"> 
    <div class="t-Form-labelContainer"> 
        <label for="{{= it.rule.id }}_operator" id="{{= it.rule.id }}_operator_LABEL" class="t-Form-label">
            {{= it.translate("operator") }}
        </label> 
    </div> 
    <div class="t-Form-inputContainer"> 
        <div class="t-Form-itemWrapper"> 
            {{? it.operators.length === 1 }} 
            <span> 
            {{= it.translate("operators", it.operators[0].type) }} 
            </span> 
            {{?}} 
            {{ var optgroup = null; }} 
            <select class="form-control apex-item-select {{? it.operators.length === 1 }}hidden-xxs-up{{?}}" style="text-indent: 0px;" name="{{= it.rule.id }}_operator"> 
                {{~ it.operators: operator }} 
                    {{? optgroup !== operator.optgroup }} 
                        {{? optgroup !== null }}</optgroup>{{?}} 
                            {{? (optgroup = operator.optgroup) !== null }} 
                                <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> 
                            {{?}} 
                        {{?}} 
                    <option value="{{= operator.type }}" {{? operator.icon}}data-icon="{{= operator.icon}}"{{?}}>{{= it.translate("operators", operator.type) }}</option> 
                {{~}} 
                {{? optgroup !== null }}</optgroup>{{?}} 
            </select> 
        </div> 
    </div> 
</div> 
{{?}}
`;

QueryBuilder.templates.ruleValueSelect = `
<div class="t-Form-fieldContainer t-Form-fieldContainer--stacked t-Form-fieldContainer--stretchInputs apex-item-wrapper apex-item-wrapper--select-list js-show-label"> 
    <div class="t-Form-labelContainer"> 
        <label for="{{= it.rule.id }}_value" id="{{= it.rule.id }}_value_LABEL" class="t-Form-label">
            {{= it.translate("value") }}
        </label> 
    </div> 
    <div class="t-Form-inputContainer"> 
        <div class="t-Form-itemWrapper"> 
            {{ var optgroup = null; }} 
            <select class="form-control apex-item-select style="text-indent: 0px;" name="{{= it.rule.id }}_value" {{? it.rule.filter.multiple }}multiple{{?}}> 
              {{? it.rule.filter.placeholder }}
                <option value="{{= it.rule.filter.placeholder_value }}" disabled selected>{{= it.rule.filter.placeholder }}</option> \
              {{?}}     
              {{~ it.rule.filter.values: entry }} 
                  {{? optgroup !== entry.optgroup }} 
                      {{? optgroup !== null }}</optgroup>{{?}} 
                      {{? (optgroup = entry.optgroup) !== null }} 
                          <optgroup label="{{= it.translate(it.settings.optgroups[optgroup]) }}"> 
                      {{?}} 
                  {{?}} 
                  <option value="{{= entry.value }}">{{= entry.label }}</option> 
              {{~}} 
              {{? optgroup !== null }}</optgroup>{{?}} 
            </select> 
        </div> 
    </div> 
</div> 
`;

/**
 * Returns group's HTML
 * @param {string} group_id
 * @param {int} level
 * @returns {string}
 * @fires QueryBuilder.changer:getGroupTemplate
 * @private
 */
QueryBuilder.prototype.getGroupTemplate = function (group_id, level) {
  var h = this.templates.group({
    builder: this,
    group_id: group_id,
    level: level,
    conditions: this.settings.conditions,
    icons: this.icons,
    settings: this.settings,
    translate: this.translate.bind(this)
  });

  /**
   * Modifies the raw HTML of a group
   * @event changer:getGroupTemplate
   * @memberof QueryBuilder
   * @param {string} html
   * @param {int} level
   * @returns {string}
   */
  return this.change('getGroupTemplate', h, level);
};

/**
 * Returns rule's HTML
 * @param {string} rule_id
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleTemplate
 * @private
 */
QueryBuilder.prototype.getRuleTemplate = function (rule_id) {
  var h = this.templates.rule({
    builder: this,
    rule_id: rule_id,
    icons: this.icons,
    settings: this.settings,
    translate: this.translate.bind(this),
    expandFilterSelector: this.filters.every( v => v.type === 'hidden' && v.input === 'hidden')
  });

  /**
   * Modifies the raw HTML of a rule
   * @event changer:getRuleTemplate
   * @memberof QueryBuilder
   * @param {string} html
   * @returns {string}
   */
  return this.change('getRuleTemplate', h);
};

/**
 * Returns rule's filter HTML
 * @param {Rule} rule
 * @param {object[]} filters
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleFilterTemplate
 * @private
 */
QueryBuilder.prototype.getRuleFilterSelect = function (rule, filters) {
  var h = this.templates.filterSelect({
    builder: this,
    rule: rule,
    filters: filters,
    icons: this.icons,
    settings: this.settings,
    translate: this.translate.bind(this)
  });

  /**
   * Modifies the raw HTML of the rule's filter dropdown
   * @event changer:getRuleFilterSelect
   * @memberof QueryBuilder
   * @param {string} html
   * @param {Rule} rule
   * @param {QueryBuilder.Filter[]} filters
   * @returns {string}
   */
  return this.change('getRuleFilterSelect', h, rule, filters);
};

/**
 * Returns rule's operator HTML
 * @param {Rule} rule
 * @param {object[]} operators
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleOperatorTemplate
 * @private
 */
QueryBuilder.prototype.getRuleOperatorSelect = function (rule, operators) {
  var h = this.templates.operatorSelect({
    builder: this,
    rule: rule,
    operators: operators,
    icons: this.icons,
    settings: this.settings,
    translate: this.translate.bind(this)
  });

  /**
   * Modifies the raw HTML of the rule's operator dropdown
   * @event changer:getRuleOperatorSelect
   * @memberof QueryBuilder
   * @param {string} html
   * @param {Rule} rule
   * @param {QueryBuilder.Operator[]} operators
   * @returns {string}
   */
  return this.change('getRuleOperatorSelect', h, rule, operators);
};

/**
 * Returns the rule's value select HTML
 * @param {string} name
 * @param {Rule} rule
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleValueSelect
 * @private
 */
QueryBuilder.prototype.getRuleValueSelect = function (name, rule) {
  var h = this.templates.ruleValueSelect({
    builder: this,
    name: name,
    rule: rule,
    icons: this.icons,
    settings: this.settings,
    translate: this.translate.bind(this)
  });

  /**
   * Modifies the raw HTML of the rule's value dropdown (in case of a "select filter)
   * @event changer:getRuleValueSelect
   * @memberof QueryBuilder
   * @param {string} html
   * @param [string} name
   * @param {Rule} rule
   * @returns {string}
   */
  return this.change('getRuleValueSelect', h, name, rule);
};

/**
 * Returns the rule's value HTML
 * @param {Rule} rule
 * @param {int} value_id
 * @returns {string}
 * @fires QueryBuilder.changer:getRuleInput
 * @private
 */
QueryBuilder.prototype.getRuleInput = function (rule, value_id, nb_inputs) {
  var filter = rule.filter;
  var validation = rule.filter.validation || {};
  var name = rule.id + '_value_' + value_id;
  var c = filter.vertical ? '' : 'style="flex: 1;"';
  var h = '';
  var placeholder = Array.isArray(filter.placeholder) ? filter.placeholder[value_id] : filter.placeholder;
  var translate = this.translate.bind(this);

  var label = translate('value');
  if(nb_inputs === 2 && value_id === 0) {
    label = translate('from');
  } else if(nb_inputs === 2 && value_id === 1) {
    label = translate('to');
  }

  if (typeof filter.input == 'function') {
    h = filter.input.call(this, rule, name);
  }
  else {
    switch (filter.input) {
      case 'radio':
      case 'checkbox':
        h += `<div class="t-Form-fieldContainer t-Form-fieldContainer--stacked t-Form-fieldContainer--stretchInputs apex-item-wrapper apex-item-wrapper--${filter.input === 'checkbox' ? 'checkbox' : 'radiogroup'}" ${c}>`;
        h += `
          <div class="t-Form-labelContainer">
            <label for="${name}" id="${name}_LABEL" class="t-Form-label">${label}</label>
          </div>
          <div class="t-Form-inputContainer">
            <div class="t-Form-itemWrapper">
              <div tabindex="-1" 
                id="${name}" 
                aria-labelledby="${name}_LABEL" 
                class="${filter.input}_group apex-item-group apex-item-group--rc apex-item-${filter.input}" 
                role="group">
        `;
        Utils.iterateOptions(filter.values, function (key, val) {
          h += `
            <div class="apex-item-option">
              <input type="${filter.input}" name="${name}" value="${key}">
              <label class="u-${filter.input}" for="${name + '_' + key}">${val}</label>              
            </div>          
          `
        });

        h += `
              </div>
            </div>
          </div>
        </div>
        `;
        break;

      case 'select':
        h = this.getRuleValueSelect(name, rule);
        break;

      case 'textarea':
        h += `
          <div class="t-Form-fieldContainer t-Form-fieldContainer--stacked t-Form-fieldContainer--stretchInputs apex-item-wrapper apex-item-wrapper--textarea js-show-label" id="${name}_CONTAINER" ${c}>
            <div class="t-Form-labelContainer">
              <label for="${name}" id="${name}_LABEL" class="t-Form-label">${label}</label>
            </div>
            <div class="t-Form-inputContainer">
              <div class="t-Form-itemWrapper">
                <div class="apex-item-group apex-item-group--textarea">
                  <textarea name="${name}" 
                    rows="5" 
                    cols="30"                     
                    ${placeholder ? 'placeholder="' + placeholder + '"' : ''}
                    ${filter.size ? 'cols="' + filter.size + '"' : ''}
                    ${filter.rows ? 'rows="' + filter.rows + '"' : ''}
                    ${filter.type === 'string' && validation.min !== undefined ? 'minlength="' + validation.min + '"' : ''}
                    ${filter.type === 'string' && validation.max !== undefined ? 'maxlength="' + validation.max + '"' : ''}
                    class="textarea apex-item-textarea" 
                    data-resizable="false" 
                    style="resize: none;">
                  </textarea>
                </div>
              </div>
            </div>
          </div>
        `;
        break;
      case 'number':
        h += `
          <div class="t-Form-fieldContainer t-Form-fieldContainer--stacked t-Form-fieldContainer--stretchInputs apex-item-wrapper apex-item-wrapper--number-field js-show-label" ${c}> 
              <div class="t-Form-labelContainer"> 
                  <label for="${name}" id="${name}_LABEL" class="t-Form-label">${label}</label> 
              </div> 
              <div class="t-Form-inputContainer"> 
                  <div class="t-Form-itemWrapper">                       
                      <input type="number"                         
                        name="${name}" 
                        class="number_field apex-item-text" 
                        value=""
                        ${validation.step !== undefined ? 'step="' + validation.step + '"' : ''}
                        ${validation.min !== undefined ? 'min="' + validation.min + '"' : ''}
                        ${validation.max !== undefined ? 'max="' + validation.max + '"' : ''}
                        ${placeholder ? 'placeholder="' + placeholder + '"' : ''}
                        ${filter.size ? 'size="' + size + '"' : ''}                      
                      /> 
                  </div> 
              </div> 
          </div>
        `;
        break;
        
      case 'hidden':
          break;    

      default:
        h += `
          <div class="t-Form-fieldContainer t-Form-fieldContainer--stacked t-Form-fieldContainer--stretchInputs apex-item-wrapper apex-item-wrapper--text-field js-show-label" ${c}> 
              <div class="t-Form-labelContainer"> 
                  <label for="${name}" id="${name}_LABEL" class="t-Form-label">${label}</label> 
              </div> 
              <div class="t-Form-inputContainer"> 
                  <div class="t-Form-itemWrapper"> 
                      <input type="text" 
                        name="${name}" 
                        class="text_field apex-item-text" 
                        value=""
                        ${placeholder ? 'placeholder="' + placeholder + '"' : ''}
                        ${filter.size ? 'size="' + size + '"' : ''}
                        ${filter.type === 'string' && validation.min !== undefined ? 'minlength="' + validation.min + '"' : ''}
                        ${filter.type === 'string' && validation.max !== undefined ? 'maxlength="' + validation.max + '"' : ''}
                      /> 
                  </div> 
              </div> 
          </div>
      `;
    }
  }

  /**
   * Modifies the raw HTML of the rule's input
   * @event changer:getRuleInput
   * @memberof QueryBuilder
   * @param {string} html
   * @param {Rule} rule
   * @param {string} name - the name that the input must have
   * @returns {string}
   */
  return this.change('getRuleInput', h, rule, name);
};
