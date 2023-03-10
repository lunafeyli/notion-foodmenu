import Head from 'next/head'
import Image from 'next/image'
import { Product as IProduct } from '@/@types/Product'
import { Product } from '@/components/Product'
import { CategoryTitle } from '@/components/CategoryTitle'
import { useEffect, useState } from 'react'
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });

type Props = {
  products: IProduct[];
  title: any;
}

export default function Home({ /*products, title*/ }: Props) {
  const [products, setProducts] = useState<IProduct[]>([])
  const [title, setTitle] = useState("")

  useEffect(() => {
    async function fetchData() {
      const resP = await fetch('/api/products')
      const resM = await fetch('/api/menu_name')
      const products = await resP.json()
      const menu = await resM.json()
      const results = products.results

      setProducts(results)
      setTitle(menu.menu_name)
    }

    fetchData()
  }, [])

  return (
    <>
      <Head>
        <title>{title === "" ? "Carregando..." : title}</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="px-12 py-8">
        {
          title !== "" && <>
            <h1 className="font-medium text-teal-50 text-3xl mb-8">{title}</h1>
            {products.length === 0 && <h2 className="text-gray-400">Ops! Parece que o <strong className="text-teal-100 font-normal">{title}</strong> está vazio.</h2>}
            {products.length !== 0 && <ul className="flex flex-wrap gap-4">
              {products.map((product, index) => {
                if (product.type === "title") return <CategoryTitle product={product} key={index} index={index}/>;
                
                return <Product product={product} key={index} />;
              })}
            </ul>}
          </>
        }
        {
          title === "" && <h1 className="font-medium text-teal-50 text-3xl mb-8">Carregando...</h1>
        }
      </main>
    </>
  )
}

// export async function getStaticProps() {
//   const resP = await fetch(process.env.API_URL + '/api/products')
//   const resM = await fetch(process.env.API_URL + '/api/menu_name')
//   const products = await resP.json()
//   const menu = await resM.json()
//   const results = products.results

//   return {
//     props: {
//       products: results,
//       title: menu.menu_name
//     },
//   }
// }