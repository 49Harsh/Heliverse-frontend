import React from 'react';

function LoginInfo({ togglePopup }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-11/12 md:w-1/2 lg:w-1/3">
        <h2 className="text-xl font-bold mb-4">Information</h2>
        <p className="mb-4">
        If you want to log in as a Principal, use this 
        <h1>email: <br/>
            <span>principal@classroom.com</span> 
        </h1>
        <h1>
            password: 
            <span>Admin</span>
        </h1>. 
        If you want to log in as a Teacher, use this 
        <h1>email: <br/>
            <span>teacher@gmail.com</span> 
        </h1>
        <h1>
            password: 
            <span>12345</span>
        </h1>.  
        If you want to log in as a Student, use this 
        <h1>email:</h1>
            <span>student@gmail.com</span> 
        <h1>
            password: 
            <span>12345</span>
        </h1>.
        </p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={togglePopup}
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default LoginInfo;
