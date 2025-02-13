import { IUserAuth } from '@/interfaces/user.interface';
import { Dispatch, useContext, useState } from 'react';
import {
  FetchResult,
  MutationFunctionOptions,
  useMutation,
} from '@apollo/client';
import { LOGIN_USER } from '@/queries/auth';
import { useRouter } from 'next/navigation';

import { DispatchProps, MonitorContext } from '@/context/MonitorContext';
import showErrorToast from '@/utils/toast';
import { loginSchema, LoginType } from '../../_validations/auth';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export const useLogin = (): IUserAuth => {
  const { dispatch } = useContext(MonitorContext);
  const [validationErrors, setValidationErrors] = useState<LoginType>({
    username: '',
    password: '',
  });
  const router: AppRouterInstance = useRouter();
  const [loginUser, { loading }] = useMutation(LOGIN_USER);

  const onLoginSubmit = async (formData: FormData): Promise<void> => {
    const resultSchema = loginSchema.safeParse(Object.fromEntries(formData));
    if (!resultSchema.success) {
      setValidationErrors({
        username: resultSchema.error.format().username?._errors[0]!,
        password: resultSchema.error.format().password?._errors[0]!,
      });
    } else {
      submitUserData(
        resultSchema.data,
        loginUser,
        dispatch,
        'email/password',
        router
      );
    }
  };

  return {
    loading,
    validationErrors,
    setValidationErrors,
    onLoginSubmit,
  };
};

async function submitUserData(
  data: LoginType,
  loginUserMethod: (
    options?: MutationFunctionOptions | undefined
  ) => Promise<FetchResult>,
  dispatch: Dispatch<DispatchProps>,
  authType: string,
  router: AppRouterInstance
) {
  try {
    const variables = authType === 'social' ? { user: data } : data;
    const result: FetchResult = await loginUserMethod({
      variables,
    });
    if (result && result.data) {
      const { loginUser } = result.data;
      dispatch({
        type: 'dataUpdate',
        payload: {
          user: loginUser.user,
          notifications: loginUser.notifications,
        },
      });
      router.push('/status');
    }
  } catch (error) {
    showErrorToast('Invalid credentials');
  }
}
