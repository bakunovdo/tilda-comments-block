import {
  createResource,
  type Component,
  ErrorBoundary,
  Switch,
  Match,
  createEffect,
  createSignal,
} from 'solid-js';

import { AddCommentForm } from './components/add-comment';
import { CommentsList } from './components/comments-list';
import { RequestError, getComments } from './api';
import { Error } from './components/error';

export const Application: Component = () => {
  const [page, setPage] = createSignal(1);
  const [data] = createResource(page, (page) => getComments(page));

  return (
    <Switch>
      <ErrorBoundary fallback={<></>}>
        <Match when={data.error}>
          <Switch>
            <Match when={data.error?.message === RequestError.DATABASE_SLEEP}>
              <Error title={'БД лежит, санечка, поднимай'} />
            </Match>
          </Switch>
        </Match>
        <Match when={data()}>
          <section class="comments-container w-full max-w-2xl flex flex-col items-center justify-center mx-auto p-4">
            <CommentsList
              comments={data()?.data || []}
              page={page}
              count={data()?.count ?? 0}
              onPageClick={(newPage) => setPage(newPage)}
              isLoading={data.loading}
            />
            <AddCommentForm />
          </section>
        </Match>
      </ErrorBoundary>
    </Switch>
  );
};
