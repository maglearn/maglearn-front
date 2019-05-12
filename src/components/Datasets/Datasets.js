import React from 'react';
import './Datasets.css';
import Table from "react-bootstrap/Table";
import MathJax from "react-mathjax";

function Datasets() {
  return <>
    <h2>Datasets</h2>
    <DatasetList/>
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
        {this.state.datasets.map(d => <DatasetRow key={d.name} dataset={d}/>)}
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
        <MathJax.Provider>
          <MathJax.Node formula={props.dataset.source_function}/>
        </MathJax.Provider>
      </td>
    </tr>
  );
}

export default Datasets;