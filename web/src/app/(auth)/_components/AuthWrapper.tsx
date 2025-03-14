import Logo from "@/app/_components/Logo";
import Link from "next/link";

const AuthWrapper = ({
  children
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <Link href="/" className="flex items-center gap-2 self-center font-medium">
          <Logo size={'large'} />
        </Link>
        {children}
      </div>
    </div>
  );
}

export default AuthWrapper;
