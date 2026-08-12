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

  return (
    <div className="w-full flex justify-center items-center p-4  ">
      <div className="relative w-full max-w-5xl h-162.5 md:h-200 ">
        {/* form */}

        <div className=" p-8 flex justify-center items-center">
          <div className="w-full max-w-md">
            {/* heading */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-slate-200 mb-2">
                Sign Up
              </h2>
              <p className="text-slate-400">Sign Up to access your Account </p>
            </div>
            {/* form */}
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
              {/* usernawm */}
              <div>
                <label className="block text-slate-200 mb-3">User Name</label>
                <div className="relative">
                  <User
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="text"
                    {...register("name")}
                    placeholder="Username"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white"
                  />
                </div>

                {errors.name && (
                  <p
                    className="text-red-700 mt-1.5"
                    className="text-red-700 mt-1.5"
                  >
                    {errors.name.message}
                  </p>
                )}
              </div>
              {/* email */}
              <div>
                <label className="block text-slate-200 mb-3">Email</label>
                <div className="relative">
                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />
                  <input
                    type="email"
                    {...register("email")}
                    placeholder="Email"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-600 z-10 mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>
              {/* password */}
              <div>
                <label className="block text-slate-200 mb-3">Password</label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type={showPassword ? "text" : " password"}
                    {...register("password")}
                    placeholder="Password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white"
                  />
                  <button
                    type="button"
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-600 z-10 mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>
              {/* confirm password */}
              <div>
                <label className="block text-slate-200 mb-3">
                  Confirm Password
                </label>
                <div className="relative">
                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    placeholder="Confirm Pasword"
                    type="password"
                    className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-10 pr-4 text-white"
                    {...register("confirmPassword")}
                  />
                  <Eye
                    size={18}
                    className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-slate-400"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-700 mt-1.5">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSignUp}
                className="w-full bg-cyan-500 text-slate-200 py-2.5 font-medium rounded-lg
                   hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500"
              >
                {isSignUp ? (
                  <LoaderIcon className="w-full h-6 animate-spin text-center" />
                ) : (
                  "Create Account "
                )}
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="inline-block px-4 py-2 bg-cyan-400/10 text-cyan-400
                   hover:text-cyan-500 text-sm transition-colors"
              >
                Already have an Account ? Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
