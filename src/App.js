import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    getRepositories();
  }, []);


  function getRepositories() {
    api.get('/repositories').then(response => {
      setRepositories([...response.data]);
    });
  }

  async function handleAddRepository() {
    const currentDate = new Date();
    const response = await api.post('/repositories', {
      "url": `https://github.com/username/${currentDate}`,
      "title": `Title - ${currentDate}`,
      "techs": ["Skill"]    
    });

    if (response.data) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`/repositories/${id}`);
    if (response.status === 204) {
      setRepositories([...repositories.filter(repo => repo.id !== id)]);
    } else {
      console.log('Erro ao excluir');
    }
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.title}
            <button onClick={() => handleRemoveRepository(repo.id)}>
              Remover
            </button>
          </li>
        ))
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
