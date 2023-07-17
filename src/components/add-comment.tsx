import { Show, createEffect, createSignal, on, onMount } from 'solid-js';
import { createStore } from 'solid-js/store';

import { SelectStars } from './select-stars';
import { postComment } from '../api';

let isSCrolledAfterRating = false;

export const AddCommentForm = () => {
  const [showForm, setShowForm] = createSignal(false);
  const [wasSend, setWasSend] = createSignal(false);
  const [isLoading, setLoading] = createSignal(false);

  let sectionRef: HTMLDivElement | undefined;

  const [form, setForm] = createStore({
    name: '',
    email: '',
    comment: '',
    rating: -1,
  });

  const handleChange = (
    event: Event & { currentTarget: HTMLInputElement | HTMLTextAreaElement },
  ) => {
    const { name, value } = event.currentTarget;
    setForm({ ...form, [name]: value });
  };

  function toggleForm() {
    setShowForm((prev) => !prev);
  }

  async function submitHandler(e: Event) {
    e.preventDefault();
    try {
      const cleanForm = JSON.parse(JSON.stringify(form));

      const now = new Date();
      const y = now.getFullYear();
      const m = now.getMonth() + 1;
      const d = now.getDate();

      setLoading(true);
      await postComment({ ...cleanForm, created_at: `${y}-${m}-${d}` });

      setWasSend(true);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  createEffect(() => {
    if (form.rating !== -1 || showForm()) {
      sectionRef?.scrollIntoView({ behavior: 'smooth', block: 'end' });
      isSCrolledAfterRating = form.rating !== -1;
    }
  });

  onMount(() => {
    isSCrolledAfterRating = false;
  });

  return (
    <div ref={sectionRef} class="pt-4 pb-6 flex flex-col items-center w-full">
      <Show when={!wasSend()}>
        <button
          onClick={toggleForm}
          class="text-white mt-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
        >
          {showForm() ? 'Скрыть форму' : 'Оставить отзыв'}
        </button>
      </Show>
      <Show when={showForm() && !wasSend()}>
        <form onSubmit={submitHandler} class="flex flex-col w-full mt-5 p-5 bg-white shadow-lg">
          <SelectStars onChange={(rating) => setForm({ ...form, rating })} />
          <Show when={form.rating !== -1}>
            <div class="flex flex-col">
              <hr class="my-4 " />
              <div class="mb-4">
                <label for="email" class="block mb-2 text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Введите email"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="name" class="block mb-2 text-sm font-medium text-gray-900">
                  Имя
                </label>
                <input
                  type="name"
                  name="name"
                  id="name"
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="Введите имя"
                  required
                />
              </div>
              <div class="mb-4">
                <label for="comment" class="block mb-2 text-sm font-medium text-gray-900">
                  Комментарий
                </label>
                <textarea
                  cols="30"
                  rows="5"
                  name="comment"
                  id="comment"
                  onChange={handleChange}
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isLoading()}
                class="flex self-center items-center text-white bg-blue-700 disabled:opacity-80 disabled:cursor-not-allowed hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm pr-5 pl-3 py-2.5"
              >
                <Show when={isLoading()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32px"
                    height="32px"
                    class="mr-1"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="xMidYMid"
                  >
                    <circle
                      cx="50"
                      cy="50"
                      fill="none"
                      stroke="#ffffff"
                      stroke-width="4"
                      r="24"
                      stroke-dasharray="113.09733552923255 39.69911184307752"
                    >
                      <animateTransform
                        attributeName="transform"
                        type="rotate"
                        repeatCount="indefinite"
                        dur="0.6s"
                        values="0 50 50;360 50 50"
                        keyTimes="0;1"
                      />
                    </circle>
                  </svg>
                </Show>
                Отправить
              </button>
            </div>
          </Show>
        </form>
      </Show>

      <Show when={wasSend()}>
        <div>Спасибо! Ваш отзыв был успешно отправлен</div>
      </Show>
    </div>
  );
};
