import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Tabs, TabsContent } from "@radix-ui/react-tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../components/ui/table"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addToCart, reduceItemFromCart, getCartProducts, createOrder } from "@/services/UserApi";
import { Button } from "@/components/ui/button";

export default function Cart() {
    const [products, setProducts] = useState();
    const [totalCartAmount, settTtalCartAmount] = useState<number>(0);
    function getProducts() {
        getCartProducts()
            .then((res) => {
                if (res?.data !== null && res?.data) {
                    setProducts(res.data.cart.cart)
                    settTtalCartAmount(res.data.cart.totalCartAmount)
                }
                console.log(res?.data?.cart?.cart)
            }).catch((error) => {
                console.log(error)
                toast.error(error?.response?.data?.message || "Somthing went wrong")
            })
    }
    function addQuantity(productId: string) {
        addToCart(productId)
            .then((res) => {
                if (res?.data.message !== null && res?.data.message) {
                    getProducts()
                    toast.success(res.data.message)
                }
            }).catch((error) => {
                console.log(error)
                toast.error(error?.response?.data?.message || "Somthing went wrong")
            })
    }
    function minusQuantity(productId: string) {
        reduceItemFromCart(productId)
            .then((res) => {
                if (res?.data.message !== null && res?.data.message) {
                    getProducts()
                    toast.success(res.data.message)
                }
            }).catch((error) => {
                console.log(error)
                toast.error(error?.response?.data?.message || "Somthing went wrong")
            })
    }
    function orderProducts() {
        createOrder()
            .then((res) => {
                if (res?.data.message !== null && res?.data.message) {
                    toast.success(res.data.message)
                }
            }).catch((error) => {
                console.log(error)
                toast.error(error?.response?.data?.message || "Somthing went wrong")
            })
    }
    // function deleteitem(productId: string) {
    //     deleteItemFromCart(productId)
    //         .then((res: { data: { message: Renderable | ValueFunction<Renderable, Toast>; }; }) => {
    //             if (res?.data.message !== null && res?.data.message) {
    //                 getProducts()
    //                 toast.success(res.data.message)
    //             }
    //         }).catch((error: { response: { data: { message: string; }; }; }) => {
    //             console.log(error)
    //             toast.error(error?.response?.data?.message || "Somthing went wrong")
    //         })
    // }
    useEffect(() => {
        getProducts()
    }, [])
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

                                        <TableHead className="text-center">
                                            <span>Qty</span>
                                        </TableHead>

                                        <TableHead className="text-right">
                                            <span>TotalAmount</span>
                                        </TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {
                                        products?.map((pro) => (
                                            <TableRow className="border-b-2-200 font-sans font-semibold  " >
                                                <TableCell className="hidden sm:table-cell">
                                                    <img
                                                        className="aspect-square rounded-md object-cover"
                                                        height="64"
                                                        src={`http://localhost:3000/images/1719045253921-laurenz-heymann-z6lNa2jYaVw-unsplash.jpg`}
                                                        width="64"
                                                        alt={'Product Image'}
                                                    />
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    {pro.product.description}
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell">
                                                    {pro.product.productName}
                                                </TableCell>
                                                <TableCell>
                                                    {pro.product.price}
                                                </TableCell>
                                                <TableCell className="font-sans text-right">
                                                    <div>
                                                        <Button className="text-xs hover:bg-amber-900 bg-amber-900" onClick={() => minusQuantity(pro.product._id)}>
                                                            &minus;
                                                        </Button>
                                                        <span className="p-quantiry m-2">{pro.quantity}</span>
                                                        <Button className="text-xs hover:bg-amber-900 bg-amber-900" onClick={() => addQuantity(pro.product._id)}>
                                                            +
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell text-right ">
                                                    {pro.total}
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    }

                                </TableBody>
                            </Table>
                        </CardContent>
                        <CardFooter>
                            <div className="flex  justify-between w-full">
                                <div className="text-xs text-muted-foreground font-sans font-semibold">
                                    Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                                </div>
                                <div className="flex gap-5 mr-3 justify-center items-center">
                                    <p><span className="font-semibold">Total Price</span > : <span className="font-semibold text-red-500" >$ {totalCartAmount}</span></p>
                                    <Button
                                        onClick={orderProducts}
                                        className="hover:bg-amber-900 bg-amber-900 px-9 py-0">Order</Button>
                                </div>
                            </div>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </main >
    )
}
