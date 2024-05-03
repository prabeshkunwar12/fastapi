"use client"

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
		}
		fetchData()
	},[input])

	return (
		<main className="h-screen w-screen grainy">
			<div className=" flex flex-col gap-6 items-center pt-32 duration-500 animate-in anumate fade-in-5 slide-in-from-bottom-2.5">
				<h1 className="text-5xl tracking-tight font-bold">SpeedSearch</h1>
				<input 
					value={input} 
					onChange={(e)=>{
						setInput(e.target.value)
					}}
					type='text'
				/>
			</div>
		</main>
	)
}
