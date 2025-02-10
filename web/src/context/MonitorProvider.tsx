'use client'

import { FC, ReactElement, ReactNode, useReducer } from "react";
import { initialValues, mainReducer, MonitorContext } from "./MonitorContext";

interface Props {
  children: ReactNode;
}

const MonitorProvider: FC<Props> = ({ children }): ReactElement => {
  const [state, dispatch] = useReducer(mainReducer, initialValues);

  return (
    <MonitorContext.Provider value={{ state, dispatch }}>
      {children}
    </MonitorContext.Provider>
  );
};
export default MonitorProvider;
