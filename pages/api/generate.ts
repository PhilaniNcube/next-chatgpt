// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

if(!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI')
}

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {


  const {prompt} = req.body

  if(!prompt) {
    return new Response("No prompt in the request", {status:400})
  }

  const payload = {
    model: 'gpt-3.5-turbo',
    prompt,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 90,
    stream: false,
    n: 1,
  }


  const response = await fetch("https://api.openai.com/v1/completions", {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.OPENAI_API_KEY ?? ""}`,
    },
    method: "POST",
    body: JSON.stringify(payload)
  })

  const json = await response.json()



  res.status(200).json(json)
}
