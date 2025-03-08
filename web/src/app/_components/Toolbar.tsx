import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink } from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import Link from "next/link";

const Toolbar = () => {
  return (
    <header className="p-4">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <SidebarTrigger />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="/dashboard">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          {/* ... */}
        </BreadcrumbList>
      </Breadcrumb>
    </header>
  );
}

export default Toolbar;
