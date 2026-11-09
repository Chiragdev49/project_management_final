import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../store/slices/authSlice";
import { BookOpen, Loader, PhoneCall } from "lucide-react";
import { toast } from "react-toastify";

const LoginPage = () => {
  const dispatch = useDispatch();
  const { isLoggingIn, authUser } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "student",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be atleast 8 character";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    const data = new FormData();
    data.append("email", formData.email);
    data.append("password", formData.password);
    data.append("role", formData.role);

    dispatch(login(data));
    // console.log("Sending data:", formData);
    // dispatch(login(formData));
  };
  

  useEffect(() => {
    if (authUser) {
      // toast.success("Logged in successfully ✅");
      // console.log("authUser:", authUser);
      switch (formData.role) {
        case "student":
          navigate("/student");
          break;
        case "teacher":
          navigate("/teacher");
          break;
        case "admin":
          navigate("/admin");
          break;

        default:
          navigate("/login");
      }
    }
  }, [authUser]);

  return (
    <>
   
      <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full">
          {/* header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-500 rounded-full mb-4">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-slate-800">
              Educational project Management
            </h1>
            <p className="text-slate-600 mt-2">Sign in to your account</p>
          </div>
          {/* form */}
          <div className="card">
            <form onSubmit={handleSubmit} className="space-y-6">
              {errors.general && (
                <div className="p-3 border-red-200 bg-red-50 border rounded-lg">
                  <p className="text-red-600 text-sm">{errors.general}</p>
                </div>
              )}
              {/* roleselection */}
              <div >
              <label className="label">Select role</label>
              <select name="role" className="input" value={formData.role} onChange={handleChange}>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="admin">Admin</option>
              </select>
              </div>

              {/* email Address */}
              <div>
                <label className="label">Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} className={`input ${errors.email?"input-error":""}`}
                placeholder="Enter Your Email"
                />
                {
                  errors.email &&(
                    <p className="text-sm mt-1 text-red-600">{errors.email}</p>
                  )
                }
              </div>

              {/* password */}
              <div>
                <label className="label">Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} className={`input ${errors.password?"input-error":""}`}
                placeholder="Enter Your Email"
                />
                {
                  errors.password &&(
                    <p className="text-sm mt-1 text-red-600">{errors.password}</p>
                  )
                }
              </div>

              {/* forgot password link */}
              <div className="text-right">
                <Link
                to={"/forgot-password"}
                className="text-sm text-blue-600 hover:text-blue-500"
                >
                Forgot Your Password?</Link>
              </div>

              {/* submit button */}
              <button type="submit" disabled={isLoggingIn} className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed">
                {
                  isLoggingIn ?(
                      <div className="flex justify-center items-center">
                        <Loader className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"/>
                        Siging <i></i>n...
                      </div>
                  ):"Sign In"
                }
              </button>

            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
