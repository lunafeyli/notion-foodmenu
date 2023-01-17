import { Product as IProduct } from "@/@types/Product"

type Props = {
    product: IProduct;
}

export const Product = ({ product }: Props) => {
    return (
        <li className="relative aspect-[5/4] rounded-md overflow-hidden h-52">
            <img
                src={product.photo_url}
                alt={`Imagem de ${product.name}`}
                className="object-cover absolute inset-0 w-full h-full"
            />
            <header className="w-full absolute top-0 flex justify-between py-2 px-3">
                <button className="rounded-sm bg-[#134e4a57] text-teal-100 text-sm py-1 px-2 opacity-0">+C</button>
                <span className="rounded-sm bg-[#134e4ad5] text-teal-100 text-sm py-1 px-2">R${product.price}</span>
            </header>
            <footer className="w-full flex flex-col justify-end absolute bottom-0 bg-gradient-to-t from-gray-800 to-transparent px-4 pb-3 py-12">
                <h3 className="text-teal-50 font-medium">{product.name}</h3>
                <p className="text-teal-100 text-sm">{product.description}</p>
            </footer>
        </li>
    )
}