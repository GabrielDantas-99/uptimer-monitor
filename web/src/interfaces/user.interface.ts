import { RegisterType } from '@/validations/auth';
import { Dispatch, SetStateAction } from 'react';

export interface IUserAuth {
  loading: boolean;
  validationErrors?: RegisterType;
  setValidationErrors?: Dispatch<SetStateAction<RegisterType>>;
  onRegisterSubmit?: (formData: FormData) => void;
  onLoginSubmit?: (formData: FormData) => void;
  authWithGoogle?: (formData: FormData) => void;
  authWithFacebook?: (formData: FormData) => void;
}
