import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card, CardHeader, Table, Modal, ModalBody, ModalFooter } from 'reactstrap';
import StrategyItem from './StrategyItemComponent';
import AddEditStrategy from './AddEditStrategyComponent';
import { Loading } from './LoadingComponent';
import { connect } from 'react-redux';
import { BrowserRouter, Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { add_rule, edit_rule, delete_rule, delete_all_rules, edit_name, edit_name_touched, edit_desc, edit_desc_touched, add_rule_errors, edit_rule_error, delete_rule_error, delete_all_rule_errors } from '../redux/ActionCreators.js'

const mapStateToProps = (state) => {
  return (
    {
      newRules: state.newRules,
    }
  );
};

const mapDispatchToProps = (dispatch) => (
  {
    add_rule: (list) => dispatch(add_rule(list)),
    edit_rule: (ruleId, rule) => dispatch(edit_rule(ruleId, rule)),
    delete_rule: (ruleId) => dispatch(delete_rule(ruleId)),
    delete_all_rules: () => dispatch(delete_all_rules()),
    edit_name: (name) => dispatch(edit_name(name)),
    edit_name_touched: (touched) => dispatch(edit_name_touched(touched)),
    edit_desc: (desc) => dispatch(edit_desc(desc)),
    edit_desc_touched: (touched) => dispatch(edit_desc_touched(touched)),
    add_rule_errors: (error) => dispatch(add_rule_errors(error)),
    edit_rule_error: (ruleId, error) => dispatch(edit_rule_error(ruleId, error)),
    delete_rule_error: (ruleId) => dispatch(delete_rule_error(ruleId)),
    delete_all_rule_errors: () => dispatch(delete_all_rule_errors()),
  }
);

class StrategyList extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      modalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal(e)
  {
    if(this.state.modalOpen)
    {
      this.props.delete_all_rules();
      this.props.delete_all_rule_errors();
      this.props.edit_name("");
      this.props.edit_desc("");
      this.props.edit_name_touched(false);
      this.props.edit_desc_touched(false);
      // Call reload only if a new strategy is added
      window.location.reload();
    }
    this.setState({
      modalOpen: !this.state.modalOpen
    });

  }

  render()
  {
    var rules = [];
    if(this.props.strategyList.isLoading)
    {
      return(
                <div className="container">
                    <div className="row">
                        <Loading />
                    </div>
                </div>
            );
    }

    else if(this.props.strategyList.errMessage != null)
    {
      return(
                <div className="container">
                    <div className="row">
                        <h4>{this.strategyList.errMessage}</h4>
                    </div>
                </div>
            );
    }

    else if(this.props.strategyList.resultsList != null)
    {
      return (
        <div>
        {this.props.strategyList.resultsList.map((strategy, index) => (
          <StrategyItem key={index} strategyName = {strategy.strategyName} strategyId = {strategy.strategyId} strategyDesc = {strategy.strategyDesc} isOpen = {strategy.isOpen} strategyResult = {this.props.strategyResult.resultsList.filter((result) => result.strategyId.toString() === strategy.strategyId)} addResultRow = {this.props.addResultRow} toggleListItem = {this.props.toggleListItem} deleteResultRows = {this.props.deleteResultRows} isLoading = {this.props.strategyResult.isLoadingList.filter((result) => result.strategyId.toString() === strategy.strategyId)} update_result_loading = {this.props.update_result_loading}/>
        ))}
        <Button id = "AddButton" color = "primary" size = "lg" onClick = {this.toggleModal}>Add</Button>
        <AddEditStrategy
          toggleModal = {this.toggleModal}
          modalOpen = {this.state.modalOpen}
          strategyRules = {rules}
          newRules = {this.props.newRules}
          add_rule = {this.props.add_rule}
          edit_rule = {this.props.edit_rule}
          delete_rule = {this.props.delete_rule}
          delete_all_rules = {this.props.delete_all_rules}
          edit_name = {this.props.edit_name}
          edit_desc = {this.props.edit_desc}
          edit_name_touched = {this.props.edit_name_touched}
          edit_desc_touched = {this.props.edit_desc_touched}
          add_rule_errors = {this.props.add_rule_errors}
          edit_rule_error = {this.props.edit_rule_error}
          delete_rule_error = {this.props.delete_rule_error}
          delete_all_rule_errors = {this.props.delete_all_rule_errors}
        />
      </div>

      );
    }
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StrategyList));
