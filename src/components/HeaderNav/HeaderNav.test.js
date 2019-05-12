import React from 'react';
import ReactDOM from 'react-dom';
import HeaderNav from './HeaderNav';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<HeaderNav/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
