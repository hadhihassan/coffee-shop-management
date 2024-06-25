import ItemContainer from "@/components/user/ItemContainer"
import { GetAllProducts } from "@/services/UserApi"
import { Iproduct } from "@/type/product"
import { useEffect, useState } from "react"
import toast from 'react-hot-toast';


export default function Shop() {
    const [products, setProducts] = useState<Iproduct[]>([]);
    const [carProducts, setcarProducts] = useState<string[]>([]);
    function getProducts() {
        GetAllProducts()
            .then((res) => {
                if (res?.data.data !== null && res?.data.data) {
                    setProducts(res?.data.data)
                    setcarProducts(res?.data.cartProducts || [])
                }
            }).catch((error) => {
                console.log(error)
                toast.error(error?.response?.data?.message || "Somthing went wrong")
            })
    }
    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div>
            <div>

            </div>
            <div className="felx m-auto  max-w-max mt-16 h-auto mb-16">
                <div className="mb-5 text-left font-sans text-2xl font-semibold">
                    <h1>Special Menu for you</h1>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    {
                        products?.map((product: Iproduct) => (
                            <ItemContainer product={product} getProducts={getProducts} carProducts={carProducts} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
