import { For, Component } from 'solid-js';
import { Icon } from 'solid-heroicons';

import { exclamationTriangle } from 'solid-heroicons/outline';

import { ICON_SIZE } from './const';

export const Error: Component<{ title: string }> = (props) => {
  return (
    <div class="comment px-4 bg-white flex py-2 m-2">
      <Icon
        path={exclamationTriangle}
        class="mr-2 text-red-700"
        width={ICON_SIZE}
        height={ICON_SIZE}
      />
      <span>{props.title}</span>
    </div>
  );
};
