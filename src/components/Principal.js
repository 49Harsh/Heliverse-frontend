import React, { useState } from 'react';
import { createClassroom, createTeacher, createStudent } from '../api';


function Principal({ user }) {

  


  // const [formData, setFormData] = useState({
  //   name: '',
  //   teacherId: '',
  //   startTime: '',
  //   endTime: '',
  //   days: [],
  // });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormData((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleDayChange = (day) => {
  //   setFormData((prev) => ({
  //     ...prev,
  //     days: prev.days.includes(day)
  //       ? prev.days.filter((d) => d !== day)
  //       : [...prev.days, day],
  //   }));
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const result = await createClassroom(formData);
  //     console.log('Classroom created:', result);
  //     // Handle success (e.g., show a success message, clear the form, etc.)
  //   } catch (error) {
  //     console.error('Error creating classroom:', error);
  //     // Handle error (e.g., show an error message)
  //   }
  // };








  // // State for classroom creation
  // const [classroomName, setClassroomName] = useState('');
  // const [teacherId, setTeacherId] = useState('');
  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');
  // const [days, setDays] = useState([]);

  // console.log(teacherId)

  // State for teacher creation
  const [teacherEmail, setTeacherEmail] = useState('');
  const [teacherPassword, setTeacherPassword] = useState('');

  // State for student creation
  const [studentEmail, setStudentEmail] = useState('');
  const [studentPassword, setStudentPassword] = useState('');
  const [classroomId, setClassroomId] = useState('');



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