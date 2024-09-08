import { useNavigate } from 'react-router-dom';
import { Button } from '../components/button';
import { Header } from '../components/header';

export function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <Header />

      <hr />

      <p className="text-2xl font-thin">
        Teste seus conhecimentos sobre tecnologias e desenvolvimento de
        software.
      </p>

      <hr />

      <div className="flex flex-wrap items-center gap-3 sm:flex-nowrap">
        <Button onClick={() => navigate('/quiz')}>Iniciar</Button>

        <Button
          variant="secondary"
          onClick={() => navigate('/perguntas')}
        >
          Perguntas
        </Button>
      </div>
    </main>
  );
}
