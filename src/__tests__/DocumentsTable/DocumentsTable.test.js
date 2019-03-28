import React from 'react';
import ReactDOM from 'react-dom';
import DocumentsTable from '../../components/DocumentsTable/DocumentsTable';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<DocumentsTable />, div);
  ReactDOM.unmountComponentAtNode(div);
});
