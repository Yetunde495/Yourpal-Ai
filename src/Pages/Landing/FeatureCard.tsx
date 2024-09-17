import Product from "../../assets/product.png";
import Jobseeker from "../../assets/jobseeker.png";
import Recruiter from "../../assets/reruiter.png";
import Socials from "../../assets/social.png";

const features = [
  {
    heading: "Adventure-ready",
    subHeading: "Lorem Ipsum dolor sit amet consectetur",
    description:
      "The Drawstring Canister is water and tear resistant with durable canvas construction. This bag holds up to the demands of daily use while keeping your snacks secure.",
    imageSrc: Product,
    imageAlt: "Printed photo of bag being tossed into the sky on top of grass.",
    btnText: "Start with LinkedIn Pal",
  },
  {
    heading: "Adventure-ready",
    subHeading: "Lorem Ipsum dolor sit amet consectetur",
    description:
      "Everything you need, nothing you don't. This bag has the simple, contemporary design that enables you to tell everyone you know about how essentialism is the only rational way to live life.",
    imageSrc: Jobseeker,
    imageAlt: "Double stitched black canvas hook loop.",
    btnText: "Start with LinkedIn Pal",
    morebtn: true,
  },
  {
    heading: "Adventure-ready",
    morebtn: true,
    subHeading: "Lorem Ipsum dolor sit amet consectetur",
    description:
      "Never lose your snacks again with our patent-pending snack stash pocket system. With dedicated pouches for each of your snacking needs, the Drawstring Canister unlocks new levels of efficiency and convenience.",
    btnText: "Start with LinkedIn Pal",
    imageSrc: Recruiter,
    imageAlt: "Black canvas body with chrome zipper and key ring.",
  },
  {
    heading: "Adventure-ready",
    morebtn: true,
    subHeading: "Lorem Ipsum dolor sit amet consectetur",
    description:
      "Never lose your snacks again with our patent-pending snack stash pocket system. With dedicated pouches for each of your snacking needs, the Drawstring Canister unlocks new levels of efficiency and convenience.",
    btnText: "Start with LinkedIn Pal",
    imageSrc: Socials,
    imageAlt: "Black canvas body with chrome zipper and key ring.",
  },
];

const FeatureCard = () => {
  return (
    <div className="overflow-hidden bg-white py-24 sm:py-32 container mx-auto">
      <div className="mx-auto  md:px-6 lg:px-8 container">
        {features.map((feature) => (
          <div className="grid grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:grid-cols-2 lg:items-start mb-[8em]">
            <div className="px-6 md:px-0 lg:pr-4 lg:pt-4">
              <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-lg">
                <h2 className="text-base font-semibold leading-7 text-indigo-600">
                  {feature.heading}
                </h2>
                <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {feature.subHeading}
                </p>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  {feature.description}
                </p>
                <div className="mt-10 flex items-center gap-x-6">
                  <a
                    href="#"
                    className="rounded-full bg-indigo-600 px-3.5 w-[200px] text-center py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    {feature.btnText}{" "}
                    <span aria-hidden="true" className="">
                      →
                    </span>
                  </a>
                  {feature.morebtn === true && (
                    <a
                      href="#"
                      className="text-sm font-semibold leading-6 text-primary"
                    >
                      Read more <span aria-hidden="true">→</span>
                    </a>
                  )}
                </div>
              </div>
            </div>
            <div className="sm:px-6 lg:px-0">
              <div className="relative px-6 pt-8 sm:mx-auto sm:max-w-2xl  sm:pl-16 sm:pr-0 sm:pt-16 lg:mx-0 lg:max-w-none">
                <div className="mx-auto max-w-2xl sm:mx-0 sm:max-w-none">
                  <div className="w-screen ">
                    <img src={feature.imageSrc} alt={feature.imageAlt} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCard;
