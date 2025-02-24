import Button from "@/app/_components/Button";
import { IMonitorDocument } from "@/interfaces/monitor.interface";
import { filter } from "lodash";
import { ArrowDown, ArrowUp, Play } from "lucide-react";

interface IHomeButtonGroupProps {
  monitors: IMonitorDocument[]
}

const HomeButtonGroup = ({ monitors }: IHomeButtonGroupProps) => {
  const count = (type: string): number => {
    let sum = 0;
    if (type === 'active') {
      sum = filter(monitors, (monitor: IMonitorDocument) => monitor.active && monitor.status === 0).length;
    }
    if (type === 'inactive') {
      sum = filter(monitors, (monitor: IMonitorDocument) => !monitor.active).length;
    }
    if (type === 'error') {
      sum = filter(monitors, (monitor: IMonitorDocument) => monitor.active && monitor.status === 1).length;
    }
    return sum;
  }
  return (
    <div className="inline-flex gap-2" role="group">
      <Button
        className="font-medium"
        variant="success"
        label={count('active')}
        icon={<ArrowUp />}
        type="button"
      />
      <Button
        className="font-medium"
        variant="destructive"
        label={count('error')}
        icon={<ArrowDown />}
        type="button"
      />
      <Button
        className="font-medium"
        variant="warn"
        label={count('inactive')}
        icon={<Play />}
        type="button"
      />
    </div>
  );
}

export default HomeButtonGroup;
