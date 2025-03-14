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
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {

  const features = FEATURES;
  const monitors = MONITORS;

  return (
    <div className="">
      <IndexHeader />
      <main className="flex flex-col gap-8 row-start-2 items-center justify-center sm:items-start md:p-12 md:pt-6 max-w-6xl mx-auto px-8 mt-4">
        <div className="flex flex-col md:flex-row items-center ">
          <div className="md:w-1/2 justify-center flex flex-col space-y-6  text-center md:text-left">
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
              <Link href={'/create-account'}>
                <Button className="rounded-full">
                  <Image
                    className="dark:invert"
                    src="/vercel.svg"
                    alt="Vercel logomark"
                    width={20}
                    height={20}
                  />
                  Get Free Trial
                </Button>
              </Link>
              <Link href={'/create-account'}>
                <Button variant={'outline'} className="rounded-full">
                  Read our docs
                </Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-end md:mt-0 mt-8">
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
            <div className="flex items-center flex-col md:flex-row mx-auto">
              {features.map((feature, index) => (
                <div key={index} className={cn("flex items-center p-4 ", index !== features.length - 1 ? 'md:border-r border-b border-zinc-200' : '')}>
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
        <div className="flex items-center flex-col gap-4 mx-auto w-full mb-12">
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
