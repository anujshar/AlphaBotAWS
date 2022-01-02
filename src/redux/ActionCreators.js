import * as ActionTypes from './ActionTypes';
export const addResultRow = (rList) =>
({
  type: ActionTypes.ADD_RESULTROW,
  payload:
  {
    rList: rList,
  },
});

export const deleteResultRows = (sId) =>
({
  type: ActionTypes.DELETE_RESULTROWS,
  payload:
  {
    strategyId: sId,
  },
});

export const toggleListItem = (id, open) =>
({
  type: ActionTypes.TOGGLE_LISTITEM,
  payload:
  {
    'strategyId': id,
    'isOpen': open,
  },
});

export const fetch_strategies = (list) =>
({
  type: ActionTypes.FETCH_STRATEGIES,
  payload:
  {
    'list': list,
  },
});

export const update_result_loading = (strategyId, loadingStatus) =>
({
  type: ActionTypes.UPDATE_RESULT_LOADING,
  payload:
  {
    'strategyId': strategyId,
    'loadingStatus': loadingStatus,
  },
});

export const add_result_loading = (list) =>
({
  type: ActionTypes.ADD_RESULT_LOADING,
  payload:
  {
    'list': list,
  },
});

export const add_rule = (list) =>
({
  type: ActionTypes.ADD_RULE,
  payload:
  {
    'list': list,
  },
});

export const edit_rule = (ruleId, rule) =>
({
  type: ActionTypes.EDIT_RULE,
  payload:
  {
    'ruleId': ruleId,
    'rule': rule,
  },
});

export const delete_rule = (ruleId) =>
({
  type: ActionTypes.DELETE_RULE,
  payload:
  {
    'ruleId': ruleId,
  },
});

export const delete_all_rules = () =>
({
  type: ActionTypes.DELETE_ALL_RULES,
  payload: [],
});

export const edit_name = (name) =>
({
  type: ActionTypes.EDIT_NAME,
  payload:
  {
    'name': name,
  },
});

export const edit_name_touched = (touched) =>
({
  type: ActionTypes.EDIT_NAME_TOUCHED,
  payload:
  {
    'touched': touched,
  },
});

export const edit_desc = (desc) =>
({
  type: ActionTypes.EDIT_DESC,
  payload:
  {
    'desc': desc,
  },
});

export const edit_desc_touched = (touched) =>
({
  type: ActionTypes.EDIT_DESC_TOUCHED,
  payload:
  {
    'touched': touched,
  },
});

export const add_rule_errors = (error) =>
({
  type: ActionTypes.ADD_RULE_ERRORS,
  payload:
  {
    'error': error,
  },
});

export const edit_rule_error = (ruleId, error) =>
({
  type: ActionTypes.EDIT_RULE_ERROR,
  payload:
  {
    'ruleId': ruleId,
    'error': error,
  },
});

export const delete_rule_error = (ruleId) =>
({
  type: ActionTypes.DELETE_RULE_ERROR,
  payload:
  {
    'ruleId': ruleId,
  },
});

export const delete_all_rule_errors = () =>
({
  type: ActionTypes.DELETE_ALL_RULE_ERRORS,
  payload: [],
});
