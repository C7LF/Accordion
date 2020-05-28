import React from 'react';
import { shallow } from 'enzyme';

import App from './App'

describe('Should render app correctly', () => {
  test('App renders without crashing', () => {
    shallow(<App />)
  })

})