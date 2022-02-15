import './index.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './components/App';
import { ElementConfigProvider } from './components/ElementConfig';
import { EnsureKontentAsParent } from './components/EnsureKontentAsParent';

const htmlRoot = document.getElementById('root');
if (!htmlRoot) {
  throw new Error('Invalid html, cannot find element with id "root".');
}

const root = ReactDOM.createRoot(htmlRoot);

root.render(
  <EnsureKontentAsParent>
    <ElementConfigProvider>
      <App />
    </ElementConfigProvider>
  </EnsureKontentAsParent>,
);
