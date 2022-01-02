import { STRATEGYRESULTINIT } from '../shared/strategyResult.js'
import * as ActionTypes from './ActionTypes';

export const StrategyResultReducer = (state = {resultsList: [], isLoadingList: []}, action) =>
{
  switch(action.type)
  {
    case ActionTypes.TEST_FUNCTION:
      return state;
    case ActionTypes.ADD_RESULTROW:
        var row = action.payload;
        return {
          ...state,
          resultsList: [...state.resultsList, row.rList]
        };
    case ActionTypes.DELETE_RESULTROWS:
        var sId = action.payload;
        return {
          ...state,
          resultsList: state.resultsList.filter(i => i.strategyId.toString() !== sId.strategyId.toString())
          };
    case ActionTypes.UPDATE_RESULT_LOADING:
        var row = action.payload;
        state.isLoadingList.map((result, i) => console.log(result.strategyId, result.isLoading));
        return {
          ...state,
          isLoadingList: state.isLoadingList.map(
            (result, i) => result.strategyId.toString() === row.strategyId.toString() ? {...result, isLoading: row.loadingStatus} : result
          )
        };
    case ActionTypes.ADD_RESULT_LOADING:
        var row = action.payload;
        return {
          ...state,
          isLoadingList: row.list,
        };

    default:
      return state;
  }
};
