import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Link } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import logo from "../../assets/svg/logo-1.svg";
import GoogleLogo from "../../assets/svg/google-logo.svg";
import { AutoInput } from "../../components/form/customInput";
import { PasswordInput } from "../../components/form";
import AuthSlider from "./AuthSlider";

const Signup: React.FC = () => {
  const {} = useApp();
  // const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState<boolean | null>(null);
  const [confirmPassword, setConfirmPassword] = useState(false);
  //   const [success, setSuccess] = useState(false);

  const methods = useForm<any>();
  const [togglePassword, setTogglePassword] = React.useState(false);

  const onSubmit = async (data: any) => {
    if (data.password === data.confirm_password) {
      setConfirmPassword(true);
      setIsConfirmed(true);
    } else if (!confirmPassword) {
      setIsConfirmed(false);
      return;
    }
    const { errors } = methods.formState;

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      return;
    }

    try {
      setIsLoading(true);
      console.log(data)
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="w-full">
      <div className="flex relative lg:justify-normal justify-center px-4 md:px-10 lg:px-0">
        <div className="lg:w-3/5 grid justify-center pt-18 pb-14 relative">
          <div className="lg:min-w-[420px] min-w-[300px] 2xl:py-12 py-10">
            <div className="mb-10 text-center flex flex-col w-full justify-center  items-center space-y-6">
              <img src={logo} alt="logo-image" />
              <h1 className="lg:text-[32px] font-medium mb-3 sm:text-[30px] text-[25px] dark:text-white leading-[38px]">
                Create an account
              </h1>
              <div className="flex w-full items-center justify-center gap-5">
                <button
                  className="bg-transparent flex items-center justify-center gap-3 rounded-full border border-slate-300 w-[200px] py-3 px-8"
                  onClick={() => {}}
                  disabled={isLoading}
                >
                  <img src={GoogleLogo} className="w-6" />
                  {isLoading ? "Signing in..." : "Google"}
                </button>

                <button
                  className="bg-transparent flex items-center justify-center gap-3 rounded-full border border-slate-300 w-[200px] py-3 px-8"
                  onClick={() => {}}
                  disabled={isLoading}
                >
                  <img src={GoogleLogo} className="w-6" />
                  {isLoading ? "Signing in..." : "Linkedin"}
                </button>
              </div>
              <div className="flex items-center mt-1 w-full">
                <hr className="border-t-2  w-[80%] border-zinc-300" />
                <span className="mx-2 text-lg text-center rounded-md py-1 px-2 text-slate-400">
                  or
                </span>
                <hr className="border-t-2  w-[80%] border-zinc-300" />
              </div>
            </div>

            <FormProvider {...methods}>
              <form
                onSubmit={methods.handleSubmit(onSubmit)}
                className="max-w-[450px]"
              >
                <div>
                  <div>
                    <div className="grid gap-6">
                      <AutoInput
                        label="First Name"
                        name="first_name"
                        placeholder="Enter first name"
                        rules={{
                          required: "First name is required",
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message:
                              "Invalid! name must contain only alphabetical characters",
                          },
                        }}
                      />

                      <AutoInput
                        label="Last Name"
                        name="last_name"
                        placeholder="Enter last name"
                        rules={{
                          required: "Last name is required",
                          pattern: {
                            value: /^[A-Za-z]+$/,
                            message:
                              "Invalid! name must contain only alphabetical characters",
                          },
                        }}
                      />
                      <AutoInput
                        label="Email"
                        name="email"
                        placeholder="Enter your email"
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        }}
                      />
                      <div>
                        <PasswordInput
                          label="Password"
                          name="password"
                          placeholder="Enter Password"
                          togglePassword={togglePassword}
                          onTogglePassword={setTogglePassword}
                          rules={{ required: "Password is required" }}
                        />
                      </div>

                      <div className="space-y-2 flex flex-col">
                        <PasswordInput
                          label="Confirm Password"
                          name="confirm_password"
                          placeholder="Enter Password"
                          togglePassword={togglePassword}
                          onTogglePassword={setTogglePassword}
                          rules={{ required: "Password is required" }}
                        />
                        {isConfirmed === false && (
                          <small className="text-red-500">
                            Passwords do not match. Please check again.
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="mt-6">
                      <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-full bg-primary text-white border-none hover:opacity-95"
                        disabled={isLoading}
                        onClick={() => {}}
                      >
                        {isLoading ? "Loading..." : "Sign in"}
                      </button>

                      <p className="text-center text-slate-400 mt-4 dark:text-slate-100">
                        Already have an account?{" "}
                        <span>
                          <Link to="/signin">Sign In</Link>
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </form>
            </FormProvider>
          </div>
        </div>
        <div className="lg:w-2/5 lg:block hidden h-screen relative">
          <div className="lg:w-2/5 fixed right-0 top-0 text-white pl-9 lg:flex justify-center rounded-l-[64px] items-center hidden h-screen bg-gradient">
            <AuthSlider />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;
