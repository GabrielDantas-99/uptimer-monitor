import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { IHeartbeat } from "@/interfaces/monitor.interface";
import dayjs from "dayjs";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts";

interface ResponseChartProps {
  heartbeats: IHeartbeat[];
  showLabel?: boolean
}

interface DataType {
  timestamp: string;
  responseTime: number;
}

const ResponseChart = ({ heartbeats, showLabel }: ResponseChartProps) => {
  let chartData: DataType[] = []
  heartbeats.map((hb) => {
    console.log(dayjs(JSON.parse(`${hb.timestamp}`)).format('HH:mm'))
    chartData.push({
      timestamp: dayjs(JSON.parse(`${hb.timestamp}`)).format('HH:mm'),
      responseTime: hb.responseTime
    })
  })
  const footer = (tooltipItems: any[]) => {
    return `Response Time: ${tooltipItems[0].raw} ms`
  }
  const chartConfig = {
    desktop: {
      label: "Response Time",
      color: "hsl(var(--chart-1))",
    },
  } satisfies ChartConfig
  return (
    <ChartContainer config={chartConfig}>
      <AreaChart
        accessibilityLayer
        data={chartData}
        margin={{
          left: 12,
          right: 12,
        }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tickFormatter={(value) => value}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" />}
        />
        <Area
          dataKey="responseTime"
          type="natural"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          stackId="a"
        />
      </AreaChart>
    </ChartContainer>
  );
}

export default ResponseChart;
