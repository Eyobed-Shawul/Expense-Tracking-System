import React, {useState, useContext } from 'react'
import AuthLayout from '../../components/layout/AuthLayout'
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/inputs/input';
import ProfilePhotoSelector from '../../components/inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { ApiPaths } from '../../utils/apiPaths';
import { userContext } from '../../context/userContext';
import uploadImage from '../../utils/uploadImage';

const SignUp = () => {
  const [profile, setProfile] = useState('');
  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState(null);
  const { updateUser } = useContext(userContext);
  const navigate = useNavigate();

  //Handle SignUp Form
  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl ="";

    if(!fullname && !email && !password) {
      setError('Please fill all the fields');
      return;
    }

    if(!fullname){
      setError('Please enter your fullname');
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

    if(password.length < 6) {
      setError('Password must be atleast 6 characters');
      return;
    }

    if(password !== confirmPassword) {
      setError('Password does not match');
      return;
    }

    setError('');

    //SignUp API
    try {
      //Upload Profile Image
      if(profile) {
        const ImgUploadRes = await uploadImage(profile);
        profileImageUrl = ImgUploadRes.image || '';
      }

      const response = await axiosInstance.post(ApiPaths.AUTH.REGISTER,{
        fullName: fullname,
        email,
        password,
        confirmPassword,
        profileImageUrl
      });

      const { token, user } = response.data;

      if(!token) {
        setError( response.message || 'Something went wrong. Please try again');
        return;
      } else {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/login');
      }

    } catch (error) {
      setError(error.response.data.message || 'Something went wrong. Please try again');
    }

  }
  return (
    <AuthLayout>
      <div className="lg:w-[75%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className="text-xs text-slate-700 mt-[5px] mb-6">Enter your Detail and start Tracking your Expense!!</p>
        
        <form onSubmit={handleSignUp}>
          
          <ProfilePhotoSelector image={profile} setImage={setProfile} />

          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input
              value={fullname}
              onChange={({target}) => setFullname(target.value)}
              label="Fullname"
              placeholder="Enter your Fullname"
              type="text"
            />
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
            <Input
              value={confirmPassword}
              onChange={({target}) => setConfirmPassword(target.value)}
              label="Confirm Password"
              placeholder="Re-Enter your Password"
              type="password"
            />

            {error && <p className="text-red-500 text-xs font-semibold mt-2 mb-2">{error}</p>}
          </div>
          <button className="btn-primary">Sign Up</button>
            <p className="text-center text-sm mt-4">Already have an account?{" "}
              <Link to="/login" className="text-slate-950 font-semibold hover:text-slate-700">Login</Link>
            </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default SignUp
