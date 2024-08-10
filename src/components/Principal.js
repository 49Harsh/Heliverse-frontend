import React, { useState } from 'react';
import { createClassroom, createTeacher, createStudent } from '../api';

function Principal({ user }) {
  // State for classroom creation
  const [classroomName, setClassroomName] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [days, setDays] = useState([]);

  // State for teacher creation
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');

  // State for student creation
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [classroomId, setClassroomId] = useState('');

  // Handle classroom creation
  const handleCreateClassroom = async (e) => {
    e.preventDefault();
    try {
      const classroomData = {
        name: classroomName,
        teacher: teacherId,
        startTime,
        endTime,
        days
      };
      await createClassroom(classroomData);
      alert('Classroom created successfully');
      // Clear form fields
      setClassroomName('');
      setTeacherId('');
      setStartTime('');
      setEndTime('');
      setDays([]);
    } catch (error) {
      console.error('Error creating classroom:', error);
      alert('Failed to create classroom: ' + (error.response?.data?.message || error.message));
    }
  };

  // Handle teacher creation
  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      await createTeacher(teacherEmail, teacherPassword);
      alert('Teacher account created successfully');
      // Clear form fields
      setTeacherEmail('');
      setTeacherPassword('');
    } catch (error) {
      console.error('Error creating teacher:', error);
      alert('Failed to create teacher account: ' + (error.response?.data?.message || error.message));
    }
  };

  // Handle student creation
  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      await createStudent(studentEmail, studentPassword, classroomId);
      alert('Student account created successfully');
      // Clear form fields
      setStudentEmail('');
      setStudentPassword('');
      setClassroomId('');
    } catch (error) {
      console.error('Error creating student:', error);
      alert('Failed to create student account: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Welcome, Principal {user.user.email}</h2>
      
      {/* Classroom Creation Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-semibold mb-4">Create Classroom</h3>
        <form onSubmit={handleCreateClassroom} className="space-y-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Classroom Name"
            value={classroomName}
            onChange={(e) => setClassroomName(e.target.value)}
            required
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Teacher ID"
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            required
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="time"
            placeholder="Start Time"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="time"
            placeholder="End Time"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
          <div>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
              <label key={day} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  className="form-checkbox"
                  value={day}
                  checked={days.includes(day)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setDays([...days, day]);
                    } else {
                      setDays(days.filter((d) => d !== day));
                    }
                  }}
                />
                <span className="ml-2">{day}</span>
              </label>
            ))}
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Classroom
          </button>
        </form>
      </div>

      {/* Teacher Creation Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-semibold mb-4">Create Teacher Account</h3>
        <form onSubmit={handleCreateTeacher} className="space-y-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Teacher Email"
            value={teacherEmail}
            onChange={(e) => setTeacherEmail(e.target.value)}
            required
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Teacher Password"
            value={teacherPassword}
            onChange={(e) => setTeacherPassword(e.target.value)}
            required
          />
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Teacher Account
          </button>
        </form>
      </div>

      {/* Student Creation Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-semibold mb-4">Create Student Account</h3>
        <form onSubmit={handleCreateStudent} className="space-y-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="email"
            placeholder="Student Email"
            value={studentEmail}
            onChange={(e) => setStudentEmail(e.target.value)}
            required
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="password"
            placeholder="Student Password"
            value={studentPassword}
            onChange={(e) => setStudentPassword(e.target.value)}
            required
          />
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Classroom ID"
            value={classroomId}
            onChange={(e) => setClassroomId(e.target.value)}
            required
          />
          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Student Account
          </button>
        </form>
      </div>
    </div>
  );
}

export default Principal;