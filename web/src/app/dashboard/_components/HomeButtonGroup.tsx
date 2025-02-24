import Button from "@/app/_components/Button";
import { IMonitorDocument } from "@/interfaces/monitor.interface";
import { ArrowDown, ArrowUp, Play } from "lucide-react";

interface IHomeButtonGroupProps {
  monitors: IMonitorDocument[]
}

const HomeButtonGroup = ({ monitors }: IHomeButtonGroupProps) => {
  return (
    <div className="inline-flex gap-2" role="group">
      <Button className="font-medium" variant="success" label={1} icon={<ArrowUp />} type="button" />
      <Button className="font-medium" variant="destructive" label={1} icon={<ArrowDown />} type="button" />
      <Button className="font-medium" variant="warn" label={1} icon={<Play />} type="button" />
    </div>
  );
}

export default HomeButtonGroup;
