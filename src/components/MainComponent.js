import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import NavigationBar from './NavigationComponent';
import StrategyList from './StrategyListComponent';
import Contact from './ContactComponent';
import AuthPage from './AuthPageComponent';
import { connect } from 'react-redux';
import { addResultRow, deleteResultRows, toggleListItem, fetch_strategies, update_result_loading, add_result_loading } from '../redux/ActionCreators.js'
import { baseUrl } from '../shared/urls';
import { readStrategyListUrl } from '../shared/urls';
import { readStrategyListApiKey } from '../shared/urls';
import { Auth } from '@aws-amplify/auth';

const mapStateToProps = (state) => {
  return (
    {
      strategyList: state.strategyList,
      strategyResult: state.strategyResult,
    }
  );
};

const mapDispatchToProps = (dispatch) => (
  {
    addResultRow: (rList) => dispatch(addResultRow(rList)),
    toggleListItem: (id, open) => dispatch(toggleListItem(id, open)),
    fetch_strategies: (list) => dispatch(fetch_strategies(list)),
    deleteResultRows: (sId) => dispatch(deleteResultRows(sId)),
    update_result_loading: (strategyId, loadingStatus) => dispatch(update_result_loading(strategyId, loadingStatus)),
    add_result_loading: (list) => dispatch(add_result_loading(list)),
  }
);

class Main extends Component
{
  componentDidMount()
  {
    Auth.currentAuthenticatedUser()
    .then((user) => {
      console.log(user);
    })
    .catch((err) => {
      console.log(err);
    });
    // TBD: error handling - if the API call fails

    var query = "userid="+"568ea2ac-b0ab-4919-bf14-0f3ce996d851";

    fetch(readStrategyListUrl + query, {
      method: 'GET',
      headers:
        {
          'x-api-key': readStrategyListApiKey,
          'Content-Type': 'application/json',
        }
    })
    .then(response => response.json())
    .then((sList => {
      console.log(sList);
      this.props.fetch_strategies(sList.Items);

      //create state for strategy result loading status
      var list = []
      for(var i=0; i < sList.Items.length; i++)
      {
        var obj = {};
        obj['strategyId'] = sList.Items[i].strategyId;
        obj['isLoading'] = true;
        list.push(obj);
      }
      this.props.add_result_loading(list);
    }));
  }

  render()
  {
    return (
      <BrowserRouter>
        <NavigationBar />
          <Switch>
            <Route path = '/home' component={() => <StrategyList strategyList={this.props.strategyList} strategyResult = {this.props.strategyResult} addResultRow = {this.props.addResultRow} toggleListItem = {this.props.toggleListItem} deleteResultRows = {this.props.deleteResultRows} update_result_loading = {this.props.update_result_loading} />} />
            <Route path = '/contact' component = {Contact} />
            <Route path = '/authpage' component = {AuthPage} />
            <Redirect to="/home" />
          </Switch>
      </BrowserRouter>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
