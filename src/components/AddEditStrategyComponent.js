import '../styles/CommonStyles.css'
import React, { Component } from 'react';
import { Button, Container, Row, Col , Form, FormGroup, Input, Modal, ModalBody, Label, FormFeedback, Alert } from 'reactstrap';
import Rule from './RuleComponent';
import { createStrategyUrl } from '../shared/urls';
import { createStrategyApiKey } from '../shared/urls';
import uuid from 'react-uuid';


class AddEditStrategy extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      dropDownOpen: false,
      dropDownValue: "--select--",
      alertVisible: false,
      alertText: "You need atleast 1 rule to create a strategy!",
    }
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.changeValue = this.changeValue.bind(this);
    this.createStrategy = this.createStrategy.bind(this);
    this.setAlertVisible = this.setAlertVisible.bind(this);
  }

  toggleDropDown()
  {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen
    })
  }

  changeValue(e)
  {
    this.setState({dropDownValue: e.currentTarget.textContent})
  }

  setAlertVisible()
  {
    this.setState({
      alertVisible: !this.state.alertVisible,
    })
  }

  handleInputChange(e)
  {
    if(e.target.name === "strategyName")
    {
      this.props.edit_name(e.target.value);
    }
    else if(e.target.name === "strategyDesc")
    {
      this.props.edit_desc(e.target.value);
    }
  }

  handleBlurChange(e)
  {
    if(e.target.name === "strategyName")
    {
      this.props.edit_name_touched(true);
    }
    else if(e.target.name === "strategyDesc")
    {
      this.props.edit_desc_touched(true);
    }
  }

  validateStrategyNameAndDesc(strategyName, strategyDesc)
  {
    const errors = {
            strategyNameError: '',
            strategyDescError: '',
        };

    if (this.props.newRules.strategyNameTouched && strategyName.length  === 0)
            errors.strategyNameError = 'Strategy Name is a required field';
    else if (this.props.newRules.strategyNameTouched && strategyName.length > 50)
        errors.strategyNameError = 'Strategy name should be less than 50 characters';

    if (this.props.newRules.strategyDescTouched && strategyDesc.length  === 0)
            errors.strategyDescError = 'Strategy description is a required field';
    else if (this.props.newRules.strategyDescTouched && strategyDesc.length > 250)
        errors.strategyDescError = 'Strategy description should be less than 250 characters';
    return errors;
  }

  validateAllResults()
  {
    // if submit is clicked, treat that strategy name and description have already been clicked
    this.props.edit_name_touched(true);
    this.props.edit_desc_touched(true);

    var isValid = true;
    const errors = this.validateStrategyNameAndDesc(this.props.newRules.strategyName, this.props.newRules.strategyDesc);
    if(errors.strategyNameError != "")
    {
      isValid = false;
    }

    if(errors.strategyDescError != "")
    {
      isValid = false;
    }

    var len = this.props.newRules.rules.length;
    if(len === 0)
    {
      this.setState({
        alertText: "You need atleast 1 rule to create a strategy!",
      });
      if(!this.state.alertVisible)
      {
        this.setAlertVisible();
      }
      isValid = false;
    }

    for(var i = 0; i < len; i++)
    {
      var errorIndex = this.props.newRules.ruleErrors.findIndex(x => x.ruleId === this.props.newRules.rules[i].ruleId);
      // check for multiple
      if(this.props.newRules.rules[i].multiple === "--select--")
      {
        var updatedRuleError = this.props.newRules.ruleErrors[errorIndex];
        updatedRuleError.multipleError = "Required Field";
        this.props.edit_rule_error(this.props.newRules.rules[i].ruleId, updatedRuleError);
        isValid = false;
      }
      else if (this.props.newRules.rules[i].multiple != "--select--")
      {
        var updatedRuleError = this.props.newRules.ruleErrors[errorIndex];
        updatedRuleError.multipleError = "";
        this.props.edit_rule_error(this.props.newRules.rules[i].ruleId, updatedRuleError);
      }

      if(this.props.newRules.rules[i].criteria === "--select--")
      {
        var updatedRuleError = this.props.newRules.ruleErrors[errorIndex];
        updatedRuleError.criteriaError = "Required Field";
        this.props.edit_rule_error(this.props.newRules.rules[i].ruleId, updatedRuleError);
        isValid = false;
      }
      else if (this.props.newRules.rules[i].criteria != "--select--")
      {
        var updatedRuleError = this.props.newRules.ruleErrors[errorIndex];
        updatedRuleError.criteriaError = "";
        this.props.edit_rule_error(this.props.newRules.rules[i].ruleId, updatedRuleError);
      }
      if(this.props.newRules.rules[i].criteriaValueDisabled === false && this.props.newRules.rules[i].criteriaValue === "")
      {
        var updatedRuleError = this.props.newRules.ruleErrors[errorIndex];
        updatedRuleError.criteriaValueError = "Required Field";
        this.props.edit_rule_error(this.props.newRules.rules[i].ruleId, updatedRuleError);
        isValid = false;
      }
      else if (this.props.newRules.rules[i].criteriaValueDisabled === false && this.props.newRules.rules[i].criteriaValue != "")
      {
        var updatedRuleError = this.props.newRules.ruleErrors[errorIndex];
        updatedRuleError.criteriaValueError = "";
        this.props.edit_rule_error(this.props.newRules.rules[i].ruleId, updatedRuleError);
      }

      // check for number between 0 to 99
      if(this.props.newRules.rules[i].criteriaValueDisabled === false && (parseFloat(this.props.newRules.rules[i].criteriaValue) < 0 || parseFloat(this.props.newRules.rules[i].criteriaValue) > 99))
      {
        var updatedRuleError = this.props.newRules.ruleErrors[errorIndex];
        updatedRuleError.criteriaValueError = "Enter a number between 0-99";
        this.props.edit_rule_error(this.props.newRules.rules[i].ruleId, updatedRuleError);
        isValid = false;
      }
      else if (this.props.newRules.rules[i].criteriaValueDisabled === false && (parseFloat(this.props.newRules.rules[i].criteriaValue) >= 0 && parseFloat(this.props.newRules.rules[i].criteriaValue) <= 99))
      {
        var updatedRuleError = this.props.newRules.ruleErrors[errorIndex];
        updatedRuleError.criteriaValueError = "";
        this.props.edit_rule_error(this.props.newRules.rules[i].ruleId, updatedRuleError);
      }

    }
    return isValid;
  }

  createStrategyObject()
  {
      var strategyObject = {};
      strategyObject["strategyId"] = uuid(); //make random generator call
      strategyObject["userId"] = "999"; //make random generator call
      strategyObject["strategyName"] = this.props.newRules.strategyName;
      strategyObject["strategyDesc"] = this.props.newRules.strategyDesc;
      strategyObject["createdAt"] = new Date().toISOString();
      strategyObject["modifiedAt"] = new Date().toISOString();
      strategyObject["groupId"] = "0";
      strategyObject["groupName"] = "Strategy group 1";
      strategyObject["isOpen"] = false;
      strategyObject["strategyRules"] = this.props.newRules.rules;
      console.log(strategyObject.strategyId);
      return strategyObject;
  }

  createStrategy(e)
  {
    e.preventDefault();
    var isValid = this.validateAllResults();
    console.log("vaidation result = ", isValid);
    if(isValid)
    {
      var strategyObject = this.createStrategyObject();
      // make API call
      fetch(createStrategyUrl, {
        method: 'POST',
        headers:
          {
            'x-api-key': createStrategyApiKey,
          },
        body: JSON.stringify({
         strategy: strategyObject,
       }),
      })
      .then(response => response.json())
      .then((sResult => {
          console.log(sResult);
          //TBD: error handling
          // TBD: disable save and cancel buttons and show a saving message
          if(sResult.errorType)
          {
            this.setState({
              alertText: "Unable to create your strategy due to a technical issue, please retry in some time!",
            });
            if(!this.state.alertVisible)
            {
              this.setAlertVisible();
            }
          }
          else
          {
            this.props.toggleModal(true);
          }
      }));
    }
  }


  render()
  {
    const errors = this.validateStrategyNameAndDesc(this.props.newRules.strategyName, this.props.newRules.strategyDesc);
      return (
        <div>
          <Modal toggle={this.props.toggleModal} isOpen={this.props.modalOpen} size="lg">
            <div className=" modal-header">
              <h5 className=" modal-title" id="createStrategyModalLabel">
                Create a new strategy
              </h5>
              <button
                aria-label="Close"
                className=" close"
                type="button"
                onClick={this.props.toggleModal}
              >
                <span aria-hidden={true}>×</span>
              </button>
            </div>
            <Alert color="danger" isOpen={this.state.alertVisible} toggle={this.setAlertVisible}>
              {this.state.alertText}
            </Alert>
            <ModalBody>
              <Form onSubmit={this.createStrategy}>
                <FormGroup>
                    <Label htmlFor="strategyName">Strategy Name</Label>
                    <Input type="text" id="strategyName" name="strategyName"
                    value = {this.props.newRules.strategyName}
                    onChange={(value) => this.handleInputChange(value)}
                    onBlur={(value) => this.handleBlurChange(value)}
                    invalid={errors.strategyNameError !== ''}
                    placeholder="Enter strategy name"
                    />
                    <FormFeedback>{errors.strategyNameError}</FormFeedback>
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="strategyDesc">Strategy Description</Label>
                    <Input type="text" id="strategyDesc" name="strategyDesc"
                    value = {this.props.newRules.strategyDesc}
                    onBlur={(value) => this.handleBlurChange(value)}
                    onChange={(value) => this.handleInputChange(value)}
                    invalid={errors.strategyDescError !== ''}
                    placeholder="Enter strategy description"
                    />
                    <FormFeedback>{errors.strategyDescError}</FormFeedback>
                </FormGroup>
                <Rule
                  strategyRules = {this.props.strategyRules}
                  newRules = {this.props.newRules}
                  add_rule = {this.props.add_rule}
                  edit_rule = {this.props.edit_rule}
                  delete_rule = {this.props.delete_rule}
                  delete_all_rules = {this.props.delete_all_rules}
                  add_rule_errors = {this.props.add_rule_errors}
                  edit_rule_error = {this.props.edit_rule_error}
                  delete_rule_error = {this.props.delete_rule_error}
                  delete_all_rule_errors = {this.props.delete_all_rule_errors}
                >
                </Rule>
                <Button id = "SaveButton" type="submit" value="submit" color="primary">SAVE</Button>
                <Button id = "CancelButton" color="secondary" onClick = {this.props.toggleModal} >CANCEL</Button>
              </Form>
            </ModalBody>
        </Modal>
      </div>
      );
  }
}

export default AddEditStrategy;
