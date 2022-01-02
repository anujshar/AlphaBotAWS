import * as ActionTypes from './ActionTypes';

export const NewRulesReducer = (state = { isLoading: true,
  rules: [], ruleErrors: [], strategyName: '', strategyDesc: '', strategyNameTouched: false, strategyDescTouched: false}, action) =>
{
  switch(action.type)
  {
    case ActionTypes.ADD_RULE:
        var row = action.payload;
        return {
          ...state,
          rules: [...state.rules, row.list]
        };
    case ActionTypes.DELETE_RULE:
        var row = action.payload;
        return {
          ...state,
          rules: state.rules.filter(i => i.ruleId.toString() !== row.ruleId.toString())
          };
    case ActionTypes.EDIT_RULE:
        var row = action.payload;
        return {
          ...state,
          rules: state.rules.map(
            (rule, i) => rule.ruleId.toString() === row.rule.ruleId.toString() ? Object.assign({}, rule, row.rule) : rule
          )
        };
    case ActionTypes.DELETE_ALL_RULES:
        var row = action.payload;
        return {
          ...state,
          rules: [],
          };
    case ActionTypes.EDIT_NAME:
        var row = action.payload;
        return {
          ...state,
          strategyName: row.name,
        };
    case ActionTypes.EDIT_DESC:
        var row = action.payload;
        return {
          ...state,
          strategyDesc: row.desc,
        };
    case ActionTypes.EDIT_NAME_TOUCHED:
        var row = action.payload;
        return {
          ...state,
          strategyNameTouched: row.touched,
        };
    case ActionTypes.EDIT_DESC_TOUCHED:
        var row = action.payload;
        return {
          ...state,
          strategyDescTouched: row.touched,
        };
    case ActionTypes.ADD_RULE_ERRORS:
        var row = action.payload;
        return {
          ...state,
          ruleErrors: [...state.ruleErrors, row.error]
        };
    case ActionTypes.EDIT_RULE_ERROR:
        var row = action.payload;
        return {
          ...state,
          ruleErrors: state.ruleErrors.map(
            (error, i) => error.ruleId.toString() === row.error.ruleId.toString() ? Object.assign({}, error, row.error) : error
          )
        };
    case ActionTypes.DELETE_RULE_ERROR:
        var row = action.payload;
        return {
          ...state,
          ruleErrors: state.ruleErrors.filter(i => i.ruleId.toString() !== row.ruleId.toString())
          };
    case ActionTypes.DELETE_ALL_RULE_ERRORS:
        var row = action.payload;
        return {
          ...state,
          ruleErrors: [],
          };
    default:
      return state;
  }
};
