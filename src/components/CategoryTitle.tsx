import { Product as IProduct } from "@/@types/Product"

type Props = {
    product: IProduct;
    index: number;
}

export const CategoryTitle = ({ product, index }: Props) => {
    return (
        <li className="w-full">
            <h2 className={`text-2xl text-teal-100 font-medium${index > 0 ? " pt-2" : ""}`}>{product.name}</h2>
        </li>
    )
}