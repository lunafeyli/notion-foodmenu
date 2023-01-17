export type Product = {
    name: string,
    type: "title" | "product",
    hide: boolean,
    description: string,
    price: number,
    photo_url: string
}