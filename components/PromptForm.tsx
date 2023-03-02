"use client"

import { FormEvent, useState } from "react";

const PromptForm = () => {

  const [loading, setLoading] = useState(false)
  const [prompt, setPrompt] = useState('')
  const [promptResponse, setPromptResponse] = useState("");

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setLoading(true)

    const response = await fetch(`/api/generate`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        prompt
      })
    });

    if(!response.ok) {
      throw new Error(response.statusText);

    }

    let answer = await response.json();
    console.log(answer);
    setPromptResponse(answer);
    setLoading(false)
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="w-1/2 mx-auto py-10">
        <div className="flex flex-col md:mr-16">
          <label
            htmlFor="prompt"
            className="text-gray-800 dark:text-gray-100 text-sm font-bold leading-tight tracking-normal mb-2"
          >
            Generate Product Name
          </label>
          <input
            id="prompt"
            name="prompt"
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="text-gray-600 dark:text-gray-400 focus:outline-none focus:border focus:border-indigo-700 dark:focus:border-indigo-700 dark:border-gray-700 dark:bg-gray-800 bg-white font-normal w-64 h-10 flex items-center pl-3 text-sm border-gray-300 rounded border shadow"
            placeholder="Placeholder"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 mt-8 text-white text-lg font-medium px-6 py-2 rounded-md"
        >
          Submit
        </button>
      </form>

      <h2 className="text-lg font-bold text-slate-400 mt-6">Response: {loading ? 'Loading...':promptResponse}</h2>
    </div>
  );
};
export default PromptForm;
