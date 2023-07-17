import { createClient } from '@supabase/supabase-js';
import { Comment } from '../types';

interface Database {
  public: {
    Tables: {
      comments: {
        Row: Comment; // The data expected to be returned from a "select" statement.
        Insert: Omit<Comment, 'id'>; // The data expected passed to an "insert" statement.
        Update: Comment; // The data expected passed to an "update" statement.
      };
    };
  };
}

type DComment = Database['public']['Tables']['comments'];

export enum RequestError {
  DATABASE_SLEEP = 'Database Sleep',
  PAGE_OUT_RANGE = 'PGRST103',
}

const client = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_PUBLIC_TOKEN,
);

const sleep = async (ms: number) => new Promise((r) => setTimeout(r, ms));

export const PAGE_SIZE = 4;

export const getPagination = (page: number, size: number) => {
  page -= 1;

  const limit = size ? +size : 3;
  const from = page ? page * limit : 0;
  const to = page ? from + size - 1 : size - 1;

  return { from, to };
};

export async function getComments(page = 1) {
  const { from, to } = getPagination(Math.max(1, page), PAGE_SIZE);

  const { data, status, count } = await client
    .from<'comments', DComment>('comments')
    .select('*', { count: 'exact' })
    .eq('show', 'true')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (status === 0) {
    return Promise.reject(RequestError.DATABASE_SLEEP);
  }

  if (import.meta.env.DEV) {
    await sleep(1500);
  }

  return {
    data,
    count,
    page,
  };
}

export async function postComment(comment: Omit<Comment, 'id'>) {
  validateComment(comment);

  const { data, error } = await client.from('comments').insert(comment);

  return data;
}

const validateComment = (comment: any) => {
  if (typeof comment !== 'object') {
    throw Error('Is not Object');
  }

  const keys = ['created_at', 'rating', 'email', 'name', 'comment'];

  for (const key of keys) {
    if (!comment[key]) {
      throw new Error(`${key} is missing or empty`);
    }
  }

  if (comment.rating === -1) {
    throw new Error('rating');
  }
};
