export type AnswerDTO = {
  id?: number;
  description: string;
  isCorrect: boolean;
};

export type QuestionDTO = {
  id?: number;
  index: number;
  title: string;
  description: string;
  answers: Array<AnswerDTO>;
};

export type AnswersEntity = {
  id: number;
  isCorrect: boolean;
  description: string;

  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type QuestionEntity = {
  id: number;
  index: number;
  title: string;
  description: string;

  answers: Array<AnswersEntity>;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
};

export type PagedResponse<T> = {
  data: Array<T>;
  pages: number;
  total: number;
};
