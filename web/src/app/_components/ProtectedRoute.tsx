'use client'

import { MonitorContext } from "@/context/MonitorContext";
import { CHECK_CURRENT_USER } from "@/queries/auth";
import { useQuery } from "@apollo/client";
import { FC, ReactElement, ReactNode, useContext, useEffect } from "react";
import PageLoader from "../(auth)/_components/PageLoader";
import Navigate from "./Navigate";

interface IProtectedRouteProps {
  children: ReactNode
}

const ProtectedRoute: FC<IProtectedRouteProps> = ({ children }): ReactElement => {
  const { dispatch } = useContext(MonitorContext);
  const { loading, error, data } = useQuery(CHECK_CURRENT_USER, {
    fetchPolicy: 'network-only'
  });

  useEffect(() => {
    if (data) {
      const { user, notifications } = data.checkCurrentUser;
      dispatch({
        type: 'dataUpdate',
        payload: {
          user,
          notifications
        }
      })
    }
  }, [data, dispatch]);

  if (loading) {
    return <PageLoader />
  } else {
    if (!error && data && data.checkCurrentUser.user) {
      return <>{children}</>
    } else {
      return <><Navigate to="/" type="logout" /></>
    }
  }
}

export default ProtectedRoute;
