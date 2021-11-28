import axios from "axios";
import { NextPage } from "next";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { RadioButton } from "primereact/radiobutton";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput } from "../components/TextInput";

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
  type: string;
}

const SignUp: NextPage = () => {
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: SignUpFormData) => {
    console.log(data);
    try {
      var res = await axios.post("/api/signup", data);
      console.log(res);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <main>
      <div className="app p-d-flex p-jc-center p-ai-center">
        <Card className="card p-d-flex p-p-3 p-shadow-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextInput
              id="name"
              required
              register={register}
              isError={!!errors?.name?.type}
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
            <label className="p-d-block p-my-3">
              Are you a teacher or student
            </label>
            <Controller
              name="type"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { value, onChange } }) => (
                <>
                  <div className="p-field-radiobutton">
                    <RadioButton
                      inputId="teacher"
                      value="teacher"
                      onChange={(e) => onChange(e.value)}
                      checked={value === "teacher"}
                    />
                    <label htmlFor="teacher">Teacher</label>
                  </div>
                  <div className="p-field-radiobutton">
                    <RadioButton
                      inputId="student"
                      value="student"
                      onChange={(e) => onChange(e.value)}
                      checked={value === "student"}
                    />
                    <label htmlFor="student">Student</label>
                  </div>
                </>
              )}
            />
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
