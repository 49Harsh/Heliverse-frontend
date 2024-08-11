import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const login = (email, password) => axios.post(`${API_URL}/auth/login`, { email, password });

// fatch all time table :>
export const getTeacherTimeTable = async () => {
  const response = await axios.get(`${API_URL}/teacher/my-timetable`, {
    headers: { 'x-auth-token': localStorage.getItem('token') }
  });
  return response.data;
};

// yaha hm teacher ke dwara post krrhe hain time table ko
export const createTimeTable = async (timeTableData) => {
  const response = await axios.post(`${API_URL}/teacher/create-timetable`, timeTableData, {
    headers: { 'x-auth-token': localStorage.getItem('token') }
  });
  return response.data;
};

// // principal create a table
// export const createClassroom = (name, teacherId, startTime, endTime, days) => 
//   axios.post(`${API_URL}/principal/create-classroom`, { name, teacherId, startTime, endTime, days });

// export const createClassroom = async (classroomData) => {
//   try {
//     const response = await axios.post(`${API_URL}/principal/create-classroom`, classroomData);
//     return response.data;
//   } catch (error) {
//     console.error('Error creating classroom:', error);
//     throw error;
//   }
// };

export const createClassroom = async (classroomData) => {
  try {
    const response = await axios.post(`${API_URL}/principal/create-classroom`, classroomData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTeacher = (email, password) => 
  axios.post(`${API_URL}/principal/create-teacher`, { email, password });

export const createStudent = (email, password, classroomId) => 
  axios.post(`${API_URL}/principal/create-student`, { email, password, classroomId });

export const createTimetable = (teacherId, timetable) => 
  axios.post(`${API_URL}/teacher/create-timetable`, { teacherId, timetable });