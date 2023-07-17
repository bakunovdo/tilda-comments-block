import { For, Component } from 'solid-js';
import { Icon } from 'solid-heroicons';

import { star as starOutline } from 'solid-heroicons/outline';
import { star as starFilled } from 'solid-heroicons/solid';

import { Array5Len, ICON_SIZE } from './const';

import { Comment } from '../types';

const months: Record<string, string> = {
  1: 'января',
  2: 'февраля',
  3: 'марта',
  4: 'апреля',
  5: 'мая',
  6: 'июня',
  7: 'июля',
  8: 'августа',
  9: 'сентября',
  10: 'октября',
  11: 'ноября',
  12: 'декабря',
};

// year-month-day
function formatDate(str: string): string {
  const [y, m, d] = str.split('-');

  return `${d} ${months[Number(m)]}, ${y} г.`;
}

export const CommentCard: Component<Comment> = (comment) => {
  return (
    <article
      class="comment px-4 py-4 bg-white rounded-md flex flex-col border"
      data-id={comment.id}
    >
      <div class="comment_header flex justify-between">
        <h4 class="comment_header__name mr-4 font-bold line-clamp-1" title={comment.name}>
          {comment.name}
        </h4>
        <div class="comment_stars flex">
          <For each={Array5Len}>
            {(_, id) => {
              if (id() + 1 <= comment.rating) {
                return <Icon path={starFilled} width={ICON_SIZE} />;
              }
              return <Icon path={starOutline} width={ICON_SIZE} />;
            }}
          </For>
        </div>
      </div>
      <p class="comment_text my-2 line-clamp-3">{comment.comment}</p>
      <div class="comment_date flex items-end justify-end text-gray-500">
        {formatDate(comment.created_at)}
      </div>
      {import.meta.env.DEV && (
        <div
          class="text-white w-fit px-2"
          classList={{
            'bg-green-700': comment.show === true,
            'bg-red-700': comment.show === false,
          }}
        >
          {comment.show ? 'moderatted' : 'need review'}
        </div>
      )}
    </article>
  );
};

export const CommentCardSkeleton = () => {
  return (
    <div
      role="status"
      class="max-w-xs animate-pulse px-4 py-4 bg-white rounded-md flex flex-col border w-[320px]"
    >
      <div class="flex justify-between">
        <div class="h-3 bg-gray-200 rounded-full w-36 mb-4"></div>
        <div class="flex gap-1">
          <div class="h-3 w-3 bg-gray-200 rounded-full mb-4"></div>
          <div class="h-3 w-3 bg-gray-200 rounded-full mb-4"></div>
          <div class="h-3 w-3 bg-gray-200 rounded-full mb-4"></div>
          <div class="h-3 w-3 bg-gray-200 rounded-full mb-4"></div>
          <div class="h-3 w-3 bg-gray-200 rounded-full mb-4"></div>
        </div>
      </div>

      <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full mb-2.5"></div>
      <div class="h-2 bg-gray-200 rounded-full mb-4"></div>
      <div class="h-2 self-end bg-gray-200 rounded-full w-[100px]"></div>
      <span class="sr-only">Loading...</span>
    </div>
  );
};
