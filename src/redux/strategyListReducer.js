import { STRATEGYLISTINIT } from '../shared/strategyList.js'
import * as ActionTypes from './ActionTypes';

export const StrategyListReducer = (state = { isLoading: true,
  resultsList: [], errMessage: null}, action) =>
{
  switch(action.type)
  {
    case ActionTypes.TOGGLE_LISTITEM:
        var row = action.payload;
        return {
          ...state,
          resultsList: state.resultsList.map(
            (result, i) => result.strategyId === row.strategyId ? {...result, isOpen: row.isOpen} : result
          )
        };
    case ActionTypes.FETCH_STRATEGIES:
        var list = action.payload;
        return {
          ...state,
          resultsList: list.list,
          isLoading: false,
        };
    default:
      return state;
  }
};
