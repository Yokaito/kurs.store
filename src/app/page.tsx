import Image from 'next/image'
import Link from 'next/link'

const Home = () => {
  return (
    <main className="p-24">
      <article className="relative flex flex-col max-w-xs gap-1 pb-2 transition-all bg-white rounded-sm group hover:scale-105">
        <div className="absolute z-10 flex flex-col gap-2 top-1 left-1">
          <div className="px-3 py-0 bg-black rounded-md w-max">
            <span className="text-white lowercase font-extralight">New</span>
          </div>
          <div className="px-3 py-0 bg-red-400 rounded-md w-max">
            <span className="text-white lowercase font-extralight">stock</span>
          </div>
        </div>
        <div className="absolute z-10 top-1 right-1">
          <span className="text-black">star</span>
        </div>
        <Link href="/produto/p">
          <Image
            src="https://www.agenciaeplus.com.br/wp-content/uploads/2021/12/pagina-de-produto.jpg"
            width={1000}
            height={1000}
            quality={100}
            alt="product image"
            className="object-contain w-full max-w-xs px-1 aspect-square"
          />
        </Link>
        <div className="flex flex-col px-3 text-black">
          <h2 className="overflow-hidden text-lg font-semibold text-ellipsis">
            Curso online do luizinho
          </h2>
          <span className="text-base font-light">R$ 24,53</span>
        </div>
        <footer className="flex w-full px-3">
          <button className="justify-center flex-grow-0 invisible w-0 h-0 text-white transition-all rounded-md bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 group-hover:flex-1 group-hover:visible group-hover:w-full group-hover:px-4 group-hover:py-2 group-hover:h-10 text-[0px] group-hover:text-base duration-300">
            Comprar
          </button>
        </footer>
      </article>
    </main>
  )
}

export default Home
