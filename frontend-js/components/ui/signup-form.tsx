'use client'

import { actions } from "@/actions";
import { useActionState } from "react";
import Link from "next/link";
import { type FormState } from "@/validations/auth";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";

import {
    CardTitle,
    Card, CardContent,
    CardHeader,
    CardDescription,
    CardFooter,
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
};

const INITIAL_STATE: FormState = {
    success: undefined,
    message: undefined,
    strapiErrors: null,
    zodErrors: null,
    data: {
        username: '',
        email: '',
        password: '',
    }
}

export function SignUpForm() {

    const [formState, formAction] = useActionState(actions.auth.registerUserAction, INITIAL_STATE)

    console.log(formState);

    return (
        <div className={styles.container}>
            <form action={formAction}>
                <Card>
                    <CardHeader>
                        <CardTitle className={styles.header}>Sign Up</CardTitle>
                        <CardDescription>Create your account</CardDescription>
                    </CardHeader>
                    <CardContent className={styles.content}>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="name">Name</Label>
                            <Input 
                            id="name"
                            type="text"
                            placeholder="Name" 
                            name="name"
                            defaultValue={formState.data?.username ?? ''} />
                            <FormError error={formState.zodErrors?.username} />
                        </div>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="email">Email</Label>
                            <Input 
                            id="email" 
                            type="email" 
                            name="email" 
                            placeholder="example@email.com" 
                            defaultValue={formState.data?.email ?? ''}/>
                            <FormError error={formState.zodErrors?.email} />
                        </div>
                        <div className={styles.fieldGroup}>
                            <Label htmlFor="password">Password</Label>
                            <Input 
                            id="password" 
                            type="password" 
                            placeholder="Password" 
                            name="Password" 
                            defaultValue={formState.data?.password ?? ''}/>
                            <FormError error={formState.zodErrors?.password} />
                        </div>
                    </CardContent>
                    <CardFooter className="flex-col">
                        <Button className={styles.button}>Sign Up</Button>
                        {formState.strapiErrors && <p className="text-pink-500 text-xs italic mt-1 py-2">Email or User name already taken</p>}
                    </CardFooter>
                </Card>
                <div className={styles.prompt}>
                    Have an account?
                    <Link href="/signin" className={styles.link}>Sign In</Link>
                </div>
            </form>
        </div>
    )
}