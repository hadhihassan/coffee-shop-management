import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    ListFilter,
    MoreHorizontal,
    PlusCircle,
    Search,
} from "lucide-react"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    Tabs,
    TabsContent,
} from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

import DialogForm from "@/components/admin/DialogForm"
import { useEffect, useState } from "react"
import { AxiosError, AxiosResponse } from "axios"
import { getAllProduct } from "@/services/AdminApi"
import { Iproduct } from "@/type/product"

const columns = ["Name", "Description", "Price", "Status", "Stock", "Create date", "Actions"]

export default function Header() {
    interface IAxiosResErr {
        data: AxiosResponse,
        error: AxiosError
    }
    const [products, setProducts] = useState<Iproduct[]>([])
    function getProducts() {
        getAllProduct()
            .then((res) => {
                setProducts(res?.data?.data?.data || [])
            }).catch((error: IAxiosResErr["error"]) => {
                console.log(error)
            })
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <main className="grid flex-1 items-star gap-4  sm:px-6 sm:py-0 md:gap-8 font-sans">
            <Tabs defaultValue="all">
                <div className="flex items-center">
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative ">
                                <Search className="absolute left-2.5 top-3 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full appearance-none outline-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    <div className="ml-auto flex items-center gap-2">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-7 gap-1">
                                    <ListFilter className="h-3.5 w-3.5" />
                                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                        Filter
                                    </span>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuCheckboxItem checked>
                                    Active
                                </DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>Draft</DropdownMenuCheckboxItem>
                                <DropdownMenuCheckboxItem>
                                    Archived
                                </DropdownMenuCheckboxItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <DialogForm getProducts={getProducts}>
                            <Button size="sm" className="h-7 gap-1">
                                <PlusCircle className="h-3.5 w-3.5" />
                                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                    Add Product
                                </span>
                            </Button>
                        </DialogForm>
                    </div>
                </div>
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader className="text-left">
                            <CardTitle>Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-slate-300 bg-slate-200">
                                        <TableHead className="hidden w-[100px] sm:table-cell">
                                            <span>Image</span>
                                        </TableHead>
                                        {
                                            columns?.map((names: string) => (
                                                <TableHead className="text-sm">{names}</TableHead>
                                            ))
                                        }
                                        <TableHead>
                                            <span className="sr-only">Actions</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        products?.map((product: Iproduct) => (
                                            <TableRow className="border" >
                                                <TableCell className="hidden sm:table-cell">
                                                    <Image
                                                        alt="Product image"
                                                        className="aspect-square rounded-md object-cover"
                                                        height="64"
                                                        src="/placeholder.svg"
                                                        width="64"
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {product.productName}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {product.description}
                                                </TableCell>
                                                <TableCell>{product.price}</TableCell>
                                                <TableCell className="font-sans text-white">
                                                    <Badge variant="outline" className={product.isDelete ? "bg-red-500 text-white" : "text-white bg-green-500 border"}>{product.isDelete ? "Active" : "Inactive"}</Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {product.stock}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {product.createdAt as string}
                                                </TableCell>
                                                <TableCell>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button
                                                                aria-haspopup="true"
                                                                size="icon"
                                                                variant="ghost"
                                                            >
                                                                <MoreHorizontal className="h-4 w-4" />
                                                                <span className="sr-only">Toggle menu</span>
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="bg-gray-200">
                                                            <DropdownMenuLabel className="border-b">Actions</DropdownMenuLabel>
                                                            <DropdownMenuItem>Edit</DropdownMenuItem>
                                                            <DropdownMenuItem>Delete</DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <div className="text-xs text-muted-foreground font-sans font-semibold">
                                Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                products
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}
