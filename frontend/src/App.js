import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [people, setPeople] = useState([]);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [updateFormVisible, setUpdateFormVisible] = useState(false);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedAge, setUpdatedAge] = useState('');
  const [selectedPersonId, setSelectedPersonId] = useState('');

  useEffect(() => {
    fetchPeople();
  }, []);

  const fetchPeople = async () => {
    try {
      const response = await axios.get('http://localhost:4000/people');
      setPeople(response.data);
    } catch (error) {
      console.error('Failed to fetch people', error);
    }
  };

  const addPerson = async () => {
    try {
      const response = await axios.post('http://localhost:4000/people', { name, age });
      setPeople([...people, response.data]);
      setName('');
      setAge('');
    } catch (error) {
      console.error('Failed to add person', error);
    }
  };

  const deletePerson = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/people/${id}`);
      setPeople(people.filter((person) => person.id !== id));
    } catch (error) {
      console.error('Failed to delete person', error);
    }
  };

  const showUpdateForm = (id, personName, personAge) => {
    setSelectedPersonId(id);
    setUpdatedName(personName);
    setUpdatedAge(personAge);
    setUpdateFormVisible(true);
  };

  const updatePerson = async () => {
    try {
      await axios.put(`http://localhost:4000/people/${selectedPersonId}`, {
        name: updatedName,
        age: updatedAge,
      });
      const updatedPeople = people.map((person) => {
        if (person.id === selectedPersonId) {
          return { ...person, name: updatedName, age: updatedAge };
        }
        return person;
      });
      setPeople(updatedPeople);
      setUpdateFormVisible(false);
    } catch (error) {
      console.error('Failed to update person', error);
    }
  };

  const cancelUpdate = () => {
    setUpdateFormVisible(false);
  };

  return (
    <div>
      <h1>People</h1>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            {person.name}, {person.age}
            <button onClick={() => deletePerson(person.id)}>Delete</button>
            <button onClick={() => showUpdateForm(person.id, person.name, person.age)}>
              Update
            </button>
          </li>
        ))}
      </ul>
      <h2>Add Person</h2>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <button onClick={addPerson}>Add</button>

      {updateFormVisible && (
        <div>
          <h2>Update Person</h2>
          <input
            type="text"
            placeholder="Updated Name"
            value={updatedName}
            onChange={(e) => setUpdatedName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Updated Age"
            value={updatedAge}
            onChange={(e) => setUpdatedAge(e.target.value)}
          />
          <button onClick={updatePerson}>Update</button>
          <button onClick={cancelUpdate}>Cancel</button>
        </div>
      )}
    </div>
  );
};

export default App;
