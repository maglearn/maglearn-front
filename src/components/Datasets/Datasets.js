import React from 'react';
import './Datasets.css';
import Table from "react-bootstrap/Table";
import MathJax from "react-mathjax";
import {NavTab, RoutedTabs} from "react-router-tabs";
import {Redirect, Route, Switch} from "react-router-dom";

function Datasets({match}) {
  return <>
    <h2>Datasets</h2>
    <hr/>
    <RoutedTabs startPathWith={match.path} className="nav nav-tabs actions-nav"
                tabClassName="nav-link"
                activeTabClassName="active">
      <NavTab to="/list">List</NavTab>
      <NavTab to="/create">Create</NavTab>
    </RoutedTabs>
    <MathJax.Provider>
      <Switch>
        <Route path={`${match.path}/list`} component={DatasetList}/>
        <Route path={`${match.path}/create`} component={DatasetCreate}/>
        <Route render={() => <Redirect replace to={`${match.path}/list`}/>}/>
      </Switch>
    </MathJax.Provider>
  </>
}

class DatasetList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datasets: []
    };
  }

  componentDidMount() {
    // TODO: 12.05.2019 John - proper service layer and some state management - redux?
    fetch("http://localhost:5000/datasets/api/list")
      .then(res => res.json())
      .then(json => this.setState({datasets: json}));
  }

  render() {
    return (
      <Table striped borderless hover responsive>
        <caption className="sr-only">List of Datasets</caption>
        <thead>
        <tr>
          <th scope="col">Id</th>
          <th scope="col">Name</th>
          <th scope="col">Size</th>
          <th scope="col">Function</th>
        </tr>
        </thead>
        <tbody>
        {this.state.datasets.map(d => <DatasetRow key={d.id} dataset={d}/>)}
        </tbody>
      </Table>
    );
  }
}

function DatasetRow(props) {
  return (
    <tr>
      <th scope="row">
        {props.dataset.id}
      </th>
      <td>
        {props.dataset.name}
      </td>
      <td>
        {props.dataset.size}
      </td>
      <td>
        <MathJax.Node formula={props.dataset.source_function}/>
      </td>
    </tr>
  );
}

function DatasetCreate() {
  return (
    <h3>Create</h3>
  );
}

export default Datasets;