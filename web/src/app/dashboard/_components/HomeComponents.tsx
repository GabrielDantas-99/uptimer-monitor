import {
  IMonitorDocument,
  IMonitorState,
} from "@/interfaces/monitor.interface";
import { Dispatch, SetStateAction } from "react";
import HomeButtonGroup from "./HomeButtonGroup";
import Button from "@/app/_components/Button";

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
