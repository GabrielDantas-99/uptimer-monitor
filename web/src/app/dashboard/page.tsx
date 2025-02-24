'use client'

import { useState } from "react";
import { renderButtons } from "./_components/HomeComponents";

const DashboardPage = () => {
  const [monitorState, setMonitorState] = useState({
    showModal: false,
    enableRefresh: false,
    autoRefreshLoading: false
  })
  return (
    <div className="m-auto px-6 h-screen relative min-h-screen xl:container md:px-12 lg:px-6">
      {renderButtons([], monitorState, setMonitorState)}
    </div>
  );
}

export default DashboardPage;
