import { useEffect, useState } from 'react';
import ExperienciaList from '../components/ExperienciaList';
import ExperienciaForm from '../components/ExperienciaForm';

export default function Experiencias() {
  const [experiencias, setExperiencias] = useState([]);
  const [experienciaEditando, setExperienciaEditando] = useState(null); //Imports que necesitamos
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const URL = "http://localhost:3000/api/experiencias";

  useEffect(() => {
    setLoading(true);
    const fetchExperiencias = async () => {
      try {
        const response = await fetch(URL);
        const data = await response.json();
        setExperiencias(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchExperiencias();
  }, []);

  const handleExperienciaSubmit = async (newExperiencia) => {
    // Crear experiencia
    try {
      const response = await fetch(URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newExperiencia),
      });

      if (!response.ok) {
        throw new Error('Error al crear la experiencia');
      }

      const data = await response.json();
      setExperiencias([...experiencias, data]); // Actualiza la lista de experiencias
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleDeleteExperience = async (expId) => {
    // Eliminar experiencia
    try {
      const response = await fetch(`http://localhost:3000/api/experiencias/${expId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Error al eliminar la experiencia');
      }

      // Actualiza la lista eliminando la experiencia que se eliminó
      setExperiencias(experiencias.filter(exp => exp._id !== expId)); 
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditExperience = async (expId, editedExperiencia) => {
    // Editar experiencia
    try {
      const response = await fetch(`http://localhost:3000/api/experiencias/${expId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedExperiencia),
      });

      if (!response.ok) {
        throw new Error('Error al editar la experiencia');
      }

      const updatedExperience = await response.json(); // Obtenemos la experiencia editada

      // Actualizamos la lista de experiencias con la experiencia editada
      setExperiencias(experiencias.map(exp => 
        exp._id === expId ? updatedExperience : exp
      ));
    } catch (err) {
      console.error(err);
    }
  };

  const handleEditExperienced = (exp) => {
    // Configura el estado de la experiencia en edición
    setExperienciaEditando(exp);
  };

  return (
    <div className="form-container">
      <h2>Gestión de Experiencias</h2>
      {loading && <p>Cargando experiencias...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && (
        <>
          <ExperienciaList 
            experiencias={experiencias} 
            onDeleteExperience={handleDeleteExperience} 
            onEditExperience={handleEditExperienced} 
          />
          <ExperienciaForm 
            onSubmit={handleExperienciaSubmit} 
            onEditExperiencia={handleEditExperience} 
            experiencia={experienciaEditando} 
          />
        </>
      )}
    </div>
  );
}
