import React from "react";
import {useState, useEffect} from 'react';
import api from './services/api';

import "./styles.css";

function App() {
  
  const [repositories, setRepositories] = useState([]) ;

  useEffect(() =>{
    api.get('repositories').then(response => {
        setRepositories(response.data);
    })
}, []); // passa-se um array vazio no fim do Hook caso queira que seja executado somente


  async function handleAddRepository() {
    const response = await api.post('repositories', {
      title: ' Adding a new repository test ',
      url: 'Rick',
      techs:['java', 'react', 'node']
  });

  const repository = response.data; 
  setRepositories([...repositories, repository]);

  }


  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`); // chamada a api passando o id do elemento a ser excluido

    setRepositories(repositories.filter(repository =>  // atualiza o vetor de elementos mantendo no array apenas os elemento com o id diferente do que foi passado na url
      repository.id !== id));

  }

  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}

          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
