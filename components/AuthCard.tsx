import { useState } from "react";
import Image from "next/image";
import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
// import LoadingModel from "./models/Loading/LoadingModel";
// import ErrorModel from "./models/Error/ErrorModel";
import { EMAIL_SIGNUP, EMAIL_LOGIN, getErrorMessage } from "@/lib/helper";
import { googleAuthentication } from "@/lib/firebase/userHandler";
import { Toaster, toast } from "sonner";
import LoadingModel from "./models/LoadingModel";
import { useAppDispatch } from "@/lib/redux/hooks";

export const userEmailAuthApiHandler = async (
  authType: any,
  userEmail: any,
  userPassword: any,
) => {
  const response = await fetch("/api/auth/userEmailAuth", {
    method: "POST",
    body: JSON.stringify({ authType, userEmail, userPassword }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();
  return data;
};

type Login = {
  email: string;
  password: string;
};

type Signup = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function AuthCard() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  // const [loadingModelVisible, setLoadingModel] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // const [errorModelVisible, setErrorModel] = useState<boolean>(false);
  // const [errorMessage, setErrorMessage] = useState<string>("");

  const dispatch = useAppDispatch();

  const [googleLogin, setGoogleLogin] = useState<boolean>(false);
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isPasswordVisible, setPasswordVisible] = useState<boolean>(false);
  const [isConfirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false);

  const [loginFormData, setLoginFormData] = useState<Login>({
    email: "",
    password: "",
  });
  const [loginFormErrors, setLoginFormErrors] = useState<Login>({
    email: "",
    password: "",
  });

  const [signupFormData, setSignupFormData] = useState<Signup>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [signupFormErrors, setSignupFormErrors] = useState<Signup>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginFormValidation = (): boolean => {
    const newFormErrors: Login = {
      email: "",
      password: "",
    };
    // Check if email is empty
    if (!loginFormData.email.trim()) {
      newFormErrors.email = "Email cannot be empty";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(loginFormData.email)) {
        newFormErrors.email = "Enter a valid Email address";
      }
    }
    // check for password length
    if (loginFormData.password.length < 7) {
      newFormErrors.password = "Enter a Strong Password";
    }
    setLoginFormErrors(newFormErrors);
    const isValid = Object.values(newFormErrors).every((error) => error === "");
    return isValid;
  };

  const handleSignupFormValidation = (): boolean => {
    const newFormErrors = {
      email: "",
      password: "",
      confirmPassword: "",
    };
    // Check if email is empty
    if (!signupFormData.email.trim()) {
      newFormErrors.email = "Email cannot be empty";
    } else {
      // Check if email is valid using a simple regex pattern
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(signupFormData.email)) {
        newFormErrors.email = "Enter a Valid Email Address";
      }
    }
    // check for passworda and confrim password length
    if (signupFormData.password.length < 7) {
      newFormErrors.password = "Password cannot be empty";
    }
    if (signupFormData.confirmPassword.length < 7) {
      newFormErrors.confirmPassword = "Confirm Password cannot be empty";
    }
    // Check if password and confirmPassword match
    if (signupFormData.password !== signupFormData.confirmPassword) {
      newFormErrors.confirmPassword = "Passwords do not match";
    }
    setSignupFormData(newFormErrors);
    const isValid = Object.values(newFormErrors).every((error) => error === "");
    return isValid;
  };

  // handle onchange of input
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    if (isLogin) {
      setLoginFormData((prevData) => ({ ...prevData, [name]: value }));
      setLoginFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    } else {
      setSignupFormData((prevData) => ({ ...prevData, [name]: value }));
      setSignupFormErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));
    }
  };

  const googleLoginHandler = async () => {
    const userResponse = await googleAuthentication();

    if (!userResponse.userCredentials && !userResponse.error) {
      toast.error(String(userResponse.message));
    } else if (userResponse.error) {
      const displayErrorMsg = await getErrorMessage(
        "Google authentication error!",
      );
      toast.error(String(displayErrorMsg));
    } else {
      // setLoadingModel(true);
      // dispatch(setLogin());
      router.push("/profile");
    }
  };

  // const emailLoginHandler = async (event: any) => {
  //   event.preventDefault();
  //   setLoadingModel(true);

  //   if (!isLogin && password !== confirmPassword) {
  //     setLoadingModel(false);
  //     setErrorMessage("Password does not match!");
  //     setErrorModel(true);
  //     return;
  //   }

  //   try {
  //     const userResponse = await userEmailAuthApiHandler(
  //       isLogin ? EMAIL_LOGIN : EMAIL_SIGNUP,
  //       isLogin ? loginFormData.email : signupFormData.email,
  //       isLogin ? loginFormData.password : signupFormData.password
  //     );
  //     if (userResponse.error) {
  //       setLoadingModel(false);
  //       setErrorModel(true);
  //       const displayErrorMsg = await getErrorMessage(userResponse.error.code);
  //       setErrorMessage(String(displayErrorMsg));
  //     } else {
  //       router.replace("/profile");
  //     }
  //   } catch (error: any) {
  //     setLoadingModel(false);
  //     setErrorModel(true);
  //     setErrorMessage("Authentication failed!");
  //   }
  // };

  const emailLoginHandler = async (event: any) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = isLogin ? loginFormData : signupFormData;
      const validationFunction = isLogin
        ? handleLoginFormValidation()
        : handleSignupFormValidation();

      if (validationFunction) {
        const userResponse = await userEmailAuthApiHandler(
          isLogin ? EMAIL_LOGIN : EMAIL_SIGNUP,
          formData.email,
          formData.password,
        );

        if (userResponse.error) {
          const displayErrorMsg = await getErrorMessage(
            userResponse.error.code,
          );
          toast.error(String(displayErrorMsg));
        } else {
          router.replace("/profile");
        }
      } else {
        toast.error("fill all the field");
      }
    } catch (error: any) {
      toast.error("Authentication failed!");
    }
    setIsLoading(false);
  };

  return (
    <>
      {/* <LoadingModel
        modelVisible={loadingModelVisible}
        setLoadingModel={setLoadingModel}
      /> */}

      <LoadingModel isLoading={isLoading} setIsLoading={setIsLoading} />

      {/* <ErrorModel
        errorMsg={errorMessage}
        setErrorMessage={setErrorMessage}
        modelVisible={errorModelVisible}
        setErrorModel={setErrorModel}
      /> */}

      <div className="absolute right-4 top-4 z-50">
        <Toaster duration={3000} richColors position="top-left" />
      </div>

      <div className="z-20 w-full max-w-sm rounded-xl bg-white p-4">
        <div className="relative">
          <Image
            alt="staybook_logo"
            src="/brand_logo.svg"
            width={48}
            height={48}
            className="mx-auto"
            priority
          />
        </div>
        <p className="mb-4 text-center text-2xl font-bold sm:text-4xl">
          {isLogin ? "Welcome back" : "Create your account"}
        </p>

        <div>
          <form onSubmit={emailLoginHandler}>
            <div className="my-5 tracking-wide">
              <input
                className="peer h-12 w-full rounded-full border-2 px-4 shadow-md outline-none"
                type="text"
                name="email"
                placeholder="Email"
                value={isLogin ? loginFormData.email : signupFormData.email}
                onChange={handleChange}
              />
              <p className="font-medium text-red-700">
                {isLogin ? loginFormErrors.email : signupFormErrors.email}
              </p>
            </div>

            <div className="my-5 tracking-wide">
              <div className="relative">
                <input
                  className="peer h-12 w-full rounded-full border-2 px-4 shadow-md outline-none"
                  type={isPasswordVisible ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={
                    isLogin ? loginFormData.password : signupFormData.password
                  }
                  onChange={handleChange}
                />
                <div
                  onClick={() => setPasswordVisible(!isPasswordVisible)}
                  className="absolute right-0.5 top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white"
                >
                  {isPasswordVisible ? (
                    <EyeIcon className="h-6 w-6" />
                  ) : (
                    <EyeOffIcon className="h-6 w-6" />
                  )}
                </div>
              </div>
              <p className="font-medium text-red-700">
                {isLogin ? loginFormErrors.password : signupFormErrors.password}
              </p>
            </div>

            {!isLogin && (
              <div className="my-5 tracking-wide">
                <div className="relative">
                  <input
                    className="peer h-12 w-full rounded-full border-2 px-4 shadow-md outline-none"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={signupFormData.confirmPassword}
                    onChange={handleChange}
                  />
                  <div
                    onClick={() =>
                      setConfirmPasswordVisible(!isConfirmPasswordVisible)
                    }
                    className="absolute right-0.5 top-1/2 grid h-10 w-10 -translate-y-1/2 cursor-pointer place-items-center rounded-full bg-white"
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeIcon className="h-6 w-6" />
                    ) : (
                      <EyeOffIcon className="h-6 w-6" />
                    )}
                  </div>
                </div>
                <p className="font-medium text-red-700">
                  {signupFormErrors.confirmPassword}
                </p>
              </div>
            )}
            <button className="h-12 w-full rounded-full bg-secondary font-medium text-white">
              {isLogin ? "Log in" : "Sign up"}
            </button>
          </form>
        </div>

        <div className="flex h-12 items-end justify-center gap-4 font-medium">
          <p className={`text-md text-gray-600`}>
            {isLogin ? "Create new account" : "Login to your account"}
          </p>
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-secondary"
          >
            {isLogin ? "Sign-up" : "Log-in"}
          </button>
        </div>
        <div
          className="flex w-full cursor-pointer justify-center"
          onClick={() => router.push("/forgotPassword")}
        >
          <p className="text-gray-600">forgot password?</p>
        </div>
        <div className="flex items-center justify-center">
          <p className="w-full border border-secondary"></p>
          <p className="p-4">OR</p>
          <p className="w-full border border-secondary"></p>
        </div>

        <div
          onClick={googleLoginHandler}
          className="flex items-center gap-x-3 rounded-full border-2 p-3  font-medium"
        >
          <Image src="/google.svg" alt="goolge_icon" width={25} height={25} />
          <button className="text-gray-600">
            {isLogin ? "Log-in" : "Sign-up"} with Google
          </button>
        </div>
      </div>
    </>
  );
}
