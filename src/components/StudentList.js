// StudentList.js
import React, { useState, useEffect } from 'react';
import { fetchStudents, deleteStudent } from '../api';
import Popup from './pages/Popup';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = async () => {
    const data = await fetchStudents();
    setStudents(data);
  };

  const handleDelete = async (id) => {
    await deleteStudent(id);
    loadStudents();
  };

  return (
    <div>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        View Students
      </button>
      <Popup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)}>
        <h2 className="text-2xl font-bold mb-4">Students List</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {students.map((student) => (
            <div key={student._id} className="border p-4 rounded">
              <h3 className="font-bold">{student.name}</h3>
              <p>Email: {student.email}</p>
              <p>Password: {student.password}</p>
              <button
                onClick={() => handleDelete(student._id)}
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

export default StudentList;