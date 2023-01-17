import type { NextApiRequest, NextApiResponse } from 'next'
import { Client } from "@notionhq/client"

async function main() {
    const notion = new Client({
      auth: process.env.NOTION_SECRET,
    });
  
    const page: any = await notion.pages.retrieve({ page_id: process.env.PAGE_ID || "" });
  
    return page.properties.title.title[0].plain_text
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
  ) {
    const data = await main()
  
    res.status(200).send({menu_name: data})
}
  