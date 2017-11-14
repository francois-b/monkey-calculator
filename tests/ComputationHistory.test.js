/* eslint react/jsx-filename-extension: "off" */
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { ComputationHistory } from '../src/components/ComputationHistory.jsx';

Enzyme.configure({ adapter: new Adapter() });

describe('ComputationHistory', () => {
  it('filters results correctly', () => {
    const wrapper = shallow(<ComputationHistory
      computationHistory={['123', '456', '5+123*8', '0']}
      searchValue="123"
    />);
    expect(wrapper.getElement().props.children).toHaveLength(2);
  });
});
