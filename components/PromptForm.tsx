"use client"

import { FormEvent, useState } from "react";

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
    <div className="max-w-7xl mx-auto py-10">
      <form onSubmit={handleSubmit} className="w-3/4 py-10">
        <div className="flex flex-col md:mr-16">
          <label
            htmlFor="prompt"
            className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
          >
            What is your question?
          </label>
          <input
            type="text"
            id="prompt"
            name="prompt"
            className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 mt-8 text-white text-lg font-medium px-6 py-2 rounded-md"
        >
          Submit
        </button>
      </form>

      <h2 className="text-lg font-medium text-slate-400 mt-6">
        Response: {loading ? "Loading..." : promptResponse}
      </h2>
    </div>
  );
};
export default PromptForm;
