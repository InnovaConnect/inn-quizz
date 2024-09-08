import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { getQuizQuestions } from '../api/quiz';
import { QuestionEntity } from '../types';
import { Header } from '../components/header';
import { Button } from '../components/button';
import { Option } from '../components/option';
import { Result } from '../components/result';

export function Quiz() {
  const navigate = useNavigate();

  const [current, setCurrent] = useState<number>(0);
  const [answers, setAnswers] = useState<Array<number>>([]);
  const [questions, setQuestions] = useState<Array<QuestionEntity>>([]);

  const back = useCallback(
    function back() {
      navigate('/');
    },
    [navigate]
  );

  const setupQuiz = useCallback(
    async function setupQuiz() {
      try {
        const quizQuestions = await getQuizQuestions();

        if (!quizQuestions.length) throw new Error('No questions found!');

        setQuestions(quizQuestions);
      } catch {
        back();
        alert('Não foi possível iniciar o quiz!');
      }
    },
    [back]
  );

  function handleGiveUp() {
    const ok = confirm('Você tem certeza que deseja desistir?');

    if (ok) back();
  }

  function handleNext() {
    setCurrent((prev) => prev + 1);
  }

  useEffect(() => {
    setupQuiz();
  }, [setupQuiz]);

  const isResult = !!questions.length && current + 1 > questions.length;
  const question = !isResult ? questions[current] : null;

  return (
    <main>
      <Header
        title={
          isResult
            ? 'Resultado'
            : `Pergunta ${current + 1} de ${questions.length}`
        }
      />
      <hr />

      {question && (
        <>
          <p>{question.description}</p>

          <div className="flex flex-col gap-3">
            {question.answers.map((answer, index) => (
              <Option
                key={answer.id}
                select={answers[current] === index}
                onClick={() =>
                  setAnswers((prev) => [
                    ...prev.slice(0, current),
                    index,
                    ...prev.slice(current + 1)
                  ])
                }
              >
                {answer.description}
              </Option>
            ))}
          </div>
        </>
      )}

      {isResult && (
        <Result
          questions={questions}
          answers={answers}
        />
      )}

      <hr />

      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        {isResult ? (
          <Button
            variant="secondary"
            onClick={back}
          >
            Voltar ao início
          </Button>
        ) : (
          <>
            <Button
              variant="secondary"
              onClick={handleGiveUp}
            >
              Desistir
            </Button>

            <Button
              disabled={answers[current] === undefined}
              onClick={handleNext}
            >
              Próxima
            </Button>
          </>
        )}
      </div>
    </main>
  );
}
