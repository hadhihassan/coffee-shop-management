import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Input } from "@/components/ui/input"
import { toast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { registerUser } from "@/services/UserApi"
import { useNavigate } from "react-router-dom"

const FormSchema = z.object({
    userName: z.string()
        .min(4, { message: "UserName must be at least 4 characters" })
        .max(12, { message: "UserName is must be lesthen 12 characters" }),
    email: z.string()
        .min(4, { message: "Email must be at least 2 characters.", })
        .email("This is not a valid email."),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long.' })
        .regex(/[a-z]/, { message: "Password must contain at least one lowercase letter." })
        .regex(/[A-Z]/, { message: "Password must contain at least one uppercase letter." })
        .regex(/[0-9]/, { message: "Password must contain at least one digit." })
        .regex(/[^a-zA-Z0-9]/, { message: "Password must contain at least one special character." }),

})
export default function Signup() {

    const navigate = useNavigate()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            userName: "",
            email: "",
            password: "",
            // confirmPassword: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
        registerUser(data)
            .then((res) => {
                console.log(res.data.data.message)
                if(res.data.data.message === "Success"){
                    navigate("/login")
                }
            }).catch((err) => {
                console.log(err)
            })
    }
    return (
        <div className="w-auto max-h-screen min-h-[90vh]  flex items-center justify-center">
            <Card className="w-[450px]">
                <CardHeader>
                    <CardTitle>Signup</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-auto space-y-6">
                            <FormField control={form.control} name="userName" render={({ field }) => (
                                <FormItem className="text-start">
                                    <FormLabel>User Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Username" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="email" render={({ field }) => (
                                <FormItem className="text-start">
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter email" {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <FormField control={form.control} name="password" render={({ field }) => (
                                <FormItem className="text-start">
                                    <FormLabel>Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter password" {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            {/* <FormField control={form.control} name="confirmPassword" render={({ field }) => (
                                <FormItem className="text-start">
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Confirm your Password" {...field} className="w-full" />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}/> */}
                            <Button type="submit" className="w-full text-amber-800 hover:bg-amber-950">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
