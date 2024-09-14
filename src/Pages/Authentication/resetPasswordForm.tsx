import React, { useState } from "react";
import { useApp } from "../../context/AppContext";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../../assets/svg/logo-1.svg";
import AuthSlider from "./AuthSlider";
import { HiOutlineKey } from "react-icons/hi";
import { FormProvider, useForm } from "react-hook-form";
import { PasswordInput } from "../../components/form";
import { BsCheckCircleFill, BsPatchCheckFill } from "react-icons/bs";
import { FaArrowLeftLong } from "react-icons/fa6";

type resetPasswordData = {
  password: string;
  confirm_password: string;
};

const ResetPasswordForm: React.FC = () => {
  const {} = useApp();
  const { email, token } = useParams();
  const navigate = useNavigate();
  const methods = useForm<resetPasswordData>();
  const [isLoading, setIsLoading] = useState(false);
  const [togglePassword, setTogglePassword] = React.useState(false);
  const [hasUppercase, setHasUppercase] = React.useState(false);
  const [hasNumeric, setHasNumeric] = React.useState(false);
  const [hasMinLength, setHasMinLength] = React.useState(false);
  const [confirmPassword, setConfirmPassword] = React.useState(false);
  const [isConfirmed, setIsConfirmed] = React.useState<boolean | null>(null);

  const [isSuccess, setIsSuccess] = React.useState<boolean>(false);

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const hasUppercaseLetter = /[A-Z]/.test(value);
    const hasNumericCharacter = /[0-9]/.test(value);
    const hasMinLength = value.length >= 8;
    setHasUppercase(hasUppercaseLetter);
    setHasNumeric(hasNumericCharacter);
    setHasMinLength(hasMinLength);
    methods.setValue("password", value);
  };

  const onSubmit = async (data: resetPasswordData) => {
    if (data.password === data.confirm_password) {
      setConfirmPassword(true);
      setIsConfirmed(true);
    } else if (!confirmPassword) {
      setIsConfirmed(false);
    }

    const { errors } = methods.formState;

    // Check if there are any validation errors
    if (
      Object.keys(errors).length > 0 ||
      !hasMinLength ||
      !hasNumeric ||
      !hasUppercase ||
      !confirmPassword
    ) {
      return;
    }

    try {
      setIsLoading(true);
      console.log({
        email,
        new_password: data.password,
        token,
      });
      //   await ResetPassword({
      //     email,
      //     new_password: data.password,
      //     token,
      //   });
      setIsSuccess(true);
    } catch (err: any) {
      toast.error(err.message);
      navigate("/forgot-password");
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

              {!isSuccess && (
                <div className="text-primary bg-primary/15 rounded-full flex items-center justify-center h-14 w-14">
                  <HiOutlineKey size={24} />
                </div>
              )}
              {!isSuccess && (
                <div className="text-center">
                  <h1 className="lg:text-[32px] font-medium mb-2 sm:text-[30px] text-[25px] dark:text-white leading-[38px]">
                    Set new password
                  </h1>
                  <p className="text-zinc-500">
                    Your new password must be different from previously used <br />
                    passwords.
                  </p>
                </div>
              )}
            </div>

            {isSuccess && (
              <div className="flex w-full flex-col justify-center items-center pt-6">
                <BsPatchCheckFill
                  size={58}
                  className="mb-4 text-primary text-lg"
                />
                <h1 className="text-2xl text-center text-white">
                  Password Reset Successfull!
                </h1>
                <p className="text-zinc-400 font-normal text-center">
                  Your password has been successfully changed. Sign in <br /> to
                  access your dashboard.
                </p>
              </div>
            )}

            {!isSuccess ? (
              <div className="flex w-full justify-center">
                <FormProvider {...methods}>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className="max-w-[450px] p-4"
                  >
                    <div>
                      <div>
                        <PasswordInput
                          label="Password"
                          name="password"
                          placeholder="Enter Password"
                          togglePassword={togglePassword}
                          onTogglePassword={setTogglePassword}
                          onChange={handlePasswordChange}
                          rules={{ required: "Password is required" }}
                        />

                        <div className="flex flex-wrap gap-4 mb-10 dark:text-white">
                          <div className="flex gap-2 items-center">
                            <BsCheckCircleFill
                              className={`${
                                hasUppercase ? "text-green-500" : "text-red-500"
                              }`}
                            />
                            <small>One uppercase character</small>
                          </div>
                          <div className="flex gap-2 items-center">
                            <BsCheckCircleFill
                              className={`${
                                hasMinLength ? "text-green-500" : "text-red-500"
                              }`}
                            />
                            <small>8 characters minimum</small>
                          </div>
                          <div className="flex gap-2 items-center">
                            <BsCheckCircleFill
                              className={`${
                                hasNumeric ? "text-green-500" : "text-red-500"
                              }`}
                            />
                            <small>At least one numeric character</small>
                          </div>
                        </div>

                        <PasswordInput
                          label="Confirm Password"
                          name="confirm_password"
                          placeholder="Enter Password"
                          togglePassword={togglePassword}
                          onTogglePassword={setTogglePassword}
                          rules={{ required: "Confirm Password is required" }}
                        />
                        {isConfirmed === false && (
                          <small className="text-red-500">
                            Passwords do not match. Please check again.
                          </small>
                        )}

                        <div className="mt-10 flex w-full justify-center items-center flex-col">
                          <button
                            type="submit"
                            className="border-none rounded-full py-3 max-w-[80%] mb-5 px-6 w-full text-white opacity-95 hover:opacity-100 bg-primary disabled:bg-primary/70"
                            onClick={() => {}}
                            disabled={isLoading}
                          >
                            {isLoading ? "Loading..." : "Reset Password"}
                          </button>
                          <Link
                            to="/signin"
                            className="flex gap-2 items-center pb-4 text-black hover:text-primary"
                          >
                            <FaArrowLeftLong /> Back to Sign in
                          </Link>
                        </div>
                      </div>
                    </div>
                  </form>
                </FormProvider>
              </div>
            ) : (
              <div className="pb-6 flex justify-center">
                <button
                  onClick={() => {
                    navigate("/signin", { replace: true });
                  }}
                  className="border-none rounded-full max-w-[80%] py-3 mt-9 mb-3 px-6 w-full text-white opacity-95 hover:opacity-100 bg-primary disabled:bg-primary/70"
                  // height="20"
                >
                  Continue to Login
                </button>
              </div>
            )}
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

export default ResetPasswordForm;
