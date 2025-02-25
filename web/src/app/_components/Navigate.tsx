import { MonitorContext } from "@/context/MonitorContext";
import { apolloPersistor } from "@/queries/apolloClient";
import { LOGOUT_USER } from "@/queries/auth";
import { useMutation } from "@apollo/client";
import { redirect } from "next/navigation";
import { useContext, useEffect } from "react";

type NavigateProps = { to: string; type: string }

const Navigate = ({ to, type }: NavigateProps): null => {
  const { dispatch } = useContext(MonitorContext);
  const [logout, { client }] = useMutation(LOGOUT_USER);

  useEffect(() => {
    if (type === 'logout') {
      logout().then(async () => {
        dispatch({
          type: 'dataUpdate',
          payload: {
            user: null,
            notifications: []
          }
        });
        client.clearStore()
        await apolloPersistor?.purge()
      })
    }
    redirect(to);
  }, [type, to, dispatch, client, logout])
  return null;
}

export default Navigate;
