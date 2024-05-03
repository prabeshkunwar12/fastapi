"use client"

import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { useEffect, useState } from "react"

export default function Home() {
	const [input, setInput] = useState<string>('')
	const [searchResults, setSearchResults] = useState<{
		results: string[],
		duration: number
	}>()

	useEffect(()=>{
		const fetchData = async () => {
			if(!input) return setSearchResults(undefined)
			
			const res = await fetch(`/api/search?q=${input}`)
			const data = (await res.json()) as { results: string[]; duration:number }
			setSearchResults(data)
		}
		fetchData()
	},[input])

	return (
		<main className="h-screen w-screen grainy">
			<div className=" flex flex-col gap-6 items-center pt-32 duration-500 animate-in anumate fade-in-5 slide-in-from-bottom-2.5">
				<h1 className="text-5xl tracking-tight font-bold">SpeedSearch ⚡</h1>
				<p className="text-zinc-600 text-lg max-w-prose text-center">
					A high-performance API built with Hono, next.js and Cloudflare.
					<br />{' '}
					Type a query below and get your results in milliseconds.
				</p>

				<div className='max-w-md w-full'>
					<Command>
						<CommandInput 
							value={input} 
							onValueChange={setInput} 
							placeolder='Search Countries...' 
							className=' placeholder:text-zinc-500' 
						/>
						<CommandList>
							{searchResults?.results.length === 0 ? (
								<CommandEmpty>No Results Found</CommandEmpty>
							):(
								<CommandGroup heading="Results">
									{searchResults?.results.map((result)=>(
										<CommandItem 
											key={result} 
											value={result}
											onSelect={setInput}
										>{result}</CommandItem>
									))}
								</CommandGroup>
							)}

							{searchResults?.results ? (
								<>
									<div className="h-px w-full bg-zinc-200" />
									<p className="='p-2 text-xs text-zinc-500">
										Found {searchResults.results.length} results in 
										{searchResults?.duration.toFixed(2)}ms
									</p>
								</>
							) : null}
						</CommandList>
					</Command>
				</div>
			</div>
		</main>
	)
}
