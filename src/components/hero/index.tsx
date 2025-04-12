const Hero = () => {
  return (
    <div className="w-full text-green-600 flex-1 flex flex-col relative h-full">
        <div
          className="z-5 w-full h-full bg-black/8 absolute left-0 top-0">

        </div>
        <img 
          className="z-0 absolute top-0 left-0 object-cover h-full w-full object-top"
          src="/images/travel.jpg" alt="van in front of the ocean" />
        <div
          className="z-5 my-28">
          <h1 className="text-[3rem] font-bold text-center font-teko">Discover Your Perfect Getaway</h1>
          <h3 className="text-xl text-center font-ubuntu text-white">Find and book your dream vacation with ease</h3>
        </div>
    </div>
  )
}

export default Hero