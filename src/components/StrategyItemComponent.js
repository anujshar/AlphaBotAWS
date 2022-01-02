import React, { Component } from 'react';
import { Collapse, Button, CardBody, Card, CardHeader, Table, Container, Row, Col } from 'reactstrap';

import { computeStrategyUrl } from '../shared/urls';
import { computeStrategyApiKey } from '../shared/urls';
import { Loading } from './LoadingComponent';


class StrategyItem extends Component
{
  constructor(props)
  {
    super(props);
    this.toggle = this.toggle.bind(this);
  }

  toggle()
  {
    var openState = !this.props.isOpen;
    this.props.toggleListItem(this.props.strategyId, openState);
    // fetch results if the strategy is opened
    if(openState === true)
    {
      this.props.update_result_loading(this.props.strategyId, true);
      var query = "strategyId="+this.props.strategyId.toString();

      // TBD: error handling when the API fails
      fetch(computeStrategyUrl + query, {
        method: 'GET',
        headers:
          {
            'x-api-key': computeStrategyApiKey,
            'Content-Type': 'application/json',
          }
      })
      .then(response => response.json())
      .then((sResult => {

        if(sResult.length > 0)
        {
            // delete pre-existing results for this strategy from the state
            this.props.deleteResultRows(this.props.strategyId);

            // add fetched results to state
            for (var i = 0; i< sResult.length; i++)
            {
              sResult[i]['strategyId'] = this.props.strategyId;
              this.props.addResultRow(sResult[i]);
            }
            this.props.update_result_loading(this.props.strategyId, false);
        }
      }));
    }
  }

  getHeader()
  {
    if (this.props.strategyResult.length > 0)
    {
        const keys = Object.keys(this.props.strategyResult[0]);
        return keys.map((key, index)=>{
              if(key.toUpperCase() !== "STRATEGYID")
              {
                return <th key={key}>{key.toUpperCase()}</th>;
              }
              else
              {

              }
            });
    }
  }

  getRowsData()
  {
     var items = this.props.strategyResult;
     if (this.props.strategyResult.length > 0)
     {
         var keys = Object.keys(this.props.strategyResult[0]);
         return items.map((row, index)=>{
         return <tr key={index}><RenderRow key={index} data={row} keys={keys}/></tr>
        });
    }
  }

  getCardBodyContent()
  {
    if(this.props.isLoading.length == 0)
    {
      return (
        <div className="container">
            <div className="row">
                <Loading />
            </div>
        </div>
      );
    }
    else if(this.props.isLoading[0].isLoading)
    {
      return (
      <div className="container">
          <div className="row">
              <Loading />
          </div>
      </div>
      );
    }
    else
    {
      return (
        <Table>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>{this.getRowsData()}</tbody>
        </Table>
      );
    }
  }

  render()
  {
      return (
              <div>
                <Container>
                  <Row>
                    <Col xs = {12} sm = {12} md = {6}>
                      <CardHeader color="primary" onClick={this.toggle} style={{ marginBottom: '1rem' }}>{this.props.strategyName}</CardHeader>
                    </Col>
                    <Col xs = {12} sm = {12} md = {6} style = {{position: "sticky"}} >
                      <Collapse isOpen={this.props.isOpen}>
                        <Card>
                          <CardBody>
                            {this.getCardBodyContent()}
                          </CardBody>
                        </Card>
                      </Collapse>
                    </Col>
                  </Row>
                </Container>
            </div>
            );
  }
}

const RenderRow = (props) =>{
 return props.keys.map((key, index)=>{
   if(key.toUpperCase() !== "STRATEGYID")
   {
     return <td key={props.data[key]}>{props.data[key]}</td>
   }
 })
}

export default StrategyItem;
