import { AlignJustify, BadgeCheck, LogIn, MonitorUp } from "lucide-react";
import { FC, ReactElement } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";

const IndexHeader: FC = (): ReactElement => {
  return (
    <header className="max-w-6xl mx-auto flex items-center justify-between px-8 md:px-12 py-6 w-full ">
      <Link href="/" className="text-[--red] relative z-10 flex items-center gap-2 cursor-pointer justify-center self-center text-2xl font-semibold ">
        <MonitorUp />
        <span>Uptimer</span>
      </Link>
      <nav className="flex items-center">
        <Button className="hidden md:block" variant="ghost">Login</Button>
        <Button className="hidden md:block ml-4" variant="outline">Create an Account</Button>
        <Button className="md:hidden block" variant="outline">Login</Button>
      </nav>
    </header>
  );
}

export default IndexHeader;
