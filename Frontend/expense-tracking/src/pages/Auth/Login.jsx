import React from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';
import { validateEmail } from '../../utils/helper';

const Login = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState(null);

  const navigate = useNavigate();

  //Handle Login Form
  const handleLogin = async (e) => {
    e.preventDefault();

    if(!email && !password) {
      setError('Please enter your email and password');
      return;
    }

    if(!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if(!password) {
      setError('Please enter your password');
      return;
    }

    setError('');

    //Login API
  }

  return (
    <AuthLayout>
      <div className="lg:w-[75%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome Back!!</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Please Enter Your Detail</p>

        <form onSubmit={handleLogin}>
          <Input
              value={email}
              onChange={({target}) => setEmail(target.value)}
              label="Email"
              placeholder="Enter your Email Address"
              type="text"
            />
            <Input
              value={password}
              onChange={({target}) => setPassword(target.value)}
              label="Password"
              placeholder="Enter your Password"
              type="password"
            />

            {error && <p className="text-red-500 text-xs font-semibold mt-2 mb-2">{error}</p>}

            <button 
              type="submit"
              className="btn-primary"
            >
              Login
            </button>

            <p className="text-center text-xs mt-4">
              Don't have an account? {" "}
              <Link to="/signup" className="text-slate-950 font-semibold hover:text-slate-700"> Register</Link>
            </p>

        </form>
      </div>
    </AuthLayout>
  )
}

export default Login
