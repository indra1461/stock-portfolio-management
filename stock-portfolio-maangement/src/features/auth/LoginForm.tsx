"use client";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { LoginPayload } from "./authTypes";
import { setAuthData }  from "@/app/utils/storage";
import { loginUser } from "./authServces";
import axios from "axios";
import { useRouter } from "next/navigation";
import { loginSuccess } from "./authSlice";
import { useAppDispatch } from "@/store/hooks";
import { useState } from "react";

export default function LoginForm() {
  const [apiError, setApiError] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>();

  const onSubmit = async (data: LoginPayload) => {
    try {
        setApiError("");
        setLoading(true);
      const response = await loginUser(data);

      setAuthData(
        response.accessToken,
        {
          id: response.id,
          name: response.firstName,
          email: response.email,
        }
      );

      dispatch(
        loginSuccess({
          user: {
            id: response.id,
            name: response.firstName,
            email: response.email,
          },
          token: response.accessToken,
        })
      );

      router.push("/dashboard");
    } catch (error) {
      const message = axios.isAxiosError(error)
        ? error.response?.data?.message || "Login Failed"
        : "Login Failed";
      setApiError(message);
    } finally{
      setLoading(false);  
    }
  };

  return (
    <>

    <div className="text-slate-400 text-sm mt-1 text-center">username:emilys</div>
    <div className="text-slate-400 text-sm mt-1 text-center mb-3">password:emilyspass</div>
      {apiError && (
        <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg text-sm">
          {apiError}
        </div>
      )}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-slate-800/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 shadow-2xl flex flex-col gap-5"
      >
        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-300">Username</label>
          <input
            type="text"
            placeholder="Enter your username"
            {...register("username", { required: "Username is required" })}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          {errors.username && (
            <p className="text-red-400 text-xs mt-0.5 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-sm font-medium text-slate-300">Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            {...register("password", { required: "Password is required" })}
            className="w-full px-4 py-3 rounded-xl bg-slate-900/60 border border-slate-700 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors"
          />
          {errors.password && (
            <p className="text-red-400 text-xs mt-0.5 flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {errors.password.message}
            </p>
          )}
        </div>

        <button
        disabled={loading}
          type="submit"
          className="mt-1 w-full py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 active:bg-emerald-600 text-white font-semibold text-sm tracking-wide transition-colors cursor-pointer shadow-lg shadow-emerald-500/20"
        >
       {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="text-center text-slate-500 text-xs">
          Don&apos;t have an account?{" "}
          <Link href="/register" className="text-emerald-400 hover:text-emerald-300 transition-colors">
            Create one
          </Link>
        </p>
      </form>
    </>
  );
}
