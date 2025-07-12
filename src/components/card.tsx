import Image from "next/image";

function Card() {
  return (
    <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4">
      <div className="w-1/2 h-[300px] relative mb-4">
        <Image
          src="https://121clicks.com/wp-content/uploads/2024/09/best-top-travel-landscape-photography-featured2.jpg"
          alt="Featured landscape photography"
          fill
          className="object-cover"
        />
      </div>
      <div className="w-full md:w-1/2 flex flex-col items-start justify-between gap-4 h-[300px] py-2">
        <h3>11.02.2024 - CULTURE</h3>
        <h1>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe,
          cumque!
        </h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam non
          accusamus hic animi illo et ea vero! Atque, similique beatae.
        </p>
        <button className="border-b">Read More</button>
      </div>
    </div>
  );
}

export default Card;
