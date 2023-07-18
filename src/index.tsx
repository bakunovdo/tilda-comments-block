/* @refresh reload */
import { render } from 'solid-js/web';

import { Application } from './application';
import { APP_CONFIG } from './config';

import './index.css';

const root = document.getElementById(APP_CONFIG.CONTAINER_ID);

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() => <Application />, root!);
