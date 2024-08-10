import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const login = (email, password) => axios.post(`${API_URL}/auth/login`, { email, password });

export const createClassroom = (name, teacherId, startTime, endTime, days) => 
  axios.post(`${API_URL}/principal/create-classroom`, { name, teacherId, startTime, endTime, days });

export const createTeacher = (email, password) => 
  axios.post(`${API_URL}/principal/create-teacher`, { email, password });

export const createStudent = (email, password, classroomId) => 
  axios.post(`${API_URL}/principal/create-student`, { email, password, classroomId });

export const createTimetable = (teacherId, timetable) => 
  axios.post(`${API_URL}/teacher/create-timetable`, { teacherId, timetable });