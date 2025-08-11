import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate} from "react-router";
import { setCredentials } from "../../../redux/features/auth/authSlice";
import { useLoginMutation } from "../../../redux/features/auth/authApi";

export default function Login() {
  const dispatch = useDispatch();
  const [login] = useLoginMutation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({ email, password }).unwrap();
      dispatch(setCredentials({ user: response.data.user, token: response.data.token }));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex h-screen flex-col md:flex-row !bg-gradient-to-b from-[#009DDA] to-[#294DFF] ">
      {/* Left section - Hero (hidden on mobile) */}
      <div className="hidden md:flex lg:w-2/3 !h-screen flex-col items-center justify-start !bg-gradient-to-b from-[#009DDA] to-[#294DFF] p-8 text-white">
        <div className="mb-12 w-40">
          {/* <img
            src="/White_Logo.png"
            alt="Time to TASK"
            width={160}
            height={50}
            priority
          /> */}
        </div>
        <h1 className="mb-8 text-center text-[38px] font-bold leading-tight w-[500px]">
          Effortless, Secure and Smart tracking and project management tool
        </h1>
      </div>

      {/* Right section - Login Form */}
      <div className="flex w-full lg:w-1/3 flex-col items-center justify-center pl-8 pr-8 pb-12  !bg-gradient-to-b from-[#009DDA] to-[#294DFF] ">
        <div className="w-full max-w-md bg-white !h-full py-8 px-8">
          {/* Logo for mobile view */}
          <div className="mb-8 flex justify-center md:hidden">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brand%20Logo%201-nj4q3hMvbB2ldLUqDtx7IjCxE3fl1R.png"
              alt="Time to TASK"
              width={140}
              height={45}
              priority
            />
          </div>

          {/* Logo for desktop view */}
          <div className="mb-8 hidden md:flex justify-center">
            {/* <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Brand%20Logo%201-nj4q3hMvbB2ldLUqDtx7IjCxE3fl1R.png"
              alt="Time to TASK"
              width={140}
              height={45}
              priority
            /> */}
          </div>

          <h2 className="mb-6 text-center text-2xl font-semibold text-gray-800">
            Login to your account
          </h2>

          {/* Social Login Buttons */}
          <div className="mb-4 space-y-3">
            <button className="flex w-full items-center justify-center rounded border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Continue With Google
            </button>
            <button className="flex w-full items-center justify-center rounded border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"
                />
              </svg>
              Continue With Apple
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center">
            <div className="flex-grow border-t border-gray-200"></div>
            <span className="mx-4 text-sm text-gray-400">
              Or continue with email
            </span>
            <div className="flex-grow border-t border-gray-200"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email <span className=" text-red-600">*</span>
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-primary_color focus:outline-none focus:ring-primary_color"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password <span className=" text-red-600">*</span>
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border border-gray-200 px-3 py-2 shadow-sm focus:border-primary_color focus:outline-none focus:ring-primary_color"
                placeholder="Enter password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-md bg-primary_color py-2 px-4 font-medium text-white hover:bg-[#9b00ff] focus:outline-none focus:ring-2 focus:ring-primary_color focus:ring-offset-2"
            >
              Sign In
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-[#009DDA] hover:text-[#009DDA]"
            >
              Forgot password?
            </Link>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#009DDA] hovertext-[#009DDA]"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
