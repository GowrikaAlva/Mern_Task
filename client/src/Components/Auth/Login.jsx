import { useForm } from 'react-hook-form';
import styles from './Auth.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
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
  // NOTE: The 'rememberMe' field is not included in the data submitted to the backend here, 
    // as it was not registered with React Hook Form. If you need this data, 
    // you should register a hidden field or checkbox input.
 try {
 const response = await axios.post('http://localhost:3001/api/auth/login', data, {
 withCredentials: true,
 });

 if (response.status === 200) {
 alert('Login successful!');
 const {accessToken} =response.data;
 if(accessToken){
 localStorage.setItem("accessToken",accessToken)
 }else{
 console.log("Token Not Received");
 }
 // Navigate to dashboard or protected route
 navigate('/userDetails'); 
 }
 } catch (error) {
 console.error('Login error:', error);
 if (error.response) {
 alert(error.response.data.message || 'Login failed');
 } else {
 alert('An unexpected error occurred. Please try again.');
 }
 }
 };


return (
<div className={styles.authContainer}>
 <form className={styles.authForm} onSubmit={handleSubmit(onSubmit)}>
 {/* Title changed to "sign in" (lowercase, spaced) */}
 <h2 className={styles.authTitle}>sign in</h2> 

 <div className={styles.inputGroup}>
 {/* Label is hidden via CSS, input uses placeholder */}
 <input
 id="email"
 type="email"
 className={styles.input}
 placeholder="Username" 
 {...register('email', {
 required: 'Username is required',
 pattern: {
                // Assuming username is an email based on original code, but changing message
 value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
 message: 'Invalid username format (must be email)',
 },
 })}
 />
 {errors.email && <div className={styles.error}>{errors.email.message}</div>}
 </div>

 <div className={styles.inputGroup}>
 {/* Label is hidden via CSS, input uses placeholder */}
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

 {/* Footer Section for "Remember me" and "Forgot Password" */}
 <div className={styles.formFooter}>
 <div className={styles.rememberMeGroup}>
 {/* Using an input type="radio" for the circle style */}
 <input type="radio" id="rememberMe" name="remember" defaultChecked={true} />
 <label htmlFor="rememberMe">Remember me</label>
</div>
 <Link to="/forgot-password" className={styles.forgotPassword}>
 Forgot Password
</Link>
</div>
 
 <button type="submit" className={styles.submitButton}>
LOGIN
</button>

 <p className={styles.toggleText}>
 Don't have an account?{' '}
 <Link to="/register" className={styles.toggleLink}>Register here</Link>
 </p>
 </form>
  </div>
 );
};

export default Login;