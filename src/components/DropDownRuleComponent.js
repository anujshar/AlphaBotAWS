import '../styles/CommonStyles.css'
import React, { Component } from 'react';
import { Container, Row, Col , Form, FormGroup, Dropdown, DropdownItem, DropdownToggle, DropdownMenu } from 'reactstrap';
import { returnsCriteriaDropDown } from '../shared/dropDownOptions.js'

class DropDownRule extends Component
{
  constructor(props)
  {
    super(props);
    this.state = {
      dropDownOpen: false,
    }
    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.changeValue = this.changeValue.bind(this);
  }

  toggleDropDown()
  {
    if(!this.props.disabled)
    {
      this.setState({
        dropDownOpen: !this.state.dropDownOpen
      })
    }
  }

  changeValue(e)
  {
    var updatedRule = this.props.rule;
    if(this.props.id.startsWith("multiple"))
    {
      updatedRule['multiple'] = e.currentTarget.textContent;

      switch(e.currentTarget.textContent)
      {
        case "3M return":
        case "6M return":
        case "9M return":
        case "1Y return":
        case "2Y return":
        case "3Y return":
          updatedRule['criteriaSelectOptions'] = returnsCriteriaDropDown;
          updatedRule['criteriaDisabled'] = false;
          break;
        default:
          return;
      }
    }
    else if(this.props.id.startsWith("criteria"))
    {
      updatedRule['criteria'] = e.currentTarget.textContent;

      switch(e.currentTarget.textContent)
      {
        case "Top x%":
        case "Bottom x%":
          updatedRule['criteriaValueDisabled'] = false;
          break;
        case "Top 25%":
        case "Bottom 25%":
        case "Top 10%":
        case "Bottom 10%":
          updatedRule['criteriaValueDisabled'] = true;
          break;
        default:
          return;
      }
    }
    this.props.edit_rule(this.props.rule.ruleId, updatedRule);

    //this.postSelectActions(e.currentTarget.textContent);
  }

  postSelectActions(selectedText)
  {
    if(this.props.id.startsWith("multiple"))
    {
      switch(selectedText)
      {
        case "3M return":
        case "6M return":
        case "9M return":
        case "1Y return":
        case "2Y return":
        case "3Y return":
          var updatedRule = this.props.rule;
          updatedRule['criteriaSelectOptions'] = returnsCriteriaDropDown;
          updatedRule['criteriaDisabled'] = false;
          this.props.edit_rule(this.props.rule.ruleId, updatedRule);
          break;
        default:
          return;
      }
    }
    else if(this.props.id.startsWith("criteria"))
    {
      switch(selectedText)
      {
        case "Top x%":
        case "Bottom x%":
          var updatedRule = this.props.rule;
          updatedRule['criteriaValueDisabled'] = false;
          this.props.edit_rule(this.props.rule.ruleId, updatedRule);
          break;
        case "Top 25%":
        case "Bottom 25%":
        case "Top 10%":
        case "Bottom 10%":
          var updatedRule = this.props.rule;
          updatedRule['criteriaValueDisabled'] = true;
          this.props.edit_rule(this.props.rule.ruleId, updatedRule);
          break;
        default:
          return;
      }
    }
    else
    {

    }
  }

  generateDropDownMenu()
  {
    var arr = [];
    for (var i =0; i< this.props.ruleSelectOptions.length; i++)
    {
      arr.push(this.props.ruleSelectOptions[i]);
    }
    return(
      <div>
      {arr.map((item, i) => (
          ("header" in item) ? <div key = {i}><DropdownItem key = {i} header>{item.header}</DropdownItem> {this.renderDropDownMenu(item.Items)}</div>: <div key = {i}>{this.renderDropDownMenu(item.Items)}</div>
      ))}
      </div>
    );

  }

  renderDropDownMenu(items)
  {
   return items.map((item, index)=>{
   return <DropdownItem key = {index} onClick = {this.changeValue}>{item.itemName}</DropdownItem>
   })
  }

  render()
  {
    var errorVisibility = (this.props.invalid === "") ? "hidden" : "visible";
      return (
        <div>
        <Dropdown isOpen={this.state.dropDownOpen} toggle={this.toggleDropDown}>
          <DropdownToggle color = {(this.props.disabled) ? "secondary" : "primary"} caret>
            {this.props.dropDownValue}
          </DropdownToggle>
          <DropdownMenu>
            {this.generateDropDownMenu()}
          </DropdownMenu>
        </Dropdown>
        <div class="invalid-input" style={{visibility: errorVisibility}}>{this.props.invalid}</div>
      </div>
      );
  }
}

export default DropDownRule;
