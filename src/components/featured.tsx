import Image from "next/image"

function Featured() {
  return (
    <div className="flex flex-col items-center justify-center gap-4 p-8 mb-20 mt-10">
        <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-6xl font-bold">Your Thoughts. Your Voice.</h1>
            <h1 className="text-6xl font-bold">Your Blog.</h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 w-full md:mt-20 mt-5 px-40">
            <div className="w-full md:w-1/2 flex items-center md:justify-end">
                <div className="w-[500px] h-[400px] relative">
                    <Image 
                    src="https://121clicks.com/wp-content/uploads/2024/09/best-top-travel-landscape-photography-featured2.jpg" 
                    alt="Featured landscape photography" 
                    fill
                    className="object-cover"
                    />
                </div>
            </div>
            
            <div className="w-full md:w-1/2 flex flex-col items-start justify-center gap-4">
                <h1 className="text-3xl font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem, earum.</h1>
                <p className="text-lg font-medium">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Commodi velit dicta iure neque, illum culpa maiores tempore eius saepe mollitia voluptas unde praesentium tenetur veniam molestias minus. Vel, modi deserunt?</p>
                <button className="bg-gray-600 px-4 py-2 text-white">Read More</button>
            </div>
        </div>
        
    </div>
  )
}

export default Featured