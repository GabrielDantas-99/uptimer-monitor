'use client'

import {
  IMonitorDocument,
  IMonitorState,
  IPagination,
} from "@/interfaces/monitor.interface";
import { Dispatch, FormEvent, SetStateAction } from "react";
import HomeButtonGroup from "./HomeButtonGroup";
import Button from "@/app/_components/Button";
import TextInput from "@/app/_components/TextInput";
import { Pause, Play } from "lucide-react";
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
    <div className="grid grid-cols-3 sm:flex sm:justify-between gap-2">
      <HomeButtonGroup monitors={monitors} />
      <Button
        variant="success"
        onClick={() => setMonitorState({ ...monitorState, showModal: true })}
        label="New Uptime Test"
        className="col-span-3"
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
    <div className="grid grid-cols-4 md:space-y-0 space-y-4 md:flex items-center md:justify-between md:gap-4">
      <div className="col-span-4 gap-2 grid grid-cols-4">
        <Button
          onClick={refreshMonitors}
          label="Refresh"
          variant="success"
          disabled={!refreshed}
          className="col-span-1 md:col-span-2"
        />
        <Button
          label={!refreshed ? "Enable Auto Refresh" : "Disable Auto Refresh"}
          onClick={enableAutoRefresh}
          icon={!refreshed ? <Play /> : <Pause />}
          className=" md:col-span-2 col-span-3"
        />
      </div>
      <div className="col-span-4 flex items-center gap-2">
        <SwitchView view={view} setView={setView} />
        <div className="w-full "
          onChange={(event: FormEvent) => {
            const value: string = (event.target as HTMLInputElement).value;
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
