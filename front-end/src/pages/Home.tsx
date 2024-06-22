import Header from "./layout/user/Header"
import landingImage from '../../public/—Pngtree—flying cup of coffee with_5057949.png'
import { Button } from "@/components/ui/button"
import { Cart } from "@/pages/user/Cart"

export default function Home() {
    return (
        <div className="mt-8 ml-20">
            <div className="mt-10 flex justify-around items-center">
                <div className="flex-col gap-8 ">
                    <div>
                        <p className="text-4xl text-left leading-normal font-sans font-bold text-balance">Where coffee meets community,<br></br> every cup tells a story.</p>
                    </div><br />
                    <div>
                        <span className="text-gray-500 flex text-1xl fond justify-start text-left  font-sans font-semibold text-balance">Welcome to our coffee shop, where every cup is brewed with passion and, <br /> every sip brings people together in warmth and community.</span>
                    </div>
                    <div className="flex mt-5">
                        <Button className="bg-amber-900 hover:bg-amber-950">TESTE A COFFEE</Button>
                    </div>
                </div>
                <div>
                    <img className="h-[500px] w-auto" src={landingImage} alt="" />
                </div>
            </div>
        </div>
    )
}
