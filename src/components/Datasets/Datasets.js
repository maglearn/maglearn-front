import React, {Fragment} from 'react';
import './Datasets.css';
import Container from "react-bootstrap/Container";
import Table from "react-bootstrap/Table";

function Datasets(props) {
  return <Fragment>
    <h2>Datasets</h2>
    <Table>
      <caption className="sr-only">List of Datasets</caption>
    </Table>
  </Fragment>
}

export default Datasets;