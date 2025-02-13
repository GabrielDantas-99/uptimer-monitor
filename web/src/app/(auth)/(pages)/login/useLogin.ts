import { IUserAuth } from '@/interfaces/user.interface';
import React, { Dispatch, useContext } from 'react';
import {
  FetchResult,
  MutationFunctionOptions,
  useMutation,
} from '@apollo/client';
import { LOGIN_USER } from '@/queries/auth';
import { redirect } from 'next/navigation';
import { DispatchProps, MonitorContext } from '@/context/MonitorContext';
import { LoginType, loginSchema } from '../../_validations/auth';
import showErrorToast from '@/utils/toast';

export const useLogin = (): IUserAuth => {
  const { dispatch } = useContext(MonitorContext);
  let validationErrors: LoginType = {
    username: '',
    password: '',
  };
  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const onLoginSubmit = async (formData: FormData): Promise<void> => {
    const resultSchema = loginSchema.safeParse(Object.fromEntries(formData));
    if (!resultSchema.success) {
      validationErrors = {
        username: resultSchema.error.format().username?._errors[0]!,
        password: resultSchema.error.format().password?._errors[0]!,
      };
    } else {
      submitUserData(resultSchema.data, loginUser, dispatch, 'email/password');
    }
  };

  return {
    loading,
    validationErrors,
    onLoginSubmit,
  };
};

async function submitUserData(
  data: LoginType,
  loginUserMethod: (
    options?: MutationFunctionOptions | undefined
  ) => Promise<FetchResult>,
  dispatch: Dispatch<DispatchProps>,
  authType: string
) {
  try {
    const variables = authType === 'social' ? { user: data } : data;
    const result: FetchResult = await loginUserMethod({ variables });
    if (result && result.data) {
      const { loginUser, authSocialUser } = result.data;
      dispatch({
        type: 'dataUpdate',
        payload: {
          user: authType === 'social' ? authSocialUser.user : loginUser.user,
          notifications:
            authType === 'social'
              ? authSocialUser.notifications
              : loginUser.notifications,
        },
      });
      redirect('/status');
    }
  } catch (error) {
    showErrorToast('Invalid credentials');
  }
}
