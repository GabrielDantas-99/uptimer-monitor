import IndexHeader from "@/app/_components/IndexHeader";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { MONITORS } from "./consts/monitors";
import { FEATURES } from "./consts/features";
import Footer from "./_components/Footer";

export default function Home() {

  const features = FEATURES;
  const monitors = MONITORS;

  return (
    <div className="">
      <IndexHeader />
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
            <Image
              src="https://i.ibb.co/MshLk9P/bg.jpg"
              alt="API Monitor"
              className="w-full"
              width={800}
              height={800}
              priority
            />
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
        <div className="flex items-center flex-col gap-4 mx-auto w-full">
          <h1 className="text-2xl font-medium">Monitors</h1>
          <div className="flex items-center gap-4 mx-auto w-full ">
            <Accordion type="single" collapsible className="w-full min-w-full">
              {monitors.map((monitor, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>
                    {monitor.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    {monitor.description}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
