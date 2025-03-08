import { MonitorContext } from '@/context/MonitorContext';
import {
  IMonitorDocument,
  IMonitorState,
  IPagination,
  IUseDashboard,
} from '@/interfaces/monitor.interface';
import {
  ENABLE_AUTO_REFRESH,
  GET_USER_MONITORS,
  MONITORS_UPDATED,
} from '@/queries/status';
import showErrorToast from '@/utils/toast';
import { getLocalStorageItem, setLocalStorageItem } from '@/utils/utils';
import { useLazyQuery, useQuery, useSubscription } from '@apollo/client';
import { some } from 'lodash';
import { useContext, useEffect, useRef, useState } from 'react';

export const useDashboard = (): IUseDashboard => {
  const {
    state: { user },
  } = useContext(MonitorContext);
  const [monitors, setMonitors] = useState<IMonitorDocument[]>([]);
  const [monitorState, setMonitorState] = useState<IMonitorState>({
    showModal: false,
    enableRefresh: false,
    autoRefreshLoading: false,
  });
  const [view, setView] = useState<string>('');
  const monitorsRef = useRef<IMonitorDocument[]>([]);
  const autoMonitorsRef = useRef<IMonitorDocument[]>([]);
  const { data, loading } = useQuery(GET_USER_MONITORS, {
    fetchPolicy: 'network-only',
    variables: { userId: `${user?.id}` },
  });
  const [getUserMonitors] = useLazyQuery(GET_USER_MONITORS, {
    fetchPolicy: 'network-only',
    variables: { userId: `${user?.id}` },
  });
  const [autoRefresh, { data: refreshData }] = useLazyQuery(
    ENABLE_AUTO_REFRESH,
    {
      fetchPolicy: 'network-only',
    }
  );

  useSubscription(MONITORS_UPDATED, {});

  const storageViewItem: string = getLocalStorageItem('view');
  const isRefreshed: boolean = JSON.parse(getLocalStorageItem('refresh'));
  const hasActiveMonitors: boolean = some(
    monitors,
    (monitor: IMonitorDocument) => monitor.active
  );

  const refreshMonitors = async (): Promise<void> => {
    if (hasActiveMonitors) {
      setMonitorState((prevState: IMonitorState) => ({
        ...prevState,
        autoRefreshLoading: true,
      }));
      const result = await getUserMonitors();
      if (result) {
        monitorsRef.current = result.data.getUserMonitors.monitors;
        setMonitors(result.data.getUserMonitors.monitors);
        setMonitorState((prevState: IMonitorState) => ({
          ...prevState,
          autoRefreshLoading: false,
        }));
      }
    } else {
      showErrorToast('There are no active monitors to refresh.');
    }
  };

  const enableAutoRefresh = async (): Promise<void> => {
    try {
      if (hasActiveMonitors) {
        await autoRefresh({
          variables: { userId: `${user?.id}`, refresh: !isRefreshed },
        });
        setMonitorState((prevState: IMonitorState) => ({
          ...prevState,
          enableRefresh: !isRefreshed,
        }));
        setLocalStorageItem('refresh', JSON.stringify(!isRefreshed));
      } else {
        showErrorToast('There are no active monitors to refresh.');
      }
    } catch (error) {
      showErrorToast('Error enabling auto refresh.');
    }
  };

  const closeUptimeModal = async (): Promise<void> => {};

  useEffect(() => {
    if (!storageViewItem) {
      setLocalStorageItem('view', JSON.stringify('box'));
    }

    if (isRefreshed === null) {
      setLocalStorageItem('refresh', JSON.stringify(false));
      setMonitorState((prevState: IMonitorState) => ({
        ...prevState,
        enableRefresh: false,
      }));
    } else {
      setMonitorState((prevState: IMonitorState) => ({
        ...prevState,
        enableRefresh: isRefreshed,
      }));
    }
    setView(storageViewItem || 'box');
  }, [storageViewItem, isRefreshed]);

  useEffect(() => {
    if (data && data.getUserMonitors) {
      monitorsRef.current = data.getUserMonitors.monitors;
      setMonitors(data.getUserMonitors.monitors);
    }
    if (refreshData && refreshData.autoRefresh) {
      setLocalStorageItem(
        'refresh',
        JSON.stringify(refreshData.autoRefresh.refresh)
      );
      setMonitorState((prevState: IMonitorState) => ({
        ...prevState,
        enableRefresh: refreshData.autoRefresh.refresh,
      }));
    }
    if (autoMonitorsRef.current.length) {
      autoMonitorsRef.current = [];
      setMonitorState((prevState: IMonitorState) => ({
        ...prevState,
        autoRefreshLoading: true,
      }));
    } else {
      setTimeout(() => {
        setMonitorState((prevState: IMonitorState) => ({
          ...prevState,
          autoRefreshLoading: false,
        }));
      }, 1000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, refreshData, autoMonitorsRef.current]);

  return {
    monitorState,
    monitors,
    limit: { start: 0, end: 10 },
    isRefreshed,
    autoMonitorsRef,
    monitorsRef,
    view,
    loading,
    openModal: false,
    setView,
    updateLimit: (newLimit: IPagination) => {},
    setMonitors,
    setMonitorState,
    refreshMonitors,
    enableAutoRefresh,
    closeUptimeModal,
  };
};
