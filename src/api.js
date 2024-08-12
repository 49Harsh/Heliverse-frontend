import axios from 'axios';

const API_URL = 'https://heliverse-backend-eopp.onrender.com';

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


export const createClassroom = async (classroomData) => {
  try {
    const response = await axios.post(`${API_URL}/principal/create-classroom`, classroomData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createTeacher = (name,email, password) => 
  axios.post(`${API_URL}/principal/create-teacher`, {name, email, password });

export const createStudent = (name, email, password) => 
  axios.post(`${API_URL}/principal/create-student`, {name, email, password });

export const createTimetable = (teacherId, timetable) => 
  axios.post(`${API_URL}/teacher/create-timetable`, { teacherId, timetable });

export const fetchTeachers = async () => {
  const response = await axios.get(`${API_URL}/principal/show-teacher`);
  return response.data;
};

export const fetchStudents = async () => {
  const response = await axios.get(`${API_URL}/principal/show-student`);
  return response.data;
};

export const deleteTeacher = async (id) => {
  const response = await axios.delete(`${API_URL}/principal/teacher/${id}`);
  return response.data;
};

export const deleteStudent = async (id) => {
  const response = await axios.delete(`${API_URL}/principal//student/${id}`);
  return response.data;
};