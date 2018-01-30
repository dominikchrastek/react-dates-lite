/* @flow */
import * as React from 'react';
import { render } from 'react-dom';

import Example from './Example';

const app = document.getElementById('react');

if (app) {
  render(<Example />, app);
}

if (module.hot) {
  module.hot.accept();
}
