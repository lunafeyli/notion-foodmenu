// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from "@notionhq/client"
import {
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";

type PostResult = Extract<
  QueryDatabaseResponse["results"][number],
  { properties: Record<string, unknown> }
>;

type Data = {
  name: string
}

async function main() {
  const notion = new Client({
    auth: process.env.NOTION_SECRET,
  });

  const response: QueryDatabaseResponse = await notion.databases.query({
    database_id: process.env.DATABASE_ID || "",
    sorts: [
      {
          property: "Index",
          direction: "ascending"
      }
    ],
    filter: {
      property: "Hide",
      checkbox: {
        equals: false
      }
    }
  });

  const results = response.results as any[]

  const htmlData = results.map(r => {
    const toReturn = {
        name: r.properties.Name.title[0].plain_text,
        type: r.properties.isTitle.checkbox ? "title" : "product",
        description: "",
        price: "",
        photo_url: ""
    }

    if (!r.properties.isTitle.checkbox) {
        toReturn.description = r.properties.Description.rich_text[0].plain_text
        toReturn.price = r.properties.Price.number
        toReturn.photo_url = r.properties.Photo.files[0].type === "file" ? r.properties.Photo.files[0].file.url : r.properties.Photo.files[0].name
    }

    return toReturn
  })

  return htmlData
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await main()

  res.status(200).send({results: data})
}
