"use client"

import { FormEvent, useState } from "react";
import ResizablePanel from "./ResizePanel";

const PromptForm = () => {

  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [question, setQuestion] = useState('')
  const [promptResponse, setPromptResponse] = useState("");

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setPromptResponse('')
    setLoading(true)



        const {
       prompt
        } = Object.fromEntries(new FormData(e.currentTarget));

        console.log({prompt})

    const response = await fetch("/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });

    if(!response.ok) {
      setLoading(false);
      throw new Error(response.statusText);
    }

    const data = response.body;
    if (!data) {
      return;
    }
  const reader = data.getReader();
  const decoder = new TextDecoder();
  let done = false;

  while (!done) {
    const { value, done: doneReading } = await reader.read();
    done = doneReading;
    const chunkValue = decoder.decode(value);
    setLoading(false)

    setPromptResponse((prev) => prev + chunkValue);
  }

  setLoading(false);

  }

  return (
    <div className="py-10 mx-auto max-w-7xl">
      <form onSubmit={handleSubmit} className="w-full py-10">
        <div className="flex flex-col">
          <label
            htmlFor="prompt"
            className="mb-2 text-sm font-bold leading-tight tracking-normal text-zinc-800"
          >
            What is your question?
          </label>
          <textarea
            id="prompt"
            rows={3}
            name="prompt"
            className="flex items-center w-full p-3 text-sm font-normal text-gray-600 bg-white border border-gray-300 rounded shadow dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-2 mt-8 text-lg font-medium text-white bg-blue-600 rounded-md"
        >
          Submit
        </button>
      </form>

      <ResizablePanel>
        <p className="text-lg font-medium text-slate-400">
          Response: {loading ? "Loading..." : promptResponse}
        </p>
      </ResizablePanel>
    </div>
  );
};
export default PromptForm;
