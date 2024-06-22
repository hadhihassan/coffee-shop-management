export interface Iproduct {
    _id?:string,
    productName: string,
    description: string,
    price: number | string
    stock: number | string,
    availability: "InStock" | "OutOfStock",
    isDelete : boolean,
    image: string
    createdAt?: Date,
    udpatedAt?: Date,
}