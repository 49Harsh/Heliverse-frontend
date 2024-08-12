import React, { useState } from 'react';
import { createClassroom, createTeacher, createStudent } from '../api';
import TimetableInfo from './pages/TimetableInfo';
import StudentList from './StudentList';
import TeacherList from './TeacherList';

function Principal({ user }) {
  const [showPopup, setShowPopup] = useState(false);
  const [teacherName, setTeacherName] = useState('');
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    teacherId: '',
    student: [],
    startTime: '',
    endTime: '',
    days: []
  });

  const togglePopup = () => setShowPopup(!showPopup);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({ ...prevState, [name]: value }));
  };

  const handleDaysChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prevState => ({
      ...prevState,
      days: checked 
        ? [...prevState.days, value]
        : prevState.days.filter(day => day !== value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await createClassroom(formData);
      console.log('Classroom created:', result);
      alert("Classroom created successfully");
    } catch (error) {
      console.error('Error creating classroom:', error);
      alert("Failed to create classroom");
    }
  };

  const handleCreateTeacher = async (e) => {
    e.preventDefault();
    try {
      await createTeacher(teacherName, teacherEmail, teacherPassword);
      alert('Teacher account created successfully');
      setTeacherName('');
      setTeacherEmail('');
      setTeacherPassword('');
    } catch (error) {
      console.error('Error creating teacher:', error);
      alert('Failed to create teacher account: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      await createStudent(studentName, studentEmail, studentPassword);
      alert('Student account created successfully');
      setStudentName('');
      setStudentEmail('');
      setStudentPassword('');
    } catch (error) {
      console.error('Error creating student:', error);
      alert('Failed to create student account: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Welcome, Principal {user.user.email}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Create Classroom</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Classroom Name</label>
              <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
            </div>
            <div>
              <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700">Teacher ID</label>
              <input type="text" id="teacherId" name="teacherId" value={formData.teacherId} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
            </div>
            <div>
              <label htmlFor="student" className="block text-sm font-medium text-gray-700">Student ID</label>
              <input type="text" id="student" name="student" value={formData.student} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700">Start Time</label>
                <input type="time" id="startTime" name="startTime" value={formData.startTime} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
              </div>
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700">End Time</label>
                <input type="time" id="endTime" name="endTime" value={formData.endTime} onChange={handleChange} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Days</label>
              <div className="grid grid-cols-3 gap-2">
                {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                  <label key={day} className="inline-flex items-center">
                    <input type="checkbox" value={day} checked={formData.days.includes(day)} onChange={handleDaysChange} className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" />
                    <span className="ml-2 text-sm text-gray-700">{day}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="flex justify-between items-center">
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Create Classroom
              </button>
              <button type="button" onClick={togglePopup} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Show Info
              </button>
            </div>
          </form>
          {showPopup && <TimetableInfo togglePopup={togglePopup} />}
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Create Teacher Account</h2>
            <form onSubmit={handleCreateTeacher} className="space-y-4">
              <input type="text" placeholder="Teacher Name" value={teacherName} onChange={(e) => setTeacherName(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
              <input type="email" placeholder="Teacher Email" value={teacherEmail} onChange={(e) => setTeacherEmail(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
              <input type="password" placeholder="Teacher Password" value={teacherPassword} onChange={(e) => setTeacherPassword(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
              <button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Create Teacher Account
              </button>
            </form>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Create Student Account</h2>
            <form onSubmit={handleCreateStudent} className="space-y-4">
              <input type="text" placeholder="Student Name" value={studentName} onChange={(e) => setStudentName(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
              <input type="email" placeholder="Student Email" value={studentEmail} onChange={(e) => setStudentEmail(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
              <input type="password" placeholder="Student Password" value={studentPassword} onChange={(e) => setStudentPassword(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" required />
              <button type="submit" className="w-full bg-yellow-600 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-150 ease-in-out">
                Create Student Account
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="mt-12 space-y-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Teacher List</h2>
          <TeacherList />
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">Student List</h2>
          <StudentList />
        </div>
      </div>
    </div>
  );
}

export default Principal;