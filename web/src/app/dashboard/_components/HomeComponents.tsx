'use client'

import {
  IMonitorDocument,
  IMonitorState,
  IPagination,
} from "@/interfaces/monitor.interface";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import HomeButtonGroup from "./HomeButtonGroup";
import Button from "@/app/_components/Button";
import TextInput from "@/app/_components/TextInput";
import clsx from "clsx";
import { Grid, Pause, Play } from "lucide-react";
import SwitchView from "./SwitchView";
import HomeGrid from "./HomeGrid";
import HomeTable from "./HomeTable";
import { setLocalStorageItem } from "@/utils/utils";
import { filter, some, toLower } from "lodash";

export const renderButtons = (
  monitors: IMonitorDocument[],
  monitorState: IMonitorState,
  setMonitorState: Dispatch<SetStateAction<IMonitorState>>
): JSX.Element => {
  return (
    <div className="h-20 flex flex-col gap-y-3 mb-4 mt-2 md:items-center md:justify-between md:flex-row md:mb-0 md:mt-0">
      <HomeButtonGroup monitors={monitors} />
      <Button
        variant="success"
        onClick={() => setMonitorState({ ...monitorState, showModal: true })}
        label="New Uptime Test"
      />
    </div>
  );
};

export const renderRefreshButtons = (
  view: string,
  isRefreshed: boolean,
  monitorsRef: IMonitorDocument[],
  monitors: IMonitorDocument[],
  setView: Dispatch<SetStateAction<string>>,
  setMonitors: Dispatch<SetStateAction<IMonitorDocument[]>>,
  refreshMonitors: () => void,
  enableAutoRefresh: () => void,
): JSX.Element => {
  const hasActiveMonitors: boolean = some(monitors, (monitor: IMonitorDocument) => monitor.active);
  let refreshed = isRefreshed;
  if (isRefreshed && !hasActiveMonitors) {
    refreshed = false;
    setLocalStorageItem('refresh', JSON.stringify(false));
  }

  return (
    <div className=" flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-between ">
      <Button
        onClick={refreshMonitors}
        label="Refresh"
        variant="success"
        disabled={!refreshed}
      />
      <div className="flex flex-col justify-start gap-3 lg:flex-row lg:justify-end lg:w-full ">
        <SwitchView view={view} setView={setView} />
        <Button
          label={!refreshed ? "Enable Auto Refresh" : "Disable Auto Refresh"}
          onClick={enableAutoRefresh}
          icon={!refreshed ? <Play /> : <Pause />}
        />
        <div className="w-full lg:w-[30%]"
          onChange={(event: FormEvent) => {
            const value: string = (event.target as HTMLInputElement).value;
            console.log(value)
            const results: IMonitorDocument[] = filter(monitors, (monitor: IMonitorDocument) => {
              return toLower(monitor.name).includes(toLower(value)) || toLower(monitor.type).includes(toLower(value))
            });
            setMonitors(!value || !results.length ? monitorsRef : results);
          }}
        >
          <TextInput
            type="text"
            name="search"
            placeholder="Search by name"
          />
        </div>
      </div>
    </div>
  );
};

export const renderTableAndPagination = (
  view: string,
  limit: IPagination,
  autoRefreshLoading: boolean,
  monitors: IMonitorDocument[],
  updateLimit: (newLimit: IPagination) => void
): JSX.Element => {
  return (
    <>
      <div className="my-4">
        {view === 'box' ? (
          <HomeTable limit={limit} monitors={monitors} autoRefreshLoading={autoRefreshLoading} />
        ) : (
          <HomeGrid limit={limit} monitors={monitors} autoRefreshLoading={autoRefreshLoading} />
        )}
      </div>
    </>
  );
}
