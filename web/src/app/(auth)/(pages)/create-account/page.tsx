import { FC, ReactElement } from "react";
import AuthWrapper from "../../_components/AuthWrapper";
import { RegisterForm } from "../../_components/RegisterForm";

const Register: FC = (): ReactElement => {
  return (
    <AuthWrapper >
      <RegisterForm />
    </AuthWrapper>
  );
}

export default Register;
