'use client'

import { useState } from "react";
import { renderButtons, renderRefreshButtons, renderTableAndPagination } from "./_components/HomeComponents";

const DashboardPage = () => {
  const [monitorState, setMonitorState] = useState({
    showModal: false,
    enableRefresh: false,
    autoRefreshLoading: false
  })
  return (
    <div className="m-auto px-6 h-screen relative min-h-screen xl:container md:px-12 lg:px-6">
      {renderButtons([], monitorState, setMonitorState)}
      {renderRefreshButtons('box', true)}
      {renderTableAndPagination(
        'box',
        { start: 0, end: 10 },
        monitorState.autoRefreshLoading,
        []
      )}
    </div>
  );
}

export default DashboardPage;
