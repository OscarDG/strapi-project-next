'use client' // Indica que este componente se renderiza en el cliente

import Link from "next/link";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";

const styles = {
  container: "w-full max-w-md",
  header: "space-y-1",
  title: "text-3xl font-bold text-pink-500",
  content: "space-y-4",
  fieldGroup: "space-y-2",
  footer: "flex flex-col",
  button: "w-full",
  prompt: "mt-4 text-center text-sm",
  link: "ml-2 text-pink-500",
}

export function SignInForm() {
    return (
        <div className={styles.container}>
            <form>
                <Card>
                    <CardHeader className={styles.header}>
                        <CardTitle className={styles.title}>Sign In</CardTitle>
                        <CardDescription>Welcome back! Please sign in to your account.</CardDescription>
                    </CardHeader>
                    <CardContent className={styles.content}>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="email">Email</Label>
                            <Input type="text" id="identifier" name="identifier" placeholder="username or email" required />
                        </div>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" placeholder="Password" required />
                        </div>
                    </CardContent>
                    <CardFooter className={styles.footer}>
                        <Button className={styles.button}>Sign In</Button>
                    </CardFooter>
                </Card>
                <div className={styles.prompt}>
                    Don&apos;t have an account?
                    <Link href="/signup" className={styles.link}>Sign Up</Link>
                </div>
            </form>
        </div>
    );
}