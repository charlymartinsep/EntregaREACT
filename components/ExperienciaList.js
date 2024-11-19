// components/ExperienciaList.js

import { useEffect, useState } from 'react';

export default function ExperienciaList({ experiencias = [], onDeleteExperience, onEditExperience }) { 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  if (loading) return <p>Cargando experiencias...</p>;
  if (error) return <p>Error: {error}</p>;

  const handleEdit = (id) => {
    if (onEditExperience) {
      onEditExperience(id);
    }
  };
  const handleDelete = (id) => {
    if (onDeleteExperience) {
      onDeleteExperience(id);
    }
  };

  return (
    <div>
      <h2-form>Lista de Experiencias</h2-form>
      <ul>
        {experiencias.map((exp) => (
          <li key={exp._id}>
            <p><strong>Descripción:</strong> {exp.description}</p>
            <p><strong>Dueño:</strong> {exp.owner}</p>
            <p><strong>Participantes:</strong> {exp.participants.join(', ')}</p>
            <button onClick={() => handleEdit(exp)}>Editar</button>
            <button onClick={() => handleDelete(exp._id)}>Eliminar</button> {/* Botón para eliminar */}
          </li>
        ))}
      </ul>
    </div>
  );
}
