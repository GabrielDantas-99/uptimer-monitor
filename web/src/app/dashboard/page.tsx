'use client'

import { useState } from "react";
import { renderButtons, renderRefreshButtons, renderTableAndPagination } from "./_components/HomeComponents";
import { useDashboard } from "./hooks/useDashboard";

const DashboardPage = () => {
  const {
    monitorState,
    monitors,
    limit,
    isRefreshed,
    autoMonitorsRef,
    monitorsRef,
    view,
    loading,
    openModal,
    setView,
    updateLimit,
    setMonitors,
    setMonitorState,
    refreshMonitors,
    enableAutoRefresh,
    closeUptimeModal,
  } = useDashboard()
  return (
    <div className="m-auto px-6 h-screen relative min-h-screen xl:container md:px-12 lg:px-6">
      <>
        {!loading && monitors.length > 0 ? (
          <div className="flex flex-col space-y-4">
            {renderButtons(monitors, monitorState, setMonitorState)}
            {renderRefreshButtons(
              view,
              isRefreshed!,
              monitorsRef.current,
              monitors,
              setView,
              setMonitors,
              () => refreshMonitors(),
              () => enableAutoRefresh()
            )}
            {renderTableAndPagination(
              view,
              limit,
              monitorState.autoRefreshLoading,
              monitors,
              updateLimit
            )}
          </div>
        ) : (
          <>
            {!loading && !monitors.length && (
              <>Create Uptime Teste</>
            )}
          </>
        )}
      </>

    </div>
  );
}

export default DashboardPage;
