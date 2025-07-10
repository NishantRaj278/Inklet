
function Categories() {
  return (
    <div className="flex flex-col items-start justify-center gap-8 px-56 mb-20 mt-10">
        <h1 className="font-bold text-4xl">Popular Categories</h1>
        <div className="w-full flex flex-wrap items-center justify-between gap-4 px-16">
            <button className="px-4 py-2 bg-gray-300 text-black text-sm">Style</button>
            <button className="px-4 py-2 bg-gray-300 text-black text-sm">Fashion</button>
            <button className="px-4 py-2 bg-gray-300 text-black text-sm">Food</button>
            <button className="px-4 py-2 bg-gray-300 text-black text-sm">Travel</button>
            <button className="px-4 py-2 bg-gray-300 text-black text-sm">Culture</button>
            <button className="px-4 py-2 bg-gray-300 text-black text-sm">Coding</button>
        </div>
    </div>
  )
}

export default Categories