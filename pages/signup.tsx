import { NextPage } from "next";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import React from "react";
import { useForm } from "react-hook-form";
import { TextInput } from "../components/TextInput";

const SignUp: NextPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <main>
      <div className="app p-d-flex p-jc-center p-ai-center">
        <Card className="p-d-flex p-p-3 p-shadow-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              id="name"
              required
              register={register}
              isError={!!errors?.email?.type}
              validationMessage="Name is required"
              label="Name"
            />
            <TextInput
              id="email"
              required
              register={register}
              isError={!!errors?.email?.type}
              validationPattern={
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
              }
              validationMessage={
                errors?.email?.type === "required"
                  ? "Email is not available."
                  : "Invalid Email Format"
              }
              label="Email"
            />
            <TextInput
              id="password"
              required
              register={register}
              isError={!!errors?.password?.type}
              validationMessage="Password is required"
              label="Password"
            />
            <span className="p-field-radiobutton">
              {/* <input {...register("type")} type="radio" value="student" />
              <input {...register("type")} type="radio" value="teacher" /> */}
              <RadioButton value="student" {...register("type")} />
            </span>
            {errors?.type?.type && (
              <small id="type-help" className="p-error p-d-block">
                you must select if you are teacher or student
              </small>
            )}
            <Button
              type="submit"
              icon="pi pi-check"
              iconPos="right"
              label="Sign Up"
              className="p-mt-2"
            />
          </form>
        </Card>
      </div>
    </main>
  );
};

export default SignUp;
