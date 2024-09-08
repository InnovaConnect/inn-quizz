import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Header } from '../components/header';
import { Button } from '../components/button';
import { IconButton } from '../components/icon-button';
import { Pencil, Trash } from '../components/icon';
import { QuestionEntity } from '../types';
import {
  deleteManagementQuestion,
  getManagementQuestions
} from '../api/management';

export function Questions() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState<Array<QuestionEntity>>([]);

  async function getQuestions() {
    try {
      const managementQuestions = await getManagementQuestions();

      setQuestions(managementQuestions);
    } catch {
      alert('Não foi possível obter as perguntas cadastradas!');
    }
  }

  async function removeQuestion(id: number) {
    try {
      await deleteManagementQuestion(id);

      setQuestions((prev) => prev.filter((question) => question.id !== id));
    } catch {
      alert('Não foi possível excluir a pergunta!');
    }
  }

  useEffect(() => {
    getQuestions();
  }, []);

  return (
    <main>
      <Header title="Perguntas" />

      <hr />

      <table className="table-auto text-left">
        <thead>
          <tr className="border-b border-zinc-900 text-sm text-zinc-500">
            <th className="px-3 py-2">Pergunta</th>
            <th className="w-24 px-3 py-2">Ações</th>
          </tr>
        </thead>
        <tbody>
          {questions.map(({ id, description }, index) => (
            <tr
              key={index}
              className="border-b border-zinc-900 text-zinc-300 last:border-none"
            >
              <td className="px-3 py-2">{description}</td>

              <td className="flex gap-2 px-3 py-2">
                <IconButton
                  title="Editar"
                  onClick={() => navigate(`./${id}`)}
                >
                  <Pencil />
                </IconButton>

                <IconButton
                  variant="error"
                  title="Excluir"
                  onClick={() => removeQuestion(id)}
                >
                  <Trash />
                </IconButton>
              </td>
            </tr>
          ))}

          {!questions.length && (
            <tr className="text-zinc-500">
              <td
                className="px-3 py-2"
                colSpan={2}
              >
                Nenhuma pergunta cadastrada.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      <hr />

      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        <Button
          variant="secondary"
          onClick={() => navigate('/')}
        >
          Voltar
        </Button>

        <Button
          onClick={() =>
            navigate('./adicionar', { state: { index: questions.length } })
          }
        >
          Adicionar
        </Button>
      </div>
    </main>
  );
}
