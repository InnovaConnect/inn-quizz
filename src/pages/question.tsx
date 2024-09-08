import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

import { Header } from '../components/header';
import { Button } from '../components/button';
import { Check, X } from '../components/icon';
import { IconButton } from '../components/icon-button';
import { AnswerDTO, QuestionDTO } from '../types';
import {
  deleteManagementQuestion,
  deleteManagementQuestionAnswer,
  getManagementQuestion,
  patchManagementQuestion,
  patchManagementQuestionAnswer,
  postManagementQuestion,
  postManagementQuestionAnswer
} from '../api/management';

export function Question() {
  const navigate = useNavigate();

  const { id } = useParams();
  const { state } = useLocation();

  const [question, setQuestion] = useState<Omit<QuestionDTO, 'answers'>>({
    title: '',
    description: '',
    index: state?.index ?? 0
  });

  const [answers, setAnswers] = useState<Array<AnswerDTO>>([]);

  function handleAddAnswer() {
    setAnswers((prev) => [...prev, { description: '', isCorrect: false }]);
  }

  function handleRemoveAnswer(index: number) {
    const answer = answers[index];

    if (answer.id) removeAnswer(answer.id);

    setAnswers((prev) => [...prev.slice(0, index), ...prev.slice(index + 1)]);
  }

  function handleChangeQuestion(
    key: keyof Omit<QuestionDTO, 'answers' | 'index'>,
    value: string
  ) {
    setQuestion((prev) => ({ ...prev, [key]: value }));
  }

  function handleChangeAnswer(
    index: number,
    key: keyof Omit<AnswerDTO, 'isCorrect'>,
    value: string
  ) {
    setAnswers((prev) =>
      prev.map((answer, idx) => {
        if (idx === index) return { ...answer, [key]: value };

        return answer;
      })
    );
  }

  function handleChangeAnswerCorrect(index: number, value: boolean) {
    setAnswers((prev) =>
      prev.map((answer, idx) => {
        if (idx === index) return { ...answer, isCorrect: value };

        return { ...answer, isCorrect: false };
      })
    );
  }

  async function createAnswers() {
    const records: Array<AnswerDTO> = answers.filter((answer) => !answer.id);

    if (!id || !records.length) return;

    try {
      await Promise.all(
        records.map((record) => postManagementQuestionAnswer(+id, record))
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function updateAnswers() {
    const records: Array<AnswerDTO> = answers.filter((answer) => !!answer.id);

    if (!id || !records.length) return;

    try {
      await Promise.all(
        records.map((record) =>
          patchManagementQuestionAnswer(+id, record.id!, record)
        )
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function removeAnswer(answerId: number) {
    if (!id) return;

    try {
      await deleteManagementQuestionAnswer(+id, answerId);
    } catch (err) {
      console.log(err);
    }
  }

  async function createQuestion() {
    try {
      const record: QuestionDTO = {
        ...question,
        title: question.description.slice(0, 56) + '...',
        answers
      };

      await postManagementQuestion(record);

      navigate('/perguntas');
    } catch (err) {
      console.log(err);
    }
  }

  async function updateQuestion() {
    if (!id) return;

    try {
      const record: Omit<QuestionDTO, 'answers'> = {
        ...question,
        title: question.description.slice(0, 56) + '...'
      };

      await Promise.all([
        patchManagementQuestion(+id, record),
        updateAnswers(),
        createAnswers()
      ]);

      navigate('/perguntas');
    } catch (err) {
      console.log(err);
    }
  }

  async function removeQuestion() {
    if (!id) return;

    try {
      await deleteManagementQuestion(+id);

      navigate('/perguntas');
    } catch (err) {
      console.log(err);
    }
  }

  async function getQuestion(id: number) {
    try {
      const data = await getManagementQuestion(id);

      setQuestion({
        id: data.id,
        index: data.index,
        title: data.title,
        description: data.description
      });

      setAnswers(
        data.answers.map((answer) => ({
          id: answer.id,
          isCorrect: answer.isCorrect,
          description: answer.description
        }))
      );
    } catch (err) {
      console.log(err);
      navigate('/perguntas');
    }
  }

  useEffect(() => {
    if (id) getQuestion(+id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <main>
      <Header title={id ? 'Editar Pergunta' : 'Adicionar Pergunta'} />

      <hr />

      {id && (
        <Button
          variant="error"
          onClick={removeQuestion}
        >
          Excluir
        </Button>
      )}

      <div className="flex flex-col gap-3">
        <label>Pergunta</label>

        <input
          required
          type="text"
          name="question"
          autoComplete="off"
          placeholder="Pergunta"
          value={question.description}
          onChange={(e) => handleChangeQuestion('description', e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3">
        <label>Respostas</label>

        {answers.map(({ id, description, isCorrect }, index) => (
          <div
            key={`answer_${index}_${id}`}
            className="flex w-full items-center justify-between gap-4"
          >
            <input
              required
              type="text"
              name="answer"
              autoComplete="off"
              placeholder="Resposta"
              value={description}
              onChange={(e) =>
                handleChangeAnswer(index, 'description', e.target.value)
              }
            />

            <IconButton
              variant={isCorrect ? 'success' : 'secondary'}
              onClick={() => handleChangeAnswerCorrect(index, !isCorrect)}
            >
              <Check />
            </IconButton>

            <IconButton
              variant="error"
              onClick={() => handleRemoveAnswer(index)}
            >
              <X />
            </IconButton>
          </div>
        ))}

        <Button onClick={handleAddAnswer}>Adicionar</Button>
      </div>

      <hr />

      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        <Button
          variant="secondary"
          onClick={() => navigate('/perguntas')}
        >
          Cancelar
        </Button>

        <Button
          variant="success"
          onClick={() => (id ? updateQuestion() : createQuestion())}
        >
          Salvar
        </Button>
      </div>
    </main>
  );
}
