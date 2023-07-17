/* @refresh reload */
import { render } from 'solid-js/web';

import './index.css';
import { Application } from './application';

const root = document.getElementById('comments-block');

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  );
}

render(() => <Application />, root!);
