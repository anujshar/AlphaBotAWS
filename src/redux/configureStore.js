import {createStore, combineReducers} from 'redux';
import { StrategyListReducer } from './strategyListReducer.js'
import { StrategyResultReducer } from './strategyResultReducer.js'
import { NewRulesReducer } from './newRulesReducer.js'

export const ConfigureStore = () =>{
  const store = createStore(
    combineReducers(
      {
        strategyList: StrategyListReducer,
        strategyResult: StrategyResultReducer,
        newRules: NewRulesReducer,
      }
    )
  );
  return store;
}
