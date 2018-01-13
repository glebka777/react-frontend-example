import React from 'react';
import ReactDOM from 'react-dom';
import './container/index.css';
import App from './container/App';
import registerServiceWorker from './util/registerServiceWorker';

import 'bootstrap/dist/css/bootstrap.css';

ReactDOM.render(<App/>, document.getElementById('root'));
registerServiceWorker();