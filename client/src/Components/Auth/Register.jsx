import { useForm } from 'react-hook-form';
import styles from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();

 const {
 register,
 handleSubmit,
 formState: { errors },
 } = useForm({
 mode: 'onBlur', 
 reValidateMode: 'onBlur', 
 });


  const onSubmit = async (data) => {
    try {
      console.log('Registration form submitted', data);

      const response = await axios.post('http://localhost:3001/api/auth/register', data);

      if (response.status === 201) {
        alert('Registration successful! Please log in.');
        navigate('/login'); 
      }
    } catch (error) {
      console.error('Registration error:', error);

      if (error.response) {
        alert(error.response.data.message || 'Registration failed');
      } else {
        alert('An unexpected error occurred. Please try again.');
      }
    }
  };


 return (
 <div className={styles.authContainer}>
 <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
 {/* Title styled to match the login page: "REGISTER" */}
 <h2 className={styles.authTitle}>register</h2>

        {/* --- Full Name Input --- */}
        <div className={styles.inputGroup}>
          {/* Label is present for accessibility but hidden by CSS */}
          <label htmlFor="name" className={styles.label}>Full Name</label>
          <input
            id="name"
            type="text"
            className={styles.input}
            placeholder="Full Name" 
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 3,
                message: 'Name must be at least 3 characters',
              },
            })}
          />
          {errors.name && <div className={styles.error}>{errors.name.message}</div>}
        </div>

        {/* --- Email Input --- */}
        <div className={styles.inputGroup}>
          <label htmlFor="email" className={styles.label}>Email</label>
          <input
            id="email"
            type="email"
            className={styles.input}
            placeholder="Email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email address',
              },
            })}
          />
          {errors.email && <div className={styles.error}>{errors.email.message}</div>}
        </div>

        {/* --- Mobile Input --- */}
        <div className={styles.inputGroup}>
          <label htmlFor="mobile" className={styles.label}>Mobile Number</label>
          <input
            id="mobile"
            type="text"
            className={styles.input}
            placeholder="Mobile Number"
            {...register('mobile', {
              required: 'Mobile number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Mobile number must be 10 digits',
              },
            })}
          />
          {errors.mobile && <div className={styles.error}>{errors.mobile.message}</div>}
        </div>

        {/* --- Password Input --- */}
        <div className={styles.inputGroup}>
          <label htmlFor="password" className={styles.label}>Password</label>
          <input
            id="password"
            type="password"
            className={styles.input}
            placeholder="Password"
            {...register('password', {
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
            })}
          />
          {errors.password && <div className={styles.error}>{errors.password.message}</div>}
        </div>

        {/* Black Oval Register Button */}
        <button type="submit" className={styles.submitButton}>
          REGISTER
        </button>

        {/* Toggle text at the bottom */}
        <p className={styles.toggleText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.toggleLink}>Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;