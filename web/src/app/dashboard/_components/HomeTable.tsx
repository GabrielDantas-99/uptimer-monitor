import Button from "@/app/_components/Button";
import { HomeTableProps, IMonitorDocument } from "@/interfaces/monitor.interface";
import clsx from "clsx";
import { upperCase } from "lodash";
import { ArrowDown, ArrowUp, Loader, Pause, PencilLine, Play, Trash2 } from "lucide-react";
import { FC, ReactElement } from "react";
import HomeTableBtnGroup from "./HomeTableBtnGroup";

const DEFAULT_DURATION = 24;

const HomeTable: FC<HomeTableProps> = ({
  monitors,
  limit,
  autoRefreshLoading,
}): ReactElement => {

  const navigateToStatusPage = (monitor: IMonitorDocument): void => {
    // 24 is the default duration
  };

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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3">
              Status
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Name
            </th>
            <th scope="col" className="px-6 py-3 w-[15%]">
              Uptime
            </th>
            <th scope="col" className="px-6 py-3 w-[15%]">
              Frequency
            </th>
            <th scope="col" className="px-6 py-3">
              Last Modified
            </th>
            <th scope="col" className="px-6 py-3">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {monitors
            .slice(limit.start, limit.end)
            .map((monitor: IMonitorDocument, index: number) => (
              <tr
                key={monitor.id}
                className={`${index % 2 !== 0 ? "bg-white" : "bg-[#f8f8fa]"}`}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  <button
                    type="button"
                    className={clsx(
                      "mr-1 inline-flex items-center px-4 py-2 text-sm font-bold text-white rounded",
                      {
                        "bg-yellow-400": !monitor.active,
                        "bg-green-400": monitor.active && monitor.status === 0,
                        "bg-red-400": monitor.active && monitor.status === 1,
                      }
                    )}
                  >
                    {monitor.active ? (
                      <>
                        {monitor.status === 1 ? <ArrowDown /> : <ArrowUp />}
                      </>
                    ) : (
                      <Play />
                    )}
                  </button>
                </th>
                <td className="px-6 py-4">{upperCase(monitor.type)}</td>
                <td
                  onClick={() => navigateToStatusPage(monitor)}
                  className="px-6 py-4 text-[#1e8dee] font-medium cursor-pointer max-w-[270px] whitespace-nowrap text-ellipsis truncate"
                >
                  {monitor.name}
                </td>
                <td className="px-6 py-5 flex gap-3">
                  <div className="w-8">{monitor.uptime}%</div>
                </td>
                <td className="px-6 py-5">{monitor.frequency}</td>
                <td className="px-6 py-4 max-w-[270px] whitespace-nowrap text-ellipsis truncate">
                  {monitor.lastChanged ? (
                    <>{monitor.lastChanged}</>
                  ) : (
                    "None"
                  )}
                </td>
                <td className="px-6 py-4">
                  <HomeTableBtnGroup monitor={monitor} />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default HomeTable;
