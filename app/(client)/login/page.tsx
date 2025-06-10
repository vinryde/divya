import { Button } from "@/components/ui/button";
import { Checkbox, Field, Input, Label } from "@headlessui/react";
import clsx from "clsx";
import { ArrowUp, CheckIcon, Github } from "lucide-react";
import { Metadata } from "next";
import { auth, signIn } from "../../../auth";
import { redirect } from "next/navigation";
import { GradientBackground } from "@/components/gradient";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Login",
  description: "Sign in to your account to continue.",
};

const LoginPage = async () => {
  const session = await auth();
  if (session?.user) return redirect("/");
  return (
    <main className="overflow-hidden bg-gray-50">
      <GradientBackground />
      <div className="isolate flex min-h-dvh items-center justify-center p-6 lg:p-8">
        <div className="w-full max-w-md rounded-xl bg-white shadow-md ring-1 ring-black/5">
          <div className="p-7 sm:p-11">
            <div className="flex items-start">
              <Link href="/" title="Home">
                <h2 className="text-lg font-semibold uppercase hover:text-pink-700 duration-300">
                  Bloggers
                </h2>
              </Link>
            </div>
            <h1 className="mt-8 text-base/6 font-medium">Welcome back!</h1>
            <p className="mt-1 text-sm/5 text-gray-600">
              Sign in to your account to continue.
            </p>

            {/* Oauth login */}
            <div className="my-5 w-full space-y-4">
              <form
                action={async () => {
                  "use server";
                  await signIn("google", { callbackUrl: "/" });
                }}
              >
                <Button
                  type="submit"
                  className="w-full justify-start space-x-2 h-10"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Sign in with Google</span>
                </Button>
              </form>
              <form
                action={async () => {
                  "use server";
                  await signIn("github", { callbackUrl: "/" });
                }}
              >
                <Button
                  type="submit"
                  className="w-full justify-start space-x-2 h-10"
                >
                  <Github />
                  <span>Sign in with Github</span>
                </Button>
              </form>
            </div>

            <Field className="mt-4 space-y-3">
              <p className="text-xs font-semibold flex items-center gap-1 mb-2">
                Please use oauth only{" "}
                <ArrowUp className="w-4 h-4 text-darkOrange animate-bounce" />
              </p>
              <Label className="text-sm/5 font-medium">Email</Label>
              <Input
                disabled={true}
                required
                autoFocus
                type="email"
                name="email"
                className={clsx(
                  "block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10",
                  "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
                  "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black"
                )}
              />
            </Field>
            <Field className="mt-4 space-y-3">
              <Label className="text-sm/5 font-medium">Password</Label>
              <Input
                disabled={true}
                required
                type="password"
                name="password"
                className={clsx(
                  "block w-full rounded-lg border border-transparent shadow ring-1 ring-black/10",
                  "px-[calc(theme(spacing.2)-1px)] py-[calc(theme(spacing[1.5])-1px)] text-base/6 sm:text-sm/6",
                  "data-[focus]:outline data-[focus]:outline-2 data-[focus]:-outline-offset-1 data-[focus]:outline-black"
                )}
              />
            </Field>
            <div className="mt-4 flex items-center justify-between text-sm/5">
              <Field className="flex items-center gap-3">
                <Checkbox
                  disabled={true}
                  name="remember-me"
                  className={clsx(
                    "group block size-4 rounded border border-transparent shadow ring-1 ring-black/10 focus:outline-none",
                    "data-[checked]:bg-black data-[checked]:ring-black",
                    "data-[focus]:outline data-[focus]:outline-2 data-[focus]:outline-offset-2 data-[focus]:outline-black"
                  )}
                >
                  <CheckIcon className="fill-white opacity-0 group-data-[checked]:opacity-100" />
                </Checkbox>
                <Label>Remember me</Label>
              </Field>
              <Link href="#" className="font-medium hover:text-gray-600">
                Forgot password?
              </Link>
            </div>
            <div className="mt-6">
              <Button type="submit" disabled={true} className="w-full">
                Sign in
              </Button>
            </div>
          </div>

          <div className="m-1.5 rounded-lg bg-gray-50 py-4 text-center text-sm/5 ring-1 ring-black/5">
            Not a member?{" "}
            <Link href="#" className="font-medium hover:text-gray-600">
              Create an account
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;
