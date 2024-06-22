import ItemContainer from "@/components/user/ItemContainer"
export default function Shop() {
    return (
        <div>
            <div className="felx m-auto  max-w-max mt-16 h-auto mb-16">
                <div className="mb-5 text-left font-sans text-2xl font-semibold">
                    <h1>Special Menu for you</h1>
                </div>
                <div className="grid grid-cols-3 gap-5">
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                    <ItemContainer />
                </div>
            </div>
        </div>
    )
}
