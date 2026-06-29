import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AuthBackground from "@/assets/AuthBackground.jpg";
import { MailIcon, LockIcon, UserIcon, EyeIcon, HideEyeIcon, PhoneIcon } from "@/assets/icons";
import TeamUpLogo from "@/assets/TeamUp.png";
import { useRegisterMutation, registerSchema } from "@/hooks/useAuth";
import type { RegisterSchema } from "@/hooks/useAuth";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
      newsletterSubscribed: false,
    },
  });

  const registerMutation = useRegisterMutation();

  const onSubmit = async (data: RegisterSchema) => {
    const submitData = { ...data } as Partial<RegisterSchema>;
    delete submitData.confirmPassword;
    try {
      await registerMutation.mutateAsync(submitData as Omit<RegisterSchema, 'confirmPassword'>);
    } catch (err: unknown) {
      const errorObj = err as { response?: { data?: { message?: string } } };
      const message = errorObj.response?.data?.message || "Registration failed. Please try again.";
      setError("root", {
        type: "server",
        message,
      });
    }
  };

  const handleSignIn = () => {
    navigate("/auth/login");
  };

  return (
    <div className="relative w-screen h-screen bg-white overflow-hidden flex">
      {/* Left Side - Background with Sign In - 45% width */}
      <div className="w-[45%] h-full relative">
        {/* Background Image */}
        <div
          className="w-full h-full bg-cover bg-center relative"
          style={{ backgroundImage: `url(${AuthBackground})` }}
        >
          {/* Logo Section */}
          <div className="absolute left-8 lg:left-11 top-6 lg:top-10 w-[120px] lg:w-[150px] h-[48px] lg:h-[60.78px]">
            {/* TeamUp Logo - Recreated from Figma */}
            <img src={TeamUpLogo} alt="Team Up" />
          </div>
          {/* Decorative Elements */}
          {/* Triangle */}
          <div
            className="absolute w-[120px] lg:w-[120px] h-[120px] lg:h-[120px] right-[0] top-[80%] bg-white opacity-20"
            style={{
              clipPath: "polygon(0% 0%, 0% 100%, 100% 100%)",
              transform: "rotate(45deg)",
            }}
          ></div>

          {/* Ellipse */}
          <div className="absolute w-[45px] lg:w-[67px] h-[45px] lg:h-[67px] left-[15%] top-[70%] bg-white opacity-20 rounded-full"></div>

          {/* Content */}
          <div className="flex flex-col items-center justify-center h-full px-6 lg:px-8">
            {/* Title */}
            <h2 className="font-raleway font-bold text-[40px] lg:text-[70px] leading-[48px] lg:leading-[82px] text-white text-center mb-[24px] lg:mb-[38px]">
              Welcome Back!
            </h2>

            {/* Subtitle */}
            <p className="font-raleway font-medium text-[18px] lg:text-[30px] leading-[22px] lg:leading-[35px] text-center text-white mb-[32px] lg:mb-[47px] max-w-[280px] lg:max-w-[374px]">
              To keep connected with us please login with your personal info
            </p>

            {/* Sign In Button */}
            <button
              onClick={handleSignIn}
              disabled={isSubmitting}
              className="group w-[250px] lg:w-[333px] h-[60px] lg:h-[79px] border-2 border-white rounded-[30px] lg:rounded-[50.5px] flex items-center justify-center hover:bg-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span className="font-raleway font-semibold text-[20px] lg:text-[30px] leading-[24px] lg:leading-[35px] text-white group-hover:text-black transition-colors">
                SIGN IN
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form - 55% width */}
      <div className="w-[55%] h-full bg-white flex flex-col relative overflow-y-auto py-10">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center min-h-full px-6 lg:px-11">
          {/* Title */}
          <h1 className="font-raleway font-extrabold text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] text-center text-[#292524] mb-[20px] lg:mb-[30px]">
            Create Account
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-[400px] lg:max-w-[500px]"
          >
            {/* Error Message */}
            {errors.root && (
              <div className="mb-[20px] p-4 bg-red-50 border border-red-200 rounded-[12px] text-red-600 font-raleway font-semibold text-[14px] lg:text-[16px] text-center">
                {errors.root.message}
              </div>
            )}

            {/* Name Input */}
            <div className="relative mb-[12px] lg:mb-[16px]">
              <div className="w-full h-[55px] lg:h-[70px] bg-[#EAEEED] rounded-[12px] lg:rounded-[16px] flex items-center px-4 lg:px-6 focus-within:border-gray-300 focus-within:border">
                <UserIcon
                  size={24}
                  className="text-black opacity-30 mr-3 lg:mr-4 lg:w-8 lg:h-8"
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  {...register("name")}
                  className="flex-1 bg-transparent font-raleway font-medium text-[16px] lg:text-[20px] leading-[20px] lg:leading-[24px] text-black placeholder-[#a4a4a4] placeholder-opacity-30 outline-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            {errors.name && (
              <span className="text-red-500 text-[14px] font-semibold pl-2 block -mt-2 mb-2">
                {errors.name.message}
              </span>
            )}

            {/* Email Input */}
            <div className="relative mb-[12px] lg:mb-[16px]">
              <div className="w-full h-[55px] lg:h-[70px] bg-[#EAEEED] rounded-[12px] lg:rounded-[16px] flex items-center px-4 lg:px-6 focus-within:border-gray-300 focus-within:border">
                <MailIcon
                  size={24}
                  className="text-black opacity-30 mr-3 lg:mr-4 lg:w-8 lg:h-8"
                />
                <input
                  type="email"
                  placeholder="Email"
                  {...register("email")}
                  className="flex-1 bg-transparent font-raleway font-medium text-[16px] lg:text-[20px] leading-[20px] lg:leading-[24px] text-black placeholder-[#a4a4a4] placeholder-opacity-30 outline-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            {errors.email && (
              <span className="text-red-500 text-[14px] font-semibold pl-2 block -mt-2 mb-2">
                {errors.email.message}
              </span>
            )}

            {/* Phone Input */}
            <div className="relative mb-[12px] lg:mb-[16px]">
              <div className="w-full h-[55px] lg:h-[70px] bg-[#EAEEED] rounded-[12px] lg:rounded-[16px] flex items-center px-4 lg:px-6 focus-within:border-gray-300 focus-within:border">
                <PhoneIcon
                  size={24}
                  className="text-black opacity-30 mr-3 lg:mr-4 lg:w-8 lg:h-8"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  {...register("phone")}
                  className="flex-1 bg-transparent font-raleway font-medium text-[16px] lg:text-[20px] leading-[20px] lg:leading-[24px] text-black placeholder-[#a4a4a4] placeholder-opacity-30 outline-none"
                  disabled={isSubmitting}
                />
              </div>
            </div>
            {errors.phone && (
              <span className="text-red-500 text-[14px] font-semibold pl-2 block -mt-2 mb-2">
                {errors.phone.message}
              </span>
            )}

            {/* Password Input */}
            <div className="relative mb-[12px] lg:mb-[16px]">
              <div className="w-full h-[55px] lg:h-[70px] bg-[#EAEEED] rounded-[12px] lg:rounded-[16px] flex items-center px-4 lg:px-6 focus-within:border-gray-300 focus-within:border">
                <LockIcon
                  size={22}
                  className="text-black opacity-30 mr-3 lg:mr-4 lg:w-7 lg:h-7"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  {...register("password")}
                  className="flex-1 bg-transparent font-raleway font-medium text-[16px] lg:text-[20px] leading-[20px] lg:leading-[24px] text-black placeholder-[#a4a4a4] placeholder-opacity-30 outline-none"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="ml-2 focus:outline-none"
                  disabled={isSubmitting}
                >
                  {showPassword ? (
                    <HideEyeIcon size={22} className="text-black " />
                  ) : (
                    <EyeIcon size={22} className="text-black " />
                  )}
                </button>
              </div>
            </div>
            {errors.password && (
              <span className="text-red-500 text-[14px] font-semibold pl-2 block -mt-2 mb-2">
                {errors.password.message}
              </span>
            )}

            {/* Confirm Password Input */}
            <div className="relative mb-[16px] lg:mb-[24px]">
              <div className="w-full h-[55px] lg:h-[70px] bg-[#EAEEED] rounded-[12px] lg:rounded-[16px] flex items-center px-4 lg:px-6 focus-within:border-gray-300 focus-within:border">
                <LockIcon
                  size={22}
                  className="text-black opacity-30 mr-3 lg:mr-4 lg:w-7 lg:h-7"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  {...register("confirmPassword")}
                  className="flex-1 bg-transparent font-raleway font-medium text-[16px] lg:text-[20px] leading-[20px] lg:leading-[24px] text-black placeholder-[#a4a4a4] placeholder-opacity-30 outline-none"
                  disabled={isSubmitting}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="ml-2 focus:outline-none"
                  disabled={isSubmitting}
                >
                  {showConfirmPassword ? (
                    <HideEyeIcon size={24} className="text-black " />
                  ) : (
                    <EyeIcon size={24} className="text-black " />
                  )}
                </button>
              </div>
            </div>
            {errors.confirmPassword && (
              <span className="text-red-500 text-[14px] font-semibold pl-2 block -mt-2 mb-2">
                {errors.confirmPassword.message}
              </span>
            )}


            {/* Sign Up Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-[280px] lg:w-[333px] h-[60px] lg:h-[79px] bg-[#E1017D] rounded-[30px] lg:rounded-[50.5px] flex items-center justify-center hover:bg-[#B71778] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <span className="font-raleway font-semibold text-[20px] lg:text-[30px] leading-[24px] lg:leading-[35px] text-white">
                  {isSubmitting ? "SIGNING UP..." : "SIGN UP"}
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
