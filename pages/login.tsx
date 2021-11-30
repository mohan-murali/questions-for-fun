import { NextPage } from "next";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useForm } from "react-hook-form";
import { TextInput } from "../components/TextInput";

export interface LoginFormData {
  email: string;
  password: string;
}

const Login: NextPage = () => {
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
        <Card className="card p-d-flex p-p-3 p-shadow-4">
          <form onSubmit={handleSubmit(onSubmit)}>
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
            <Button
              type="submit"
              icon="pi pi-check"
              iconPos="right"
              label="Login"
              className="p-mt-2"
            />
          </form>
        </Card>
      </div>
    </main>
  );
};

export default Login;
