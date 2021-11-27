import { NextPage } from "next";
import styled from "styled-components";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Controller, useForm } from "react-hook-form";

const Login: NextPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <main>
      <div className="app p-d-flex p-jc-center p-ai-center">
        <StyledCard className="p-d-flex p-p-3 p-shadow-4">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name="email"
              control={control}
              rules={{
                required: true,
                pattern:
                  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
              }}
              render={({ field }) => (
                <div className="p-field">
                  <span className="p-float-label">
                    <InputText id="email" {...field} />
                    <label htmlFor="email">Email</label>
                  </span>
                  {errors?.email?.type && (
                    <small id="email-help" className="p-error p-d-block">
                      {errors?.email?.type === "required"
                        ? "Email is not available."
                        : "Invalid Email Format"}
                    </small>
                  )}
                </div>
              )}
            />
            <Controller
              name="password"
              control={control}
              rules={{
                required: true,
              }}
              render={({ field }) => (
                <div className="p-field">
                  <span className="p-float-label p-mt-2">
                    <InputText id="password" type="password" {...field} />
                    <label htmlFor="password">Password</label>
                  </span>
                  {errors?.password?.type && (
                    <small id="password-help" className="p-error p-d-block">
                      {" "}
                      Password is required{" "}
                    </small>
                  )}
                </div>
              )}
            />
            <Button
              type="submit"
              icon="pi pi-check"
              iconPos="right"
              label="Login"
              className="p-mt-2"
            />
          </form>
        </StyledCard>
      </div>
    </main>
  );
};

export default Login;

const StyledCard = styled(Card)`
  border-radius: 5px;
  height: 400px;
  width: 300px;
`;
