import { useState } from "react";
import FieldInput from "../../components/form/Input";
import DefaultLayout from "../../layout/DefaultLayout";
import Button from "../../components/button";
import { FaArrowRightLong } from "react-icons/fa6";
import Img1 from "../../assets/images/optimize-1.png";
import Img2 from "../../assets/images/optimize-2.png";
import Img3 from "../../assets/images/optimize-3.png";
import Img4 from "../../assets/images/optimize-4.png";
import bgImg from "../../assets/social.png";

import defaultPfp from "../../assets/images/default-pfp.png";
import { ContentAccordion } from "../../components/Accordion";
import { RiRobot2Fill } from "react-icons/ri";
import { HiUser } from "react-icons/hi";
import ReadMoreComponent from "../../components/ReadMore";

const LinkedinOptimization: React.FC = () => {
  const [linkedinURL, setURL] = useState("");
  const [resultView, _setResultView] = useState(false);
  return (
    <DefaultLayout>
      <section className="py-6 px-1 md:px-6">
        {!resultView ? (
          <div>
            <div className="bg-white rounded-sm px-1 py-4 md:px-4 lg:px-8 lg:pt-10">
              <div className="text-center text-[#5B5B5B]">
                <h1 className="font-outfit font-bold text-black/90 text-[32px] mb-2">
                  Let Us <span className="text-primary-2">Optimize</span> Your
                  LinkedIn <span className="text-primary-2">Profile</span>
                </h1>
                <p>
                  Simply choose to continue with your Linked profile for
                  in-depth access of your information or enter the username or
                  URL of your profile below in order to scrape the public
                  information that’s displayed on your LinkedIn and using that
                  information to provide suggestions on how to improve using AI{" "}
                </p>
              </div>

              <div className="w-full flex flex-col justify-center items-center gap-y-5 py-12">
                <div className="md:w-[70%] flex flex-col gap-y-7">
                  <Button rounded onClick={() => {}} width="full" size="lg">
                    Continue with Linkedin Profile
                  </Button>

                  <div className="flex items-center mt-1 w-full">
                    <hr className="border-t-2  w-[80%] border-zinc-300" />
                    <span className="mx-2 text-lg text-center rounded-md py-1 px-2">
                      Or
                    </span>
                    <hr className="border-t-2  w-[80%] border-zinc-300" />
                  </div>

                  <FieldInput
                    label="Linkedin URL"
                    value={linkedinURL}
                    onChange={(val: string) => setURL(val)}
                    placeholder="Enter your Linkedin URL"
                    id="url"
                  />

                  <Button rounded onClick={() => {}} variant="link" size="lg">
                    Submit and Continue <FaArrowRightLong />
                  </Button>
                </div>
              </div>
            </div>

            <div className="py-12">
              <h4 className="text-xl font-semibold mb-7.5 text-center font-outfit">
                How it Works
              </h4>
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-x-5 gap-y-8 text-sm md:px-0 px-4">
                <div className="bg-white shadow-3 hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl py-3 px-4 flex flex-col gap-2 justify-center items-center">
                  <img src={Img1} alt="" className="" />
                  <h6 className="text-xl font-semibold  font-outfit">
                    Step 1 - Find Account
                  </h6>
                  <p>
                    Enter your LinkedIn username or direct url so we have a way
                    to find your account through our system or continue with
                    your Linked profile
                    <br /> <br />
                    If your LinkedIn profile is not internally Linked, Only
                    public information displayed on your profile will be
                    accessible.
                  </p>
                </div>

                <div className="bg-white shadow-3 hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl py-3 px-4 flex flex-col gap-2 justify-center items-center">
                  <img src={Img2} alt="" className="" />
                  <h6 className="text-xl font-semibold font-outfit">
                    Step 2 - Wait Seconds
                  </h6>
                  <p>
                    We'll retrieve your information and then run it through our
                    algorithm to create suggestions. You don't have to do
                    anything at this time and the whole process only takes
                    seconds to complete
                    <br /> <br />
                    Provided options to retry and edit our ideas, you'll get the
                    best profile available{" "}
                  </p>
                </div>

                <div className="bg-white shadow-3 hover:scale-105 transition-transform duration-500 ease-in-out rounded-xl py-3 px-4 flex flex-col gap-2 justify-center items-center">
                  <img src={Img3} alt="" className="" />
                  <h6 className="text-xl font-semibold font-outfit">
                    Step 3 - Review
                  </h6>
                  <p>
                    Recieve and overlook the suggested changes for how you can
                    better your linkedin profile
                    <br /> <br />
                    Provided options to retry and edit our ideas, you'll get the
                    best profile available
                    <br /> <br />
                    Provided options to retry and edit our ideas, you'll get the
                    best profile available
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div>
            <OptimizationView />
          </div>
        )}
      </section>
    </DefaultLayout>
  );
};

const OptimizationView: React.FC = () => {
  const [defaultData, _setDefaultdata] = useState<any>({
    logoUrl: "",
    name: "Helen Cooper",
    services: ["Project Management", "Product Development"],
    skills: [
      {
        name: "HTML",
        experience: "Web Developer at ProderInc",
        projects: ["Thrifty", "Weathers"],
      },
      {
        name: "Figma",
        experience: null,
        projects: [],
      },
    ],
    projects: [
      {
        name: "Thrifty",
        description: ``,
        skills: ["React.js", "Figma"],
        start_date: "",
        end_date: "",
      },
    ],
    experience: [],
    headline: "Project Manager, UI/UX Designer",
    bio: `I am a highly motivated and committed Project developer.
     also an experienced Freelance writer with a demonstrated history of working in the writing and editing industry. She majors in Technical, social, product-based, and academical articles, and has written over 100 articles in these mentioned niches.

She is currently seeking job opportunities to expand skills, and gain valuable real-world experience, while commiting to the organization's vision and goals
    `,
  });
  return (
    <div>
      <div className="xl:flex xl:space-x-4 xl:space-y-0 space-y-6">
        <ContentAccordion
          title={
            <div className="w-full flex items-center gap-3">
              <span className="h-8 w-8 flex items-center rounded-full justify-center text-slate-50 bg-primary">
                <HiUser />
              </span>
              <h6 className="font-outfit text-lg font-medium">
                Current Profile
              </h6>
              <p className="text-sm text-[#5B5B5B]">
                this is your profile before any changes
              </p>
            </div>
          }
        >
          <div className="px-2 bg-slate-100 space-y-4">
            <div className="bg-white rounded-lg">
              <div
                className="bg-center bg-black/5 bg-blend-overlay bg-cover rounded-t-lg bg-no-repeat h-36 w-ful relative"
                style={{
                  backgroundImage: `url(${bgImg})`,
                }}
              >
                <div className="h-22 w-22 absolute left-3 -bottom-8 rounded-full border-4 border-white">
                  <img
                    className="w-full object-cover"
                    src={defaultData?.logoUrl || defaultPfp}
                    alt=""
                  />
                </div>
              </div>

              <div className="mt-7.5 px-4 pb-4">
                <h2 className="font-medium font-outfit text-2xl">
                  {defaultData?.name}
                </h2>
                <h6 className="mb-5 -mt-1 text-zinc-500">
                  {defaultData?.headline}
                </h6>
              </div>
            </div>

            <div className="py-4 bg-white rounded-lg px-3">
              <h1 className="font-outfit text-xl font-medium mb-4">About</h1>
              <ReadMoreComponent text={defaultData?.bio} />
            </div>

            {defaultData?.services && defaultData?.services?.length && <div className="py-4 bg-white rounded-lg px-3">
              <h1 className="font-outfit text-xl font-medium mb-4">Services</h1>
              <ul role="list" className="flex gap-6 ">
                {defaultData?.services.map((val: string, index: number) => (
                  <li key={index} className="first:list-none list-disc">{val}</li>
                ))}
              </ul>
            </div>}

            {defaultData?.services && defaultData?.services?.length && <div className="py-4 bg-white rounded-lg px-3">
              <h1 className="font-outfit text-xl font-medium mb-4">Skills</h1>
               
              <ul role="list" className="space-y-4 list-none">
                {defaultData?.services.map((_val: any, index: number) => (
                  <li key={index} className="">
                    
                  </li>
                ))}
              </ul>
            </div>}

            <div className="py-4 bg-white rounded-lg px-3">
              <h1 className="font-outfit text-xl font-medium mb-4">
                Experience
              </h1>
              <ReadMoreComponent text={defaultData?.bio} />
            </div>
          </div>
        </ContentAccordion>

        <ContentAccordion
          title={
            <div className="w-full flex items-center gap-3">
              <span className="h-8 w-8 flex items-center rounded-full justify-center text-slate-50 bg-primary">
                <RiRobot2Fill />
              </span>
              <h6 className="font-outfit text-lg font-medium">AI Suggestion</h6>
              <p className="text-sm text-[#5B5B5B]">
                these are our recommended changes
              </p>
            </div>
          }
        >
          <div className="bg-white py-4 px-2">
            <div className="transition-transform duration-500 text-center ease-in-out rounded-xl py-3 px-4 flex flex-col gap-2 justify-center items-center">
              <h6 className="text-3xl font-semibold  font-outfit">
                Creating Suggested Improvements
              </h6>
              <p>
                We are running your profile through our enhancement algorithm
              </p>
              <img src={Img4} alt="" className="animate-pulse" />
            </div>
          </div>
        </ContentAccordion>
      </div>
    </div>
  );
};

export default LinkedinOptimization;
