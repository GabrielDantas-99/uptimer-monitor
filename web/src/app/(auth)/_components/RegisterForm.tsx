'use client'

import { cn } from "@/lib/utils"
import Button from "@/app/_components/Button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import { useRegister } from "../(pages)/create-account/useRegister"
import TextInput from "@/app/_components/TextInput"
import clsx from "clsx"
import Image from "next/image"
import PageLoader from "./PageLoader"
import { Loader } from "lucide-react"

interface RegisterFormProps {
  className?: string;
  props?: any
}

export function RegisterForm({
  className,
  ...props
}: RegisterFormProps) {
  const { loading, validationErrors, setValidationErrors, onRegisterSubmit } = useRegister();

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome to Uptimer!</CardTitle>
          <CardDescription>
            Register with your Apple or Google account
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading && <PageLoader />}
          {/* TODO: Update to Shadcn Form */}
          <form action={onRegisterSubmit}>
            <div className="grid gap-6">
              <div className="flex flex-col gap-4">
                <Button variant="outline" className="w-full">

                  <Image src={'./apple.svg'} alt="Apple icon" width={16} height={16} />
                  Register with Apple
                </Button>
                <Button variant="outline" className="w-full">
                  <Image src={'./google.svg'} alt="Google icon" width={16} height={16} />
                  Register with Google
                </Button>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or continue with
                </span>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="username">Username</Label>
                  <TextInput
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Harvey Specter"
                    className={clsx({
                      'border border-red-400': validationErrors!.username
                    })}
                    onChange={() => {
                      setValidationErrors!({ ...validationErrors!, username: '' })
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <TextInput
                    id="email"
                    name="email"
                    type="email"
                    placeholder="m@example.com"
                    className={clsx({
                      'border border-red-400': validationErrors!.username
                    })}
                    onChange={() => {
                      setValidationErrors!({ ...validationErrors!, email: '' })
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Label htmlFor="password" >Password</Label>
                  </div>
                  <TextInput
                    id="password"
                    name="password"
                    type="password"
                    className={clsx({
                      'border border-red-400': validationErrors!.username
                    })}
                    onChange={() => {
                      setValidationErrors!({ ...validationErrors!, password: '' })
                    }}
                  />
                </div>
                <Button disabled={loading} type="submit" className="w-full">
                  {loading ? (
                    <Loader className="animate-spin " />
                  ) : 'Register'}
                </Button>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <Link href="/login" className="underline underline-offset-4">
                  Sign in
                </Link>
              </div>
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
