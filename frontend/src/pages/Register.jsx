import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "../schema/registerSchema";
import { Eye, EyeOff, LoaderIcon, Lock, Mail, User } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { userStore } from "../stores/userStore";

function Register() {
  const { signUp, isSignUp } = userStore();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema) });

  // to handle form
  const submitHandler = async (data) => {
    await signUp(data);
  };

  const [showConfirm, setShowConfirm] = useState(false);

  const inputClass =
    "w-full rounded-xl border border-green-600 bg-white py-3 pl-10 pr-10 " +
    "text-slate-900 placeholder-slate-400 outline-none " +
    "focus:ring-2 focus:ring-green-500 focus:border-green-500";
  
  return (
    <div className="w-full flex justify-center items-center p-4 pt-24">
      <div className="relative w-full max-w-5xl h-162.5 md:h-200">
        <div className="p-8 flex justify-center items-center">
          <div className="w-full max-w-md">
            {/* heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-green-800 mb-2">
                Sign Up
              </h2>
              <p className="text-slate-500">Sign Up to access your Account</p>
            </div>

            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
              {/* username */}
              <div>
                <label className="block text-slate-700 font-medium mb-3">
                  User Name
                </label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Username"
                    className={inputClass}
                  />
                </div>
                {errors.name && (
                  <p className="text-red-600 text-sm mt-1.5">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* email */}
              <div>
                <label className="block text-slate-700 font-medium mb-3">
                  Email
                </label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email"
                    className={inputClass}
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 text-sm mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* password */}
              <div>
                <label className="block text-slate-700 font-medium mb-3">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    placeholder="Password"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 text-sm mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* confirm password */}
              <div>
                <label className="block text-slate-700 font-medium mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type={showConfirm ? "text" : "password"}
                    {...register("confirmPassword")}
                    placeholder="Confirm Password"
                    className={inputClass}
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400 hover:text-slate-600"
                    onClick={() => setShowConfirm(!showConfirm)}
                  >
                    {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-600 text-sm mt-1.5">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSignUp}
                className="w-full bg-green-600 text-white py-2.5 font-medium rounded-lg
              hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500
              disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
              >
                {isSignUp ? (
                  <LoaderIcon className="w-full h-6 animate-spin text-center" />
                ) : (
                  "Create Account"
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-block px-4 py-2 rounded-lg bg-green-100 text-green-700
              hover:text-green-900 text-sm transition-colors"
              >
                Already have an Account? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
