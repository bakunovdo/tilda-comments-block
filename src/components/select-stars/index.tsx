import { Component, createEffect, createSignal } from 'solid-js';

import { Rate0, Rate1, Rate2, Rate3, Rate4, Rate5 } from './emoji-rates';
import styles from './index.module.scss';

type Props = {
  onChange?: (rating: number) => void;
};

export const SelectStars: Component<Props> = (props) => {
  const [selected, setSelected] = createSignal(-1);

  createEffect(() => {
    if (props.onChange) {
      props.onChange(selected());
    }
  });

  return (
    <div class="flex items-center justify-center p-2 rounded-md">
      <div class={styles.feedback}>
        <div class={styles.rating}>
          <input type="radio" name="rating" id={styles.rating5} onClick={() => setSelected(5)} />
          <label for={styles.rating5}></label>
          <input type="radio" name="rating" id={styles.rating4} onClick={() => setSelected(4)} />
          <label for={styles.rating4}></label>
          <input type="radio" name="rating" id={styles.rating3} onClick={() => setSelected(3)} />
          <label for={styles.rating3}></label>
          <input type="radio" name="rating" id={styles.rating2} onClick={() => setSelected(2)} />
          <label for={styles.rating2}></label>
          <input type="radio" name="rating" id={styles.rating1} onClick={() => setSelected(1)} />
          <label for={styles.rating1}></label>
          <div class={styles.emoji_wrapper}>
            <div class={styles.emoji}>
              <Rate0 />
              <Rate1 />
              <Rate2 />
              <Rate3 />
              <Rate4 />
              <Rate5 />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
