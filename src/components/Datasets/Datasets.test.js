import React from 'react';
import ReactDOM from 'react-dom';
import Datasets from './Datasets';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Datasets/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
