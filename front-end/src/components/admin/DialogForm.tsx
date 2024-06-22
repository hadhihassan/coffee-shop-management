import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import { CreateProductSchema, } from "@/validation/Schema"
import { useForm } from "react-hook-form"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { createProduct } from "@/services/AdminApi"


export default function DialogForm({ children, getProducts }: { children: React.ReactNode, getProducts: () => void }) {
    const form = useForm<z.infer<typeof CreateProductSchema>>({
        resolver: zodResolver(CreateProductSchema),
        defaultValues: {
            availability: "",
            description: "",
            price: "10",
            name: "",
            category: "",
            image: [],
            stock: ""
        },
    })

    // const MAX_FILE_SIZE = 1024 * 1024 * 5; // 5MB in bytes
    // const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (e: React.FormEvent) => {
        const file = e.target?.files[0];
        setSelectedFile(file);
    };

    const handleSubmit = async (data: z.infer<typeof CreateProductSchema>) => {

        const formData = new FormData();

        formData.append('image', selectedFile || "");

        Object.keys(data).forEach(key => {
            formData.append(key, data[key] || "");
        });
        try {
            createProduct(formData)
                .then((res) => {
                    getProducts()
                }).catch((err) => {
                    console.log(err)
                })
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <Dialog>
                <DialogTrigger asChild>
                    {children}
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Add Product</DialogTitle>
                        <DialogDescription>
                            Create a new product . Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid  py-4 font-sans text-left">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-auto space-y-6 " encType="multipart/form-data">
                                <div className="flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name="name"
                                        render={({ field }) => (
                                            <FormItem className="text-start">
                                                <FormLabel>Name</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter name" {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem className=" text-start">
                                                <FormLabel>Description</FormLabel>
                                                <FormControl>
                                                    <Input placeholder="Enter description" {...field} className="w-full" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div >
                                <div className="flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name="price"
                                        render={({ field }) => (
                                            <FormItem className=" text-start">
                                                <FormLabel>Price</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Enter price" {...field} className="w-full" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="category"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Category</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a category" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="m@example.com">m@example.com</SelectItem>
                                                        <SelectItem value="m@google.com">m@google.com</SelectItem>
                                                        <SelectItem value="m@support.com">m@support.com</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <div className="flex gap-2">
                                    <FormField
                                        control={form.control}
                                        name="stock"
                                        render={({ field }) => (
                                            <FormItem className=" text-start">
                                                <FormLabel>Stock</FormLabel>
                                                <FormControl>
                                                    <Input type="number" placeholder="Enter Stock" {...field} className="w-full" />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="availability"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Availability</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value} >
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a status" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>
                                                        <SelectItem value="Outofstock">Out of stock</SelectItem>
                                                        <SelectItem value="Instpck">In stock</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                                <FormMessage />
                                            </FormItem>
                                        )}
                                    />
                                </div>
                                <FormField
                                    control={form.control}
                                    name="image"
                                    render={({ field }) => (
                                        <FormItem className=" text-start">
                                            <FormLabel>Image</FormLabel>
                                            <FormControl onChange={(e) => handleFileChange(e)}>
                                                <Input accept="image/*" placeholder="Enter image" type="file" {...field} className="w-full" />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <DialogFooter>
                                    <Button type="submit" className="px-8">Save</Button>
                                </DialogFooter>
                            </form>
                        </Form>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}
