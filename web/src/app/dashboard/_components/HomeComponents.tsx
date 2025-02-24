import {
  IMonitorDocument,
  IMonitorState,
} from "@/interfaces/monitor.interface";
import { Dispatch, SetStateAction } from "react";
import HomeButtonGroup from "./HomeButtonGroup";
import Button from "@/app/_components/Button";
import TextInput from "@/app/_components/TextInput";
import clsx from "clsx";
import { Play } from "lucide-react";
import SwitchView from "./SwitchView";

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
): JSX.Element => {
  return (
    <div className="h-44 flex flex-col items-start justify-start lg:flex-row lg:items-center lg:justify-between lg:h-20">
      <Button
        label="Refresh"
        className={clsx(
          "inline-flex items-center px-4 py-2 cursor-pointer text-base font-medium text-white mb-3 lg:mb-0",
        )}
        disabled={isRefreshed}
      />
      <div className="flex flex-col justify-start gap-3 lg:flex-row lg:justify-end lg:w-full ">
        <SwitchView />
        <Button
          icon={<Play />}
          label={
            !isRefreshed ? "Enable Auto Refresh" : "Disable Auto Refresh"
          }
        />
        <div className="w-full lg:w-[30%]">
          <TextInput
            type="text"
            name="search"
            className="border border-black text-gray-900 text-sm  focus:ring-[#1e8dee] focus:border-[#1e8dee] block w-full p-2.5"
            placeholder="Search by name"
          />
        </div>
      </div>
    </div>
  );
};

