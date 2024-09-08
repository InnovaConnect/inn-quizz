import { QuestionEntity } from '../types';
import { Check, X } from './icon';

type ResultProps = {
  questions: Array<QuestionEntity>;
  answers: Array<number>;
};

export function Result({ questions, answers }: ResultProps) {
  function getTitleAndDescription() {
    if (corrects.length === questions.length) {
      return { title: 'Incrível!', description: 'Você acertou todas as' };
    }

    if (corrects.length >= questions.length / 2) {
      return { title: 'Parabéns!', description: 'Você acertou' };
    }

    if (corrects.length === 0) {
      return {
        title: 'Que pena!',
        description: 'Você não acertou nenhuma'
      };
    }

    return { title: 'Quase lá!', description: 'Você acertou apenas' };
  }

  const corrects = questions.filter(
    (question, index) =>
      question.answers.find((answer) => answer.isCorrect)?.id ===
      question.answers[answers[index]].id
  );

  const success = corrects.length >= questions.length / 2;

  const { title, description } = getTitleAndDescription();

  return (
    <>
      <h4
        data-success={success}
        className="text-2xl font-bold text-red-500 data-[success=true]:text-green-500"
      >
        {title}
      </h4>

      <p className="text-lg">
        {description} {corrects.length ? corrects.length : ''} das{' '}
        {questions.length} perguntas.
      </p>

      {questions.map((question, index) => {
        const answerSelectedIndex = answers[index];

        const selectedAnswer = question.answers[answerSelectedIndex];

        const correctAnswer = question.answers.find(
          (answer) => answer.isCorrect
        );

        const selectedIsCorrect = selectedAnswer.id === correctAnswer?.id;

        return (
          <div
            key={question.id}
            className="flex flex-col gap-3"
          >
            <p className="font-semibold">
              {index + 1}. {question.description}
            </p>

            {correctAnswer && (
              <div className="flex items-center gap-3 pl-6">
                <div className="text-green-500">
                  <Check />
                </div>

                <p>{correctAnswer.description}</p>
              </div>
            )}

            {!selectedIsCorrect && (
              <div className="flex items-center gap-3 pl-6">
                <div className="text-red-500">
                  <X />
                </div>

                <p>{selectedAnswer.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </>
  );
}
