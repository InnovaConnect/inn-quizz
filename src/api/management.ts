import { api } from '.';
import {
  AnswerDTO,
  AnswersEntity,
  PagedResponse,
  QuestionDTO,
  QuestionEntity
} from '../types';

const URI = '/management';

export async function getManagementQuestions(): Promise<Array<QuestionEntity>> {
  const { status, data } = await api.get<PagedResponse<QuestionEntity>>(
    `${URI}/question`,
    {
      params: { take: 100, page: 1 }
    }
  );

  if (status >= 200 && status < 300) return data.data;

  throw new Error('Ops... Algo inesperado aconteceu!');
}

export async function getManagementQuestion(
  questionId: number
): Promise<QuestionEntity> {
  const { status, data } = await api.get<QuestionEntity>(
    `${URI}/question/${questionId}`,
    {
      params: { take: 100, page: 1 }
    }
  );

  if (status >= 200 && status < 300) return data;

  throw new Error('Ops... Algo inesperado aconteceu!');
}

export async function postManagementQuestion(
  record: QuestionDTO
): Promise<QuestionEntity> {
  const { status, data } = await api.post<QuestionEntity>(
    `${URI}/question`,
    record
  );

  if (status >= 200 && status < 300) return data;

  throw new Error('Ops... Algo inesperado aconteceu!');
}

export async function patchManagementQuestion(
  questionId: number,
  record: Omit<QuestionDTO, 'answers'>
): Promise<QuestionEntity> {
  const { status, data } = await api.patch<QuestionEntity>(
    `${URI}/question/${questionId}`,
    record
  );

  if (status >= 200 && status < 300) return data;

  throw new Error('Ops... Algo inesperado aconteceu!');
}

export async function deleteManagementQuestion(
  questionId: number
): Promise<void> {
  const { status } = await api.delete(`${URI}/question/${questionId}`);

  if (status >= 200 && status < 300) return;

  throw new Error('Ops... Algo inesperado aconteceu!');
}

export async function postManagementQuestionAnswer(
  questionId: number,
  body: AnswerDTO
): Promise<AnswersEntity> {
  const { status, data } = await api.post<AnswersEntity>(
    `${URI}/question/${questionId}/answer`,
    body
  );

  if (status >= 200 && status < 300) return data;

  throw new Error('Ops... Algo inesperado aconteceu!');
}

export async function patchManagementQuestionAnswer(
  questionId: number,
  answerId: number,
  body: AnswerDTO
): Promise<AnswersEntity> {
  const { status, data } = await api.patch<AnswersEntity>(
    `${URI}/question/${questionId}/answer/${answerId}`,
    body
  );

  if (status >= 200 && status < 300) return data;

  throw new Error('Ops... Algo inesperado aconteceu!');
}

export async function deleteManagementQuestionAnswer(
  questionId: number,
  answerId: number
): Promise<void> {
  const { status } = await api.delete(
    `${URI}/question/${questionId}/answer/${answerId}`
  );

  if (status >= 200 && status < 300) return;

  throw new Error('Ops... Algo inesperado aconteceu!');
}
