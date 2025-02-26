import { HomeTableProps, IMonitorDocument } from "@/interfaces/monitor.interface";
import clsx from "clsx";
import { upperCase } from "lodash";
import { ArrowDown, ArrowUp, Loader, Play } from "lucide-react";
import { FC, ReactElement } from "react";
import HomeTableBtnGroup from "./HomeTableBtnGroup";
import { Table, TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import Button from "@/app/_components/Button";
import HealthBar from "@/app/_components/HealthBar";
import { convertFrequency, timeFromNow } from "@/utils/utils";

const DEFAULT_DURATION = 24;

const HomeTable: FC<HomeTableProps> = ({
  monitors,
  limit,
  autoRefreshLoading,
}): ReactElement => {

  const navigateToStatusPage = (monitor: IMonitorDocument): void => {
    // 24 is the default duration
  };
  const returnVariant = (monitor: IMonitorDocument): "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "success" | "warn" => {
    return !monitor.active ? 'warn' : monitor.status === 1 ? 'destructive' : 'success'
  }
  return (
    <div className="relative overflow-x-auto mt-10 lg:mt-0">
      {autoRefreshLoading ? (
        <div className="bg-white/[0.8] flex justify-center items-center z-50 left-0 top-0 absolute h-full w-full">
          <Loader
            className="animate-spin h-10 w-10 mr-3"
            size={40}
            color="#50b5ff"
          />
        </div>
      ) : (
        <></>
      )}
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Uptime</TableHead>
            <TableHead>Frequency</TableHead>
            <TableHead>Last Modified</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {monitors.slice(limit.start, limit.end)
            .map((monitor: IMonitorDocument, index: number) => (
              <TableRow key={monitor.monitorId}>
                <TableCell className="font-medium">
                  <Button variant={returnVariant(monitor)}>
                    {monitor.active ? (
                      <>
                        {monitor.status === 1 ? <ArrowDown /> : <ArrowUp />}
                      </>
                    ) : (
                      <Play />
                    )}
                  </Button>
                </TableCell>
                <TableCell className="font-medium">{upperCase(monitor.type)}</TableCell>
                <TableCell>{monitor.name}</TableCell>
                <TableCell>
                  {monitor.uptime}%
                  <HealthBar size="small" heartBeats={monitor.heartbeats!} />
                </TableCell>
                <TableCell>{convertFrequency(monitor.frequency)}</TableCell>
                <TableCell>
                  {monitor.lastChanged ? (
                    <>{timeFromNow(`${monitor.lastChanged}`)}</>
                  ) : (
                    "None"
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <HomeTableBtnGroup monitor={monitor} />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
        {/* <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total</TableCell>
            <TableCell className="text-right">$2,500.00</TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
    </div>
  );
};

export default HomeTable;
