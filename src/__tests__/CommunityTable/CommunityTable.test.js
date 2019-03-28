import React from 'react';
import ReactDOM from 'react-dom';
import CommunityTable from '../../components/CommunityTable/CommunityTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CommunityTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
