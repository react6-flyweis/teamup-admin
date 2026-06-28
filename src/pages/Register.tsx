import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthBackground from "@/assets/AuthBackground.jpg";
import { MailIcon, LockIcon, UserIcon, EyeIcon, HideEyeIcon } from "@/assets/icons";
import TeamUpLogo from "@/assets/TeamUp.png";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log("Sign up:", formData);
    navigate("/");
  };

  const handleSignIn = () => {
    navigate("/auth/login");
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
              className="group w-[250px] lg:w-[333px] h-[60px] lg:h-[79px] border-2 border-white rounded-[30px] lg:rounded-[50.5px] flex items-center justify-center hover:bg-white transition-all"
            >
              <span className="font-raleway font-semibold text-[20px] lg:text-[30px] leading-[24px] lg:leading-[35px] text-white group-hover:text-black transition-colors">
                SIGN IN
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Right Side - Sign Up Form - 55% width */}
      <div className="w-[55%] h-full bg-white flex flex-col relative">
        {/* Main Content */}
        <div className="flex flex-col items-center justify-center h-full px-6 lg:px-11">
          {/* Title */}
          <h1 className="font-raleway font-extrabold text-[32px] lg:text-[48px] leading-[40px] lg:leading-[56px] text-center text-[#292524] mb-[32px] lg:mb-[54px]">
            Create Account
          </h1>

          {/* Form */}
          <form
            onSubmit={handleSignUp}
            className="w-full max-w-[400px] lg:max-w-[500px]"
          >
            {/* Name Input */}
            <div className="relative mb-[16px] lg:mb-[24px]">
              <div className="w-full h-[60px] lg:h-[80px] bg-[#EAEEED] rounded-[16px] lg:rounded-[20px] flex items-center px-4 lg:px-6">
                <UserIcon
                  size={24}
                  className="text-black opacity-30 mr-3 lg:mr-4 lg:w-8 lg:h-8"
                />
                <input
                  type="text"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="flex-1 bg-transparent font-raleway font-medium text-[18px] lg:text-[22px] leading-[22px] lg:leading-[26px] text-black placeholder-[#a4a4a4] placeholder-opacity-30 outline-none"
                />
              </div>
            </div>

            {/* Email Input */}
            <div className="relative mb-[16px] lg:mb-[24px]">
              <div className="w-full h-[60px] lg:h-[80px] bg-[#EAEEED] rounded-[16px] lg:rounded-[20px] flex items-center px-4 lg:px-6">
                <MailIcon
                  size={24}
                  className="text-black opacity-30 mr-3 lg:mr-4 lg:w-8 lg:h-8"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="flex-1 bg-transparent font-raleway font-medium text-[18px] lg:text-[22px] leading-[22px] lg:leading-[26px] text-black placeholder-[#a4a4a4] placeholder-opacity-30 outline-none"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="relative mb-[16px] lg:mb-[24px]">
              <div className="w-full h-[60px] lg:h-[80px] bg-[#EAEEED] rounded-[16px] lg:rounded-[20px] flex items-center px-4 lg:px-6">
                <LockIcon
                  size={22}
                  className="text-black opacity-30 mr-3 lg:mr-4 lg:w-7 lg:h-7"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="flex-1 bg-transparent font-raleway font-medium text-[18px] lg:text-[22px] leading-[22px] lg:leading-[26px] text-black placeholder-[#a4a4a4] placeholder-opacity-30 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="ml-2 focus:outline-none"
                >
                  {showPassword ? (
                    <HideEyeIcon size={22} className="text-black " />
                  ) : (
                    <EyeIcon size={22} className="text-black " />
                  )}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="relative mb-[32px] lg:mb-[46px]">
              <div className="w-full h-[60px] lg:h-[80px] bg-[#EAEEED] rounded-[16px] lg:rounded-[20px] flex items-center px-4 lg:px-6">
                <LockIcon
                  size={22}
                  className="text-black opacity-30 mr-3 lg:mr-4 lg:w-7 lg:h-7"
                />
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    handleInputChange("confirmPassword", e.target.value)
                  }
                  className="flex-1 bg-transparent font-raleway font-medium text-[18px] lg:text-[22px] leading-[22px] lg:leading-[26px] text-black placeholder-[#a4a4a4] placeholder-opacity-30 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="ml-2 focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <HideEyeIcon size={24} className="text-black " />
                  ) : (
                    <EyeIcon size={24} className="text-black " />
                  )}
                </button>
              </div>
            </div>

            {/* Sign Up Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-[280px] lg:w-[333px] h-[60px] lg:h-[79px] bg-[#E1017D] rounded-[30px] lg:rounded-[50.5px] flex items-center justify-center hover:bg-[#B71778] transition-colors"
              >
                <span className="font-raleway font-semibold text-[20px] lg:text-[30px] leading-[24px] lg:leading-[35px] text-white">
                  SIGN UP
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
