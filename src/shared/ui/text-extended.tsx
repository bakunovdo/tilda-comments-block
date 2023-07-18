import { Component, JSX, Show, createEffect, createSignal } from 'solid-js';

import { arrowDown } from 'solid-heroicons/solid-mini';
import { Icon } from 'solid-heroicons';
import { ICON_SIZE } from '../../components/const';

interface Props extends JSX.HTMLAttributes<HTMLParagraphElement> {
  content: string;
}

export const TextExtended: Component<Props> = ({ content, ...attr }) => {
  const { class: topClass, ...rattr } = attr;
  let ref: HTMLParagraphElement;

  const [isCollapsed, setCollapsed] = createSignal(true);
  const [isShowButton, setShowButton] = createSignal(false);

  createEffect(() => {
    const isShouldShow = ref.offsetHeight < ref.scrollHeight || ref.offsetWidth < ref.scrollWidth;
    setShowButton(isShouldShow);
  });

  return (
    <div class="relative my-2">
      <p
        ref={(el) => (ref = el)}
        classList={{
          [`${topClass} pr-8 transition-all duration-500`]: true,
          [`line-clamp-3 max-h-[6em]`]: isCollapsed(),
          [`line-clamp-[40] max-h-[40em] `]: !isCollapsed(),
        }}
        {...rattr}
      >
        {content}
      </p>
      <Show when={isShowButton()}>
        <div
          title={isCollapsed() ? 'Раскрыть' : 'Скрыть'}
          class="w-fit ml-auto absolute right-0 bottom-0 hover:opacity-80 cursor-pointer transition-opacity duration-300"
          onClick={() => setCollapsed((v) => !v)}
        >
          {
            <Icon
              path={arrowDown}
              width={ICON_SIZE}
              classList={{
                'transition-all duration-300': true,
                'rotate-180': !isCollapsed(),
              }}
            />
          }
        </div>
      </Show>
    </div>
  );
};
