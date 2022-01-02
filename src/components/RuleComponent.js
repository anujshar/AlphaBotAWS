import React, { Component } from 'react';
import { Container, Row, Col , Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import DropDownRule from './DropDownRuleComponent';
import { multipleDropDownOptions } from '../shared/dropDownOptions.js'

class Rule extends Component
{
  constructor(props)
  {
    super(props);
    this.addNewRule = this.addNewRule.bind(this);
  }

  handleInputChange(e)
  {
    var ruleId = e.target.id.substring(e.target.name.length);
    var updatedRule = this.props.newRules.rules[ruleId];
    updatedRule.criteriaValue = e.target.value;
    this.props.edit_rule(ruleId, updatedRule);
  }

  addNewRule()
  {
    var rule = {
      'ruleId': this.props.newRules.rules.length,
      'multiple': '--select--',
      'multipleSelectOptions': multipleDropDownOptions,
      'criteria': '--select--',
      'criteriaSelectOptions': '',
      'criteriaDisabled': true,
      'criteriaValue': '',
      'criteriaValueDisabled': true,
    };

    var ruleError = {
      'ruleId': this.props.newRules.rules.length,
      'multipleError': '',
      'criteriaError': '',
      'criteriaValueError': '',
    };

    this.props.add_rule(rule);
    this.props.add_rule_errors(ruleError);
  }

  getFirstRule()
  {
    if (this.props.strategyRules.length === 0)
    {
        return(
          <FormGroup row className = "border border-dark rounded p-1">
              <Label col sm = {12}>Rule</Label>
              <Label xs = {12} col sm = {12} md = {2} htmlFor="multiple">Multiple</Label>
              <Col xs = {12} sm = {12} md = {2}>
                <DropDownRule id = "multiple">
                </DropDownRule>
              </Col>
              <Label xs = {12} col sm = {12} md = {2} htmlFor="criteria">Criteria</Label>
              <Col xs = {12} sm = {12} md = {2}>
              <DropDownRule id = "criteria">
              </DropDownRule>
              </Col>
              <Label xs = {12} col sm = {12} md = {2} htmlFor="criteriaValue">Criteria Value</Label>
              <Col xs = {12} sm = {12} md = {2}>
                <Input xs = {12} col sm = {12} md = {2} type="text" id="criteriaValue" name="criteriaValue"/>
              </Col>
          </FormGroup>
        );
    }
  }

  render()
  {
      return (
        <div>
                {this.props.newRules.rules.map((rule, index) => (
                  <FormGroup key = {index} row className = "border border-dark rounded p-1">
                      <Label sm = {12}>Rule</Label>
                      <Label xs = {12} sm = {12} md = {2} htmlFor="multiple">Multiple</Label>
                      <Col xs = {12} sm = {12} md = {2}>
                        <DropDownRule id = {"multiple"+rule.ruleId}
                          rule = {rule}
                          ruleSelectOptions = {rule.multipleSelectOptions}
                          edit_rule = {this.props.edit_rule}
                          dropDownValue = {rule.multiple}
                          invalid = {this.props.newRules.ruleErrors[index].multipleError}
                          >
                        </DropDownRule>
                      </Col>
                      <Label xs = {12} sm = {12} md = {2} htmlFor="criteria">Criteria</Label>
                      <Col xs = {12} sm = {12} md = {2}>
                      <DropDownRule id = {"criteria"+rule.ruleId}
                        rule = {rule}
                        ruleSelectOptions = {rule.criteriaSelectOptions}
                        edit_rule = {this.props.edit_rule}
                        disabled = {rule.criteriaDisabled}
                        dropDownValue = {rule.criteria}
                        invalid = {this.props.newRules.ruleErrors[index].criteriaError}
                        >
                      </DropDownRule>
                      </Col>
                      <Label xs = {12} sm = {12} md = {2} htmlFor="criteriaValue">Criteria Value</Label>
                      <Col xs = {12} sm = {12} md = {2}>
                        <Input xs = {12} sm = {12} md = {2}
                        type="text"
                        pattern="[0-9]*"
                        id={"criteriaValue"+rule.ruleId}
                        name="criteriaValue"
                        readOnly = {rule.criteriaValueDisabled}
                        invalid = {this.props.newRules.ruleErrors[index].criteriaValueError !== ''}
                        onChange={(value) => this.handleInputChange(value)}
                        />
                        <FormFeedback>{this.props.newRules.ruleErrors[index].criteriaValueError}</FormFeedback>
                      </Col>
                  </FormGroup>
                ))}
                <Button color="primary" onClick = {this.addNewRule}>ADD RULE</Button>
        </div>
      );
  }

}
export default Rule;
