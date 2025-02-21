'use client';

import { IMonitorDocument } from '@/interfaces/monitor.interface';
import { INotification } from '@/interfaces/notification.interface';
import { InitialUpdateType, IUser } from '@/interfaces/user.interface';
import { Context, createContext, Dispatch } from 'react';

export interface StateProps {
  user: IUser | null;
  notifications: INotification[];
  monitor: IMonitorDocument | null;
}

export interface DispatchProps {
  type: string;
  payload: string | boolean | InitialUpdateType | IMonitorDocument | null;
}

interface MonitorContextType {
  state: StateProps;
  dispatch: Dispatch<DispatchProps>;
}

export const initialValues: StateProps = {
  user: null,
  notifications: [],
  monitor: null,
};

export const MonitorContext: Context<MonitorContextType> =
  createContext<MonitorContextType>({
    state: initialValues,
    dispatch: () => null,
  });

export const mainReducer = (
  state: StateProps,
  action: DispatchProps
): StateProps => ({
  user: stateReducer(state, action).user,
  notifications: stateReducer(state, action).notifications,
  monitor: stateReducer(state, action).monitor,
});

const stateReducer = (state: StateProps, action: DispatchProps): StateProps => {
  switch (action.type) {
    case 'dataUpdate': {
      const { notifications, user } = action.payload as InitialUpdateType;
      return { ...state, notifications, user };
    }
    case 'user': {
      return { ...state, user: action.payload as IUser };
    }
    default: {
      return state;
    }
  }
};
