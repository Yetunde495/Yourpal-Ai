import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Link, useNavigate } from "react-router-dom";
import { FormProvider, useForm } from "react-hook-form";
// import { toast } from "react-toastify";
import { toast } from "react-toastify";
import logo from "../../assets/svg/logo-1.svg";
import { AutoInput } from "../../components/form/customInput";
import AuthSlider from "./AuthSlider";
import { LockedPasswordInput } from "../../components/form/PasswordInput";
import { BsLinkedin } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";




const Signin: React.FC = () => {
  const {} = useApp();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  //   const [success, setSuccess] = useState(false);

  const methods = useForm<any>();

  const onSubmit = async (_data: any) => {
    setIsLoading(true);
    const { errors } = methods.formState;

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      return;
    }

    try {
      // console.log(response.data)
      navigate('/app/workspace')
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
                Welcome Back
              </h1>
              <div className="flex w-full items-center justify-center gap-5">
                <button
                  className="bg-transparent flex items-center justify-center gap-3 rounded-full hover:border-primary border border-slate-300 w-[200px] py-2 px-8"
                  onClick={() => {}}
                  disabled={isLoading}
                >
                  <FcGoogle size={20} />
                  {isLoading ? "Signing in..." : "Google"}
                </button>

                <button
                  className="bg-transparent flex items-center justify-center gap-3 rounded-full border border-slate-300 hover:border-primary w-[200px] py-2 px-8"
                  onClick={() => {}}
                  disabled={isLoading}
                >
                  <BsLinkedin className="text-primary" size={20} />
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
                        label="Email address"
                        name="email"
                        placeholder="Email"
                        rules={{
                          required: "Email is required",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Invalid email address",
                          },
                        }}
                      />
                      <div>
                        <LockedPasswordInput
                          label="Password"
                          name="password"
                          placeholder="Password"
                          togglePassword={false}
                          onTogglePassword={() => {}}
                          rules={{ required: "Password is required" }}
                          extraLabel={
                            <Link
                              className="text-primary text-sm font-cabin"
                              to="/forgot-password"
                            >
                              Forgot password?
                            </Link>
                          }
                        />
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
                        Don't have an account?{" "}
                        <span>
                          <Link to="/signup" className="text-primary hover:opacity-95">Sign Up</Link>
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

export default Signin;
