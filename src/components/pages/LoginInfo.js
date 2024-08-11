import React from 'react';

function Login({ togglePopup }) {
  const loginInfo = [
    {
      role: 'Principal',
      email: 'principal@classroom.com',
      password: 'Admin'
    },
    {
      role: 'Teacher',
      email: 'teacher@gmail.com',
      password: '12345'
    },
    {
      role: 'Student',
      email: 'student@gmail.com',
      password: '12345'
    }
  ];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-11/12 md:w-2/3 lg:w-1/2 max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login Information</h2>
        <p>If you wish to log in as a teacher, please use the teacher’s email and password. For student access, use the student’s credentials. Similarly, for principal access, use the principal’s login details.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {loginInfo.map((info, index) => (
            <div key={index} className="bg-gray-100 p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2 text-gray-700">{info.role}</h3>
              <p className="text-sm mb-1">
                <span className="font-medium">Email:</span> {info.email}
              </p>
              <p className="text-sm">
                <span className="font-medium">Password:</span> {info.password}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-110"
            onClick={togglePopup}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;