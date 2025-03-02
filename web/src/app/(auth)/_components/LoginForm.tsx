'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"
import { useLogin } from "../(pages)/login/useLogin"
import clsx from "clsx"

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const { loading, validationErrors, setValidationErrors, onLoginSubmit } = useLogin();
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>
            Login with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button disabled={loading} variant="outline" className="w-full">
              <Image src={'./apple.svg'} alt="Apple icon" width={16} height={16} />
              Login with Apple
            </Button>
            <Button disabled={loading} variant="outline" className="w-full">
              <Image src={'./google.svg'} alt="Google icon" width={16} height={16} />
              Login with Google
            </Button>
          </div>
          <div className="my-6 relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
            <span className="relative z-10 bg-background px-2 text-muted-foreground">
              Or continue with
            </span>
          </div>
          <form action={onLoginSubmit}>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  placeholder="m@example.com"
                  className={clsx({
                    'border border-red-400': validationErrors!.username
                  })}
                  onChange={() => {
                    setValidationErrors!({ ...validationErrors!, username: '' })
                  }}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  className={clsx({
                    'border border-red-400': validationErrors!.password
                  })}
                  onChange={() => {
                    setValidationErrors!({ ...validationErrors!, password: '' })
                  }}
                />
              </div>
              <Button disabled={loading} type="submit" className="w-full">
                Login
              </Button>
            </div>
            <div className="text-center text-sm mt-4">
              Don&apos;t have an account?{" "}
              <Link href="/create-account" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  )
}
