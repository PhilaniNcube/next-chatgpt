// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { OpenAIStream, OpenAIStreamPayload } from "../../utils/OpenAIStream";

if(!process.env.OPENAI_API_KEY) {
  throw new Error('Missing env var from OpenAI')
}

export const config = {
  runtime: "edge",
};



type Data = {
  name: string
}

 type Payload = {
     model: string,
    prompt:string,
    temperature: number,
    top_p: number,
    frequency_penalty: number,
    presence_penalty: number,
    max_tokens: number,
    stream: boolean,
    n: number,
}



export default async function handler(
  req: Request
) :Promise<Response>{

  const { prompt } = (await req.json()) as {
    prompt?: string;
  };


  if(!prompt) {
    return new Response("No prompt in the request", {status:400})
  }

  const payload :OpenAIStreamPayload= {
    model: 'gpt-4',
    messages:[{role:"user", content:prompt}],
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    max_tokens: 700,
    stream: true,
    n: 1,
  }

 const stream = await OpenAIStream(payload);
  return new Response(stream);

}
