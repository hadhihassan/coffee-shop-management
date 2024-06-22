import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent } from "@radix-ui/react-tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import Image from "next/image"
export default function Cart() {
    return (
        <main className="grid flex-1 items-star gap-4  max-w-[80%] m-auto mt-16 sm:px-6 sm:py-0 md:gap-8 font-sans">
            <Tabs defaultValue="all" className="mb-16 shadow-lg" >
                <TabsContent value="all">
                    <Card x-chunk="dashboard-06-chunk-0">
                        <CardHeader className="text-left">
                            <CardTitle>Products</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow className="hover:bg-slate-300 bg-slate-200 ">
                                        <TableHead>
                                            Actions
                                        </TableHead>

                                        <TableHead >
                                            <span>Product</span>
                                        </TableHead>

                                        <TableHead>
                                            <span>Name</span>
                                        </TableHead>

                                        <TableHead>
                                            <span>Price</span>
                                        </TableHead>

                                        <TableHead className="text-right">
                                            <span>Qty</span>
                                        </TableHead>

                                        <TableHead className="text-right">
                                            <span>TotalAmount</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    <TableRow className="border-b-2-200 font-sans font-semibold  " >
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
                                            sdjfhdskj
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            fdsfds
                                        </TableCell>
                                        <TableCell>
                                            68
                                        </TableCell>
                                        <TableCell className="font-sans text-right">
                                            jsadhj
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-right ">
                                            sdfldsf
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="border-b-2-200 font-sans font-semibold  " >
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
                                            sdjfhdskj
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            fdsfds
                                        </TableCell>
                                        <TableCell>
                                            68
                                        </TableCell>
                                        <TableCell className="font-sans text-right">
                                            jsadhj
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-right ">
                                            sdfldsf
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="border-b-2-200 font-sans font-semibold  " >
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
                                            sdjfhdskj
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            fdsfds
                                        </TableCell>
                                        <TableCell>
                                            68
                                        </TableCell>
                                        <TableCell className="font-sans text-right">
                                            jsadhj
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-right ">
                                            sdfldsf
                                        </TableCell>
                                    </TableRow>
                                    <TableRow className="border-b-2-200 font-sans font-semibold  " >
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
                                            sdjfhdskj
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell">
                                            fdsfds
                                        </TableCell>
                                        <TableCell>
                                            68
                                        </TableCell>
                                        <TableCell className="font-sans text-right">
                                            jsadhj
                                        </TableCell>
                                        <TableCell className="hidden md:table-cell text-right ">
                                            sdfldsf
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <div className="flex  justify-between w-full">
                                <div className="text-xs text-muted-foreground font-sans font-semibold">
                                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                </div>
                                <div className="flex gap-16 mr-3">
                                    <p><span className="font-semibold">Items in Cart</span > : <span className="font-semibold text-red-500" >5</span></p>
                                    <p><span className="font-semibold">Total Price</span > : <span className="font-semibold text-red-500" >$ 595</span></p>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main>
    )
}
