import { FC, ReactElement } from "react";
import Link from "next/link";
import Logo from "@/app/_components/Logo";

const IndexHeader: FC = (): ReactElement => {
  return (
    <header className="max-w-6xl mx-auto flex items-center justify-between px-8 md:px-12 py-6 w-full ">
      <Link href="/">
        <Logo />
      </Link>
      <nav className="flex items-center gap-4">
        <Link className="hidden md:block px-3 py-2 hover:bg-slate-400/5 rounded-md" href={'/login'}>
          Login
        </Link>
        <Link className="hidden md:block border border-[--border]/10 px-3 py-2 rounded-md hover:bg-slate-400/5 transition ease-in-out" href={'/create-account'} >
          Create an Account
        </Link>
        <Link className="md:hidden block" href={'/login'} >
          Login
        </Link>
      </nav>
    </header>
  );
}

export default IndexHeader;
