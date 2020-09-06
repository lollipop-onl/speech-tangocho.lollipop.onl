import React from 'react';
import ReactDom from 'react-dom';
import { RecoilRoot  } from 'recoil';
import { AppContainer } from './containers/App';

ReactDom.render(<RecoilRoot><AppContainer /></RecoilRoot>, document.getElementById('root'));
