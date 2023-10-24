import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="flex-row justify-center">
      <div className="col">
        <div className="card">
          <h4 className="card-header">Sign Up <i class="fa-solid fa-user-plus"></i></h4>
          <div className="card-body">
            {data ? (
              <button className='btn' id="btn1">
                Success! You may now head{' '}
                <Link to="/">back to the homepage.</Link>
              </button>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                 <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" />
                 <script src="https://upload-widget.cloudinary.com/global/all.js" type="text/javascript"></script>
  
                {/* <input className='form-input'
                    name="image"
                    type="url"
                    value={formState.image}
                    onChange={handleChange}/>
                <div id="inline_container"></div> */}
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button id="btn1"
                  className="btn"
                  type="submit"
                >
                  Submit <i class="fa-regular fa-paper-plane"></i>
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Signup;