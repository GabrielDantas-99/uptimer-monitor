import Button from "@/app/_components/Button";
import { IMonitorDocument } from "@/interfaces/monitor.interface";
import { Pause, PencilLine, Play, Trash } from "lucide-react";
import React, { FC, ReactElement } from "react";

interface HomeTableBtnGroupProps {
  monitor: IMonitorDocument;
}

const HomeTableBtnGroup: FC<HomeTableBtnGroupProps> = ({
  monitor,
}): ReactElement => {

  return (
    <div className="inline-flex shadow-sm" role="group">
      <Button
        icon={monitor.active ? <Pause /> : <Play />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-[#1e8dee] rounded border border-[#1e8dee] hover:bg-[#1e8dee] hover:text-white"
      />
      <Button
        icon={<PencilLine />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-[#1e8dee] rounded border border-[#1e8dee] hover:bg-[#1e8dee] hover:text-white"
      />
      <Button
        icon={<Trash />}
        type="button"
        className="mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-white rounded bg-red-600 hover:bg-red-400 hover:text-white"
      />
    </div>
  );
};

export default HomeTableBtnGroup;
