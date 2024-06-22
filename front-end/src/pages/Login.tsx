import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FormSchema } from "@/validation/Schema"
import { z } from "zod"
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
import { adminLogin } from "@/services/AdminApi"
import { useLocation } from "react-router"
import { userLogin } from "@/services/UserApi"
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';


export function Login() {
    const isAdminRoute: boolean = useLocation().pathname.includes('/admin/login/');
    const navigte = useNavigate()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            email: "",
            password: ""
        },
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        try {
            if (isAdminRoute) {
                adminLogin(data)
                    .then((res) => {
                        if (res?.data?.data?.access !== null && res?.data?.data.access) {
                            localStorage.setItem("AdminAccessToken", res?.data?.access)
                            toast.success('Login success')
                            navigte("/admin/product/")
                        }
                    }).catch((error) => {
                        console.log(error)
                        toast.error(error?.response?.data?.message || "Somthing went wrong")
                    })
            } else {
                userLogin(data)
                    .then((res) => {
                        if (res?.data?.access && res?.data?.access !== null) {
                            localStorage.setItem("UserAccessToken", res?.data?.access)
                            toast.success('Login success')
                            navigte("/")
                        }else{
                            toast.error( "Somthing went wrong")
                        }
                    }).catch((error) => {
                        console.log(error)
                        toast.error(error?.response?.data?.message || "Somthing went wrong")
                    })
            }
        } catch (err) {
            toast.error("Somthing went wrong . try again!")
        }
    }

    return (
        <div className="w-auto max-h-screen min-h-[90vh]  flex items-center justify-center ">
            <Card className="w-[450px] \ border-2 shadow-lg">
                <CardHeader>
                    <CardTitle>Login</CardTitle>
                    <CardDescription></CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="w-auto space-y-6 ">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="text-start">
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter email" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className=" text-start">
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Enter password" {...field} className="w-full" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" className="w-full bg-amber-900 hover:bg-amber-950">Submit</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    )
}
