import Button from "@/app/_components/Button";
import { HomeTableProps, IMonitorDocument } from "@/interfaces/monitor.interface";
import { ArrowDown, ArrowUp, Loader, Play } from "lucide-react";
import { FC, ReactElement } from "react";
import HomeTableBtnGroup from "./HomeTableBtnGroup";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@radix-ui/react-label";
import ResponseChart from "./ResponseChart";

const DEFAULT_DURATION = 24;

const HomeGrid: FC<HomeTableProps> = ({ monitors, limit, autoRefreshLoading }): ReactElement => {

  const navigateToStatusPage = (monitor: IMonitorDocument): void => {

  }
  const returnVariant = (monitor: IMonitorDocument): "default" | "destructive" | "outline" | "secondary" | "ghost" | "link" | "success" | "warn" => {
    return !monitor.active ? 'warn' : monitor.status === 1 ? 'destructive' : 'success'
  }
  const monitorIcon = (monitor: IMonitorDocument): JSX.Element => {
    if (monitor.active && monitor.status === 0) {
      return <ArrowUp />;
    }
    if (!monitor.active) {
      return <Play />;
    }
    return <ArrowDown />;
  }

  return (
    <div className="grid gap-6 pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
      {autoRefreshLoading ? (
        <div className="bg-white/[0.8] flex justify-center items-center z-50 left-0 top-0 absolute h-full w-full">
          <Loader className="animate-spin h-10 w-10 mr-3" size={40} color="#50b5ff" />
        </div>
      ) : (
        <></>
      )}
      {monitors.slice(limit.start, limit.end).map((monitor: IMonitorDocument, index: number) => (
        <Card key={index}>
          <CardHeader>
            <CardTitle>{monitor.name}</CardTitle>
            <CardDescription>Deploy your new project in one-click.</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponseChart heartbeats={monitor.heartbeats!} />
          </CardContent>
          <CardFooter className="flex flex-col justify-between space-y-2 border-t border-border pt-4 mx-4 px-2">
            <Feature title="Status">
              <Button variant={returnVariant(monitor)}>
                {monitorIcon(monitor)}
              </Button>
            </Feature>
            <Feature title="1 day uptime">
              <span>{monitor.uptime}%</span>
            </Feature>
            <Feature title="Actions">
              <HomeTableBtnGroup monitor={monitor} />
            </Feature>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

const Feature = ({ title, children }: any): ReactElement => {
  return (
    <div className="flex items-center justify-between w-full ">
      <span className="font-light text-base">{title}</span>
      {children}
    </div>
  );
};

export default HomeGrid;
