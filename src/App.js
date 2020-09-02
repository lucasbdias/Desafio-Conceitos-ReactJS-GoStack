import React, {useEffect, useState} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: "Novo repositório",
	    url: "https://github.com/lucasbdias/Conceitos-do-NodeJS-GoStack",
	    techs: ["Node.js", "JS"],
	    likes: 0
    });

    const repository = response.data;

    setRepositories([...repositories, repository]);
  }
 
  async function handleRemoveRepository(id) {
    //const response = await api.delete('repositories/' + id)
  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => <li key={repository.id}>{repository.title} <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button></li>)}
        <li>
          Repositório 1

          <button onClick={() => handleRemoveRepository(1)}>
            Remover
          </button>
        </li>
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
