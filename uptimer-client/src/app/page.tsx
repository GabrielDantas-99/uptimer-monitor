import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Binoculars, Check, CloudAlert, Workflow } from "lucide-react";
import Image from "next/image";

export default function Home() {

  const features = [
    {
      icon: <Binoculars />,
      title: 'Real-time Monitoring',
      description: 'Monitor service uptime in real-time and get instant notifications for downtime.'
    },
    {
      icon: <Workflow />,
      title: 'Easy Integration',
      description: 'Integrate seamlessly with your existing tools and workflows.'
    },
    {
      icon: <CloudAlert />,
      title: 'Alerting',
      description: 'Get instant notification of potential issues before they impact your users.'
    }
  ];
  const monitors: string[] = ['HTTP/HTTPS', 'TCP', 'MONGODB', 'REDIS', 'SSL / TLS'];

  return (
    <div className="">
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start md:p-12 md:pt-6 max-w-6xl mx-auto">
        <div className="flex items-center ">
          <div className="w-1/2 flex flex-col space-y-6">
            <h1 className="text-3xl font-bold">
              The best <strong className="font-bold text-[--red]">Uptime</strong> monitor service.
            </h1>
            <p className="opacity-75 font-light">
              Our Uptime monitoring service helps you track uptime of your services in real-time, ensuring high availability and
              reliability for your applications.
            </p>
            <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
              <li className="mb-2">
                Add a service to monitor {" "}
                <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
                  in real time
                </code>
                .
              </li>
              <li>Save and see your changes instantly.</li>
            </ol>
            <div className="flex gap-4 items-center flex-col sm:flex-row">
              <a
                className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
                href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  className="dark:invert"
                  src="/vercel.svg"
                  alt="Vercel logomark"
                  width={20}
                  height={20}
                />
                Get Free Trial
              </a>
              <a
                className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
                href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read our docs
              </a>
            </div>
          </div>
          <div className="w-1/2 flex justify-end">
            <Image alt="Undraw dashboard" src={'/data-trends.svg'} width={'400'} height={'400'} />
          </div>
        </div>
        <div>
          <h1 className="text-2xl font-medium text-center w-full mb-4">Key Features</h1>
          <Card className="flex items-center flex-col mx-auto p-4">
            <div className="flex items-center  mx-auto">
              {features.map((feature, index) => (
                <div key={index} className={cn("flex items-center p-4 ", index !== features.length - 1 ? 'border-r border-zinc-200' : '')}>
                  <div className="mr-4">{feature.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{feature.title}</h3>
                    {feature.description && <p className="opacity-75 font-light">{feature.description}</p>}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
        <div className="flex items-center flex-col gap-4 mx-auto">
          <h1 className="text-2xl font-medium">Monitors</h1>
          <div className="flex items-center gap-4 mx-auto">
            {monitors.map((monitor, index) => (
              <Badge className="rounded-full  cursor-pointer flex items-center gap-2 text-base font-medium" key={index} >
                <Check size={18} />
                {monitor}
              </Badge>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
