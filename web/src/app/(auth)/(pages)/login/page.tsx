import { FC, ReactElement } from "react";
import AuthWrapper from "../../_components/AuthWrapper";
import { LoginForm } from "../../_components/LoginForm";

const Login: FC = (): ReactElement => {
  return (
    <AuthWrapper>
      <LoginForm />
    </AuthWrapper>
  );
}

export default Login;
