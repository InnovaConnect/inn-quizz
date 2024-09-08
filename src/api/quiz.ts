import { api } from '.';
import { PagedResponse, QuestionEntity } from '../types';

const URI = '/quiz';

export async function getQuizQuestions(take: number = 10) {
  const { status, data } = await api.get<PagedResponse<QuestionEntity>>(
    `${URI}/question`,
    { params: { page: 1, take } }
  );

  if (status >= 200 && status < 300) return data.data;

  throw new Error('Ops... Algo inesperado aconteceu!');
}
