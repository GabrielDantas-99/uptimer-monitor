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
    <div className="grid grid-cols-3 gap-1 min-w-28" role="group">
      <Button
        icon={monitor.active ? <Pause /> : <Play />}
        type="button"
        variant={monitor.active ? 'secondary' : 'success'}
      />
      <Button
        icon={<PencilLine />}
        type="button"
        variant="warn"
      />
      <Button
        icon={<Trash />}
        type="button"
        variant="destructive"
      />
    </div>
  );
};

export default HomeTableBtnGroup;
