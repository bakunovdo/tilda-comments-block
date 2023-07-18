import { Accessor, Component, ErrorBoundary, For, Match, Switch, createResource } from 'solid-js';

import { CommentCard, CommentCardSkeleton } from './comment';

import { Comment } from '../types';
import { PAGE_SIZE } from '../api';
import { LEFT_DOT, RIGHT_DOT, createPagination } from '../shared/create-pagination';
import { LoaderSpin } from '../shared/ui/loader-spin';
import { clxName } from '../config';

interface Props {
  comments: Comment[];
  page: Accessor<number>;
  onPageClick: (page: number) => void;
  count: number;
  isLoading?: boolean;
}

export const CommentsList: Component<Props> = (props) => {
  const len = props.comments.length ?? 0;

  const getPagination = createPagination({
    getCurrentPage: props.page,
    pageSize: PAGE_SIZE,
    totalCount: props.count,
    siblingCount: 2,
  });

  const totalPages = Math.ceil(props.count / props.page());

  return (
    <Switch>
      <Match when={len > 0}>
        <Switch>
          <Match when={props.isLoading}>
            <CommentCardSkeleton />
            <div class="my-2 mx-2" />
            <CommentCardSkeleton />
          </Match>

          <Match when={!props.isLoading}>
            <div id={clxName('comment-container')} class={`w-full bg-white rounded-md`}>
              <For each={props.comments}>
                {(comment, id) => {
                  const isNotLast = id() < len - 1;

                  return (
                    <>
                      <CommentCard {...comment} />
                      {isNotLast && <div class="my-4 mx-2" />}
                    </>
                  );
                }}
              </For>
            </div>
          </Match>
        </Switch>

        <div id={clxName('pagination_container')} class={`flex mt-4 gap-1`}>
          {getPagination() &&
            getPagination()?.map((page) => {
              const currentPage = props.page();

              if (currentPage === page) {
                return <PaginationButton page={page} isCurrentPage />;
              }

              let nextPage = page;

              if (page === LEFT_DOT) nextPage = Math.max(1, currentPage - 5);
              if (page === RIGHT_DOT) nextPage = Math.min(totalPages, currentPage + 5);

              return (
                <PaginationButton
                  page={page < 0 ? '...' : page}
                  onClick={() => props.onPageClick(nextPage)}
                />
              );
            })}
        </div>
      </Match>
    </Switch>
  );
};

function PaginationButton({
  isCurrentPage,
  onClick,
  page,
}: {
  isCurrentPage?: boolean;
  onClick?: () => void;
  page: number | string;
}) {
  return (
    <button
      data-iscurrent={Boolean(isCurrentPage)}
      id={clxName('pagination-button')}
      class={`px-3 py-1 select-none transition-colors rounded`}
      classList={{
        'bg-blue-700 text-white cursor-default': isCurrentPage,
        'cursor-pointer  hover:bg-slate-100': !isCurrentPage,
      }}
      onClick={onClick}
    >
      {page}
    </button>
  );
}
