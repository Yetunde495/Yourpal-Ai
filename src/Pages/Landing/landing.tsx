import img1 from "../../assets/IMG_2160-removebg-preview.png";

const HeroSection = () => {
  return (
    <div className="relative bg-white h-screen flex flex-col-reverse lg:flex-row items-center justify-between overflow-hidden px-6 lg:px-10">
      {/* Left Content */}
      <div className="text-center lg:text-left lg:flex-1 mt-10 lg:mt-0">
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          My name is <span className="text-orange-500">Jacob</span>
        </h1>
        <p className="mt-4 text-gray-600 text-sm md:text-base">
          I am a professional programmer with more than 10 years of experience.
        </p>
        <div className="mt-6 flex flex-col lg:flex-row items-center lg:items-start gap-4 justify-center lg:justify-start">
          <button className="px-6 py-3 bg-orange-500 text-white rounded-lg shadow-md hover:bg-orange-600">
            Hire Me
          </button>
          <button className="px-6 py-3 border border-gray-300 rounded-lg hover:border-gray-400">
            Contact Me
          </button>
        </div>

        {/* Skill Tags */}
        <div className="mt-8 flex flex-wrap justify-center lg:justify-start gap-3">
          <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-md">
            C++
          </span>
          <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-md">
            Java
          </span>
          <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
            PHP
          </span>
          <span className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md">
            JavaScript
          </span>
        </div>
      </div>

      {/* Right Content */}
      <div className=" lg:flex-1 flex justify-center items-center">
        {/* Orange Background */}
        <div className="absolute -top-26 right-40 rounded-b-full bg-orange-500 h-48 w-48 md:h-72 md:w-72 lg:h-[680px] lg:w-[20rem] rotate-[50deg] transform translate-x-10 -translate-y-10">
            
        </div>

        {/* Image */}
        <div className="relative">
          <img
            src={img1}
            alt="Jacob"
            className="relative bottom-[8.9rem] right-12 w-48 h-48 md:w-60 md:h-60 lg:w-full lg:h-auto border-b-4 border-orange-500 rounded-full object-cover"
          />
          {/* Experience Label */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 bg-black text-white px-4 py-2 rounded-lg shadow-lg">
            10+ years experience
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
