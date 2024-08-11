import React, { useState } from 'react';
import { createClassroom, createTeacher, createStudent } from '../api';
import TimetableInfo from './pages/TimetableInfo';
import StudentList from './StudentList';
import TeacherList from './TeacherList';

function Principal({ user }) {

  

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // State for teacher creation
  const [teacherName, setTeacherName] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');

  // State for student creation
  const [studentName, setStudentName] = useState('');
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
 



  // // Handle classroom creation
  const [formData, setFormData] = useState({
    name: '',
    teacherId: '',
    student: [],
    startTime: '',
    endTime: '',
    days: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
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
      alert("classroom created ")
      // handle error
      
    } catch (error) {
      console.error('Error creating classroom:', error);
      alert("classroom not created ")
      // handle error
    }
  };



  // Handle teacher creation
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

  // Handle student creation
  const handleCreateStudent = async (e) => {
    e.preventDefault();
    try {
      await createStudent(studentName, studentEmail, studentPassword);
      alert('Student account created successfully');
      // Clear form fields
      setStudentName('');
      setStudentEmail('');
      setStudentPassword('');
      // setClassroomId('');
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

            <form onSubmit={handleSubmit} className="max-w-lg mx-auto mt-10">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">Classroom Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="teacherId" className="block text-gray-700 text-sm font-bold mb-2">Teacher ID</label>
            <input
              type="text"
              id="teacherId"
              name="teacherId"
              value={formData.teacherId}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="student" className="block text-gray-700 text-sm font-bold mb-2">Student-ID</label>
            <input
              type="text"
              id="student"
              name="student"
              value={formData.student}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="startTime" className="block text-gray-700 text-sm font-bold mb-2">Start Time</label>
            <input
              type="time"
              id="startTime"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="endTime" className="block text-gray-700 text-sm font-bold mb-2">End Time</label>
            <input
              type="time"
              id="endTime"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Days</label>
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
              <label key={day} className="inline-flex items-center mr-4">
                <input
                  type="checkbox"
                  value={day}
                  checked={formData.days.includes(day)}
                  onChange={handleDaysChange}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-700">{day}</span>
              </label>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create Classroom
            </button>
          </div>
        </form>
        {/* info popup */}
        
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={togglePopup}
          >
            Show Info
          </button>
          {showPopup && <TimetableInfo togglePopup={togglePopup} />}
        

      </div>

      {/* Teacher Creation Form */}
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h3 className="text-xl font-semibold mb-4">Create Teacher Account</h3>
        <form onSubmit={handleCreateTeacher} className="space-y-4">
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Teacher Name"
            value={teacherName}
            onChange={(e) => setTeacherName(e.target.value)}
            required
          />
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
            type="text"
            placeholder="Student Name"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            required
          />
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

          <button
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Student Account
          </button>
        </form>

        
        <TeacherList />
        <StudentList />

      </div>
    </div>
  );
}

export default Principal;