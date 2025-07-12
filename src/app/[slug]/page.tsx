import Comments from "@/components/comments";
import Menu from "@/components/menu";
import Image from "next/image";

function SinglePostPage() {
  return (
    <div className="px-48 w-full mt-20">
      <div className="flex items-center justify-between gap-8">
        <div className="w-1/2 h-[350px] flex flex-col items-start justify-between">
          <h1 className="text-5xl font-bold">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit,
            nihil?
          </h1>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 relative">
              <Image
                src="/nwordlogo (1).png"
                alt="Logo"
                fill
                className="object-cover rounded-full"
              />
            </div>
            <div>
              <h2>Nish</h2>
              <h3 className="text-xs">25 April 2025</h3>
            </div>
          </div>
        </div>
        <div className="w-1/2 h-[350px] relative">
          <Image
            src="https://121clicks.com/wp-content/uploads/2024/09/best-top-travel-landscape-photography-featured2.jpg"
            alt="Featured landscape photography"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      </div>
      <div className="flex mt-10">
        <div className="flex-5 flex flex-col gap-4">
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
            Repellendus ad assumenda pariatur ipsum, deserunt vero magnam nihil
            inventore illo quis unde nulla fuga ab neque, iure saepe at atque
            earum aliquam. Consequuntur, ipsum! Ipsum, error libero iste maxime
            natus assumenda deleniti debitis asperiores. Unde nihil ad, quos
            officiis eveniet quod, officia aliquam praesentium architecto non
            odit ea nemo tenetur beatae labore. Velit eveniet exercitationem,
            quae quaerat ipsum rem esse voluptatibus qui inventore iure fugit
            quis, voluptatem id repudiandae omnis corporis at et sed ab,
            accusantium libero molestias odit magnam modi! Esse modi,
            reprehenderit placeat maxime fuga ea, qui dolor ab dolore, sequi
            doloremque ducimus quos totam deserunt. Ullam aspernatur tempore
            reprehenderit, officia corporis nihil laudantium nesciunt sunt
            maxime cum a suscipit autem ratione sequi eaque dolore, optio quasi
            exercitationem. Vero eius eum rerum tempora itaque. Eius dolore sunt
            expedita, ducimus libero omnis quae obcaecati corporis, aspernatur
            repellat consectetur cupiditate maiores? A incidunt quisquam
            corrupti rem voluptatem! Recusandae omnis doloremque veritatis harum
            veniam, ad qui! A autem deleniti culpa cupiditate, ducimus
            aspernatur, error quibusdam minus quo tempora minima maiores?
            Accusantium asperiores ducimus debitis iure? Dignissimos
            exercitationem neque sunt nisi ipsa non delectus modi? Aliquid
            delectus debitis, similique quasi odit possimus quis?
          </p>
          <Comments />
        </div>

        <Menu />
      </div>
    </div>
  );
}

export default SinglePostPage;
