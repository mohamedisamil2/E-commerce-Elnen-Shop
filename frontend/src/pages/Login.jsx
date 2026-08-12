import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schema/loginSchema";
import { Eye, EyeOff, LoaderIcon, Lock, Mail } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import { userStore } from "../stores/userStore";

function Login() {
  const { login, isSignIn } = userStore();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  // to handle form
  const submitHandler = async (data) => {
    await login(data);
  };

  return (
    <div className="w-full flex justify-center items-center p-4  ">
      <div className="relative w-full max-w-5xl h-162.5 md:h-200 ">
        {/* form and overview */}

        {/* form */}

        <div className=" p-8 flex justify-center items-center">
          <div className="w-full max-w-md">
            {/* heading */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-bold text-slate-300 mb-2">Login</h2>
              <p className="text-slate-400">Sign In to access your Account </p>
            </div>
            {/* form */}
            <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
              {/* email */}
              <div>
                <label className="block text-slate-300 mb-3">Email</label>
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
                <label className="block text-slate-300 mb-3">Password</label>
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

              <button
                type="submit"
                disabled={isSignIn}
                className="w-full bg-cyan-500 text-slate-200 py-2.5 font-medium rounded-lg
                   hover:bg-cyan-600 focus:ring-2 focus:ring-cyan-500"
              >
                {isSignIn ? (
                  <LoaderIcon className="w-full h-6 animate-spin text-center" />
                ) : (
                  "Sign In "
                )}
              </button>
            </form>
            <div className="mt-6 text-center">
              <Link
                to="/register"
                className="inline-block px-4 py-2 bg-cyan-400/10 text-cyan-400
                  hover:text-cyan-500 text-sm transition-colors"
              >
                Don't have an Account ? Sign Up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
