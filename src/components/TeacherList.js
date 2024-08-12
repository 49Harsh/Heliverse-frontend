import React, { useState, useEffect } from 'react';
import { fetchTeachers, deleteTeacher } from '../api';
import Popup from './pages/Popup';

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  


  useEffect(() => {
    if (isPopupOpen) {
      loadTeachers();
    }
  }, [isPopupOpen]);

  const loadTeachers = async () => {
    const data = await fetchTeachers();
    setTeachers(data);
  };

  const handleDelete = async (id) => {
    await deleteTeacher(id);
    loadTeachers();
  };

  return (
    <div>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        View Teachers
      </button>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Teachers List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teachers.map((teacher) => (
            <div key={teacher._id} className="border p-4 rounded">
              <h3 className="font-bold">{teacher.name}</h3>
              <p>Email: {teacher.email}</p>
              <p>Password: {teacher.password}</p>
              <button
                onClick={() => handleDelete(teacher._id)}
                className="bg-red-500 text-white px-2 py-1 rounded mt-2"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </Popup>
    </div>
  );
};

export default TeacherList;