import React from 'react';
import './Datasets.css';
import 'katex/dist/katex.min.css';
import {Button, Form, Table, Modal} from "react-bootstrap";
import {NavTab, RoutedTabs} from "react-router-tabs";
import {Redirect, Route, Switch} from "react-router-dom";
import {BlockMath} from "react-katex";
import Content from "../Content/Content";
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import * as Yup from "yup";

// TODO: 18.05.2019 John - create proper service layer
const datasetsEndpoint = "http://localhost:5000/api/datasets/";

function Datasets({match}) {
  return (
    <Content header="Datasets">
      <RoutedTabs startPathWith={match.path} className="nav nav-tabs actions-nav"
                  tabClassName="nav-link"
                  activeTabClassName="active">
        <NavTab to="/list">List</NavTab>
        <NavTab to="/create">Create</NavTab>
      </RoutedTabs>
      <Switch>
        <Route path={`${match.path}/list`} component={DatasetList}/>
        <Route path={`${match.path}/create`} component={DatasetCreate}/>
        <Route render={() => <Redirect replace to={`${match.path}/list`}/>}/>
      </Switch>
    </Content>
  );
}

class DatasetList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      datasets: []
    };
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    // TODO: 12.05.2019 John - proper service layer and some state management - redux?
    fetch(datasetsEndpoint)
      .then(res => res.json())
      .then(json => this.setState({datasets: json}));
  }

  handleDelete(datasetId) {
    fetch(datasetsEndpoint + `${datasetId}`, {
      method: 'DELETE'
    }).then(res => {
      if (res.status === 204) {
        this.setState({
          datasets: this.state.datasets.filter((d) => d.id !== datasetId)
        });
      }
    });
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
          <th scope="col">Actions</th>
        </tr>
        </thead>
        <tbody>
        {this.state.datasets.map(d => <DatasetRow key={d.id} dataset={d} handleDelete={this.handleDelete}/>)}
        </tbody>
      </Table>
    );
  }
}

function DatasetRow({dataset, handleDelete}) {
  return (
    <tr>
      <th scope="row">
        {dataset.id}
      </th>
      <td>
        {dataset.name}
      </td>
      <td>
        {dataset.size}
      </td>
      <td>
        <BlockMath>{`\\begin{gathered} ${dataset.source_function} \\end{gathered}`}</BlockMath>
      </td>
      <td>
        <Button variant="danger" size="sm" onClick={() => handleDelete(dataset.id)}>
          Delete
        </Button>
      </td>
    </tr>
  );
}

const DatasetCreateSchema = Yup.object().shape({
  size: Yup.number()
    .required()
    .positive()
    .integer(),
  name: Yup.string()
    .notRequired()
    .min(1)
    .max(255),
});

function DatasetCreate() {
  return (
    <>
      <Formik
        initialValues={{size: 10000, name: ""}}
        validationSchema={DatasetCreateSchema}
        onSubmit={(values, actions) => {
          fetch(datasetsEndpoint, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(values),
          });
          setTimeout(() => actions.setSubmitting(false), 500);
        }}
        render={({errors, isSubmitting}) => (
          <Form as={FormikForm} noValidate>
            <Form.Row>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  as={Field}
                  type="text"
                  name="name"
                  placeholder="Generated"
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">
                  <ErrorMessage name="name"/>
                </Form.Control.Feedback>
                <Form.Text>If left empty name will be generated as readable and easy memorizable 3 word (e.g.
                  purely-full-bison)</Form.Text>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="size">
                <Form.Label>Size</Form.Label>
                <Form.Control
                  as={Field}
                  type="number"
                  name="size"
                  step="100"
                  isInvalid={!!errors.size}
                />
                <Form.Control.Feedback type="invalid">
                  <ErrorMessage name="size"/>
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Button
                type="submit"
                variant="success"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Create"}
              </Button>
            </Form.Row>
          </Form>
        )}
      />
    </>
  );
}

export default Datasets;