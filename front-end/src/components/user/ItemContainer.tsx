import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import image from '../../../public/—Pngtree—flying cup of coffee with_5057949.png'
import { Iproduct } from "@/type/product"
import { addToCart } from "@/services/UserApi";
import { AxiosError, AxiosResponse } from "axios";
import toast from 'react-hot-toast';

export default function ItemContainer({ product, carProducts, getProducts }: { product: Iproduct, carProducts: string[], getProducts: () => void }) {
    const isInCart = carProducts.includes(product?._id || "");

    function addProductToCart() {
        addToCart(product?._id || "")
            .then((res: AxiosResponse) => {
                if (res.data) {
                    toast.success(res.data.message)
                    getProducts()
                }
            }).catch((err: AxiosError) => {
                toast.error(err?.response?.data?.message as string || "Somthing went wrong")
            })
    }
    return (
        <div className="w-[300px]">
            <Card className="max-[100px] shadow-lg rounded-lg">
                <CardHeader>
                    <CardDescription className="flex items-center justify-center border w-35 h-44 rounded">
                        <img src={image} className="w-32 h-32" alt="" />
                    </CardDescription>
                </CardHeader>
                <CardContent className="flex justify-between">
                    <div className="w-[70%] text-left">
                        <h5 className="font-sans font-semibold text-1xl mb-1">{product.productName}</h5>
                        <p className="font-sans font-semibold text-xs ">{product.description}</p>
                    </div>
                    <div className=" text-right ">
                        <span className="font-sans font-semibold text-2xl mb-2 ">{product.stock}</span>
                        <button
                            onClick={() => !isInCart ? addProductToCart() : null}
                            className="border p-2 rounded bg-amber-800 text-sm text-white font-sans">
                            {isInCart ? "Item in cart" : "Add to Cart"}
                        </button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
