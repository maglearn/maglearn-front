import React from 'react';
import './Datasets.css';
import 'katex/dist/katex.min.css';
import {Button, Form, Table} from "react-bootstrap";
import {NavTab, RoutedTabs} from "react-router-tabs";
import {Redirect, Route, Switch} from "react-router-dom";
import {BlockMath} from "react-katex";
import Content from "../Content/Content";
import {ErrorMessage, Field, Form as FormikForm, Formik} from "formik";
import * as Yup from "yup";

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

function DatasetRow({dataset}) {
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
      <h3>Create</h3>
      <Formik
        initialValues={{size: 10000}}
        validationSchema={DatasetCreateSchema}
        onSubmit={(values, actions) => {
          console.log(values);
        }}
        render={({errors}) => (
          <Form noValidate as={FormikForm}>
            <Form.Row>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control as={Field} name="name" isInvalid={errors.name}/>
                <Form.Control.Feedback type="invalid">
                  <ErrorMessage name="name"/>
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group controlId="size">
                <Form.Label>Size</Form.Label>
                <Form.Control as={Field} type="number" name="size" step="100" isInvalid={errors.size}/>
                <Form.Control.Feedback type="invalid">
                  <ErrorMessage name="size"/>
                </Form.Control.Feedback>
              </Form.Group>
            </Form.Row>
            <p>
              <Button type="submit" variant="success">Create</Button>
            </p>
          </Form>
        )}
      />
    </>
  );
}

export default Datasets;