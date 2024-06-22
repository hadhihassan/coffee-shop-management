import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/components/ui/card"
import image from '../../../public/—Pngtree—flying cup of coffee with_5057949.png'

export default function ItemContainer() {
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
                        <h5 className="font-sans font-semibold text-1xl mb-1">Sample</h5>
                        <p className="font-sans font-semibold text-xs ">Welcome to our coffee shop, where every cup is brewed with </p>
                    </div>
                    <div className=" text-right ">
                        <span className="font-sans font-semibold text-2xl mb-2 ">10K</span>
                        <button className="border p-2 rounded bg-amber-800 text-sm text-white font-sans ">Add to cart</button>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
