import { NextPage } from "next";
import styled from "styled-components";
import { Card } from "primereact/card";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";

const Login: NextPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <main>
      <div className="app p-d-flex p-jc-center p-ai-center">
        {" "}
        <Card className="p-d-flex p-p-3">
          <span className="p-float-label">
            <InputText
              id="email"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
            />
            <label htmlFor="email">Email</label>
          </span>
          <span className="p-float-label p-mt-2">
            <InputText
              id="password"
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
            />
            <label htmlFor="password">Password</label>
          </span>

          <Button
            icon="pi pi-check"
            iconPos="right"
            label="Login"
            className="p-mt-2"
          />
        </Card>{" "}
      </div>
    </main>
  );
};

export default Login;
