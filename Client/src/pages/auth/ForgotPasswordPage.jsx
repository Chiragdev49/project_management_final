import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { KeyRound, Loader } from "lucide-react";
import { forgotPassword } from "../../store/slices/authSlice";

const ForgotPasswordPage = () => {
  const [email,setEmail]=useState("");
  const [isSubmitted,setIsSubmitted]=useState("");
  const [error,setError]=useState("");
  const {isRequestingForToken}=useSelector((state)=>state.auth);

  const dispatch = useDispatch();

 const handleSubmit=async(e)=>{
  e.preventDefault();

  if(!email){
    setError("Email is required");
    return;
  }
  if(!/\S+@\S+\.\S+/.test(email)) {
    setError("Email is invalid");
    return;
  }
  setError("");
  try {
    await dispatch(forgotPassword({email})).unwrap();
    setIsSubmitted(true);
  } catch (error) {
    setError(error||"Failed to send reset link, please try again");
  }
 }
 const handleResend = async () => {
  try {
    await dispatch(forgotPassword({ email })).unwrap();
  } catch (error) {
    setError(error || "Failed to resend email");
  }
};

 if (isSubmitted) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-6 rounded-lg shadow text-center">
        
        <h2 className="text-2xl font-bold text-slate-800 mb-4">
          Check your email 📩
        </h2>

        <p className="text-slate-600 mb-2">
          We have sent a password reset link to your email address.
        </p>

        <p className="text-sm text-slate-500 mb-4">
          If an account with <span className="font-medium">{email}</span> exists,
          you will receive a password reset email shortly.
        </p>

        {/* Back to login */}
        <Link
          to="/login"
          className="block w-full mb-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500"
        >
          Back to Login
        </Link>

        {/* Resend email */}
        <button
          onClick={handleResend}
          className="text-sm text-blue-600 hover:underline"
        >
          Send another email
        </button>
      </div>
    </div>
  );
}

return (
  <>
 
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-slate-800">
            Forgot Password?
          </h1>
          <p className="text-slate-600 mt-2">ENter your email address and we'll send you a link to reset your password</p>
        </div>
        {/*forgot password form */}
        <div className="card">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 border-red-200 bg-red-50 border rounded-lg">
                <p className="text-red-600 text-sm">{error}</p>
              </div>
            )}

            {/* email Address */}
            <div>
              <label className="label">Email Address</label>
              <input type="email" name="email" value={email} onChange={(e)=>{
                setEmail(e.target.value);
                if(error)setError("");
              }} className={`input ${error?"input-error":""}`}
              placeholder="Enter Your Email"
              disabled={isRequestingForToken}
              />
              {
                error &&(
                  <p className="text-sm mt-1 text-red-600">{error}</p>
                )
              }
            </div>

            {/* submit button */}
            <button type="submit" disabled={isRequestingForToken} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
              {
                isRequestingForToken ?(
                    <div className="flex justify-center items-center">
                      <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"/>
                      Sending...
                    </div>
                ):"Send Reset Link"
              }
            </button>

          </form>
          <div className="mt-6 text-center ">
            <p className="text-sm text-slate-600">
              Remember Your Password? <Link className="text-blue-600 hover:text-blue-500 font-medium">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);
};

export default ForgotPasswordPage;
