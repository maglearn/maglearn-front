import React, {Component} from 'react';
import './App.css';
import Header from "./components/Header/Header";
import Container from "react-bootstrap/Container";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Datasets from "./components/Datasets/Datasets";
import Row from "react-bootstrap/Row";
import Image from "react-bootstrap/Image";
import Col from "react-bootstrap/Col";
import Content from "./components/Content/Content";

class App extends Component {
  // TODO: Flash messages
  // TODO: 12.05.2019 John - Extract Header component
  render() {
    return (
      <BrowserRouter>
        <Container className="app">
          <Header/>
          <Row>
            <Col as="main">
              <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/datasets" component={Datasets}/>
                <Route path="/networks" component={Home}/>
              </Switch>
            </Col>
          </Row>
          <Footer/>
        </Container>
      </BrowserRouter>
    );
  }
}

function Home() {
  return (
    <Content header="Welcome to maglearn">
      <Image alt="maglearn logo" src="logo-full.png" style={{width: "600px"}} fluid/>
    </Content>
  );
}

function Footer() {
  // TODO: 12.05.2019 John - make contact mail confiurable
  return <footer>
    <hr/>
    <em>maglearn</em> by <a href="mailto:contact_mail(at)domain">Jan Kumor</a>
    , <a href="http://www.elka.pw.edu.pl/"
         target="_blank"
         rel="noopener noreferrer">EITI PW</a>
  </footer>
}

export default App;
