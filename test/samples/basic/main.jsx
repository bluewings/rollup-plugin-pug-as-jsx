import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Basic from './Basic';

const div = document.createElement('div');
ReactDOM.render(<Basic name="world" />, div);
ReactDOM.unmountComponentAtNode(div);
