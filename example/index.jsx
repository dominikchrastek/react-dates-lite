/* @flow */
import * as React from 'react';
import { render } from 'react-dom';

import Example from './Example';

const app = document.getElementById('react');

if (app) {
  render(<Example />, app);
}

// $FlowFixMe
if (module.hot) {
  // $FlowExpected
  module.hot.accept();
}
