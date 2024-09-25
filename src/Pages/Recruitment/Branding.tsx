import BrandingForm from "./BrandingForm";
import InterviewQuestions from "./InterviewQuestions";
import PDFViewerLayout from "./PDFViewerLayout";
import "./style.css";
import { Icons } from "../../components/icons";
import { AccordionItem } from "./AccordionItem";

const Branding = () => {
  return (
    <PDFViewerLayout form={<BrandingForm />} questions={<InterviewQuestions />}>
      <div className="mt-10 border border-[#D4D4D4] py-5 rounded-xl w-[30%]">
        <div className="divide-y divide-solid divide-[#D4D4D4]">
          <div className="flex items-center gap-2 px-4 pb-1">
            <h4>Branding</h4>
            <div>
              <label className="relative inline-flex cursor-pointer items-center">
                <input id="switch" type="checkbox" className="peer sr-only" />
                <label htmlFor="switch" className="hidden"></label>
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#8343CC] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
          <div className="flex items-center gap-2 px-4 pb-1">
            <h4 className="mt-5 text-sm">Company Logo</h4>
            <div className="mt-5">
              <label className="relative inline-flex cursor-pointer items-center">
                <input id="switch" type="checkbox" className="peer sr-only" />
                <label htmlFor="switch" className="hidden"></label>
                <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#8343CC] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
              </label>
            </div>
          </div>
        </div>

        <div className="bg-[#8343CC] rounded-full text-white text-sm py-2 w-[90%] mx-auto">
          <label
            htmlFor="fileUpload"
            className=" flex gap-2 items-center justify-center "
          >
            <Icons.download /> Upload Logo
          </label>
          <input type="file" id="fileUpload" className="hidden" />
        </div>
        <div className="w-[90%] mx-auto mt-5">
          <label
            htmlFor="notifications"
            className="block text-sm font-medium leading-6 "
          >
            Logo Alignment
          </label>
          <div className="mt-2">
            <select
              id="notifications"
              name="notifications"
              className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6 focus-visible:outline-none"
            >
              <option>On</option>
              <option>Off</option>
            </select>
          </div>
        </div>

        <AccordionItem header="Company Branded Color">
          <div>
            <div>
              <h4 className="mt-5 text-sm">Primary Color</h4>
              <div className="border border-[#D4D4D4] py-2 rounded-md flex items-center gap-3 px-2 mt-2">
                <Icons.circle className="text-white border-[#D4D4D4] border rounded-full" />
                <p> #FFFFFF</p>
              </div>
            </div>

            <div>
              <h4 className="mt-5 text-sm">Secondary Color</h4>
              <div className="border border-[#D4D4D4] py-2 rounded-md flex items-center gap-3 px-2 mt-2">
                <Icons.circle className="text-[#8343cc] border-[#D4D4D4] border rounded-full" />
                <p> #8343cc</p>
              </div>
            </div>
          </div>
        </AccordionItem>
        <AccordionItem header="Watermark">
          <div className="mt-5">
            <label
              htmlFor="notifications"
              className="block text-sm font-medium leading-6 "
            >
              Watermark Type
            </label>
            <div className="mt-2">
              <select
                id="notifications"
                name="notifications"
                className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6 focus-visible:outline-none"
              >
                <option>On</option>
                <option>Off</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="notifications"
              className="block text-sm font-medium leading-6 "
            >
              Alignment
            </label>
            <div className="mt-2">
              <select
                id="notifications"
                name="notifications"
                className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6 focus-visible:outline-none"
              >
                <option>On</option>
                <option>Off</option>
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label
              htmlFor="notifications"
              className="block text-sm font-medium leading-6 "
            >
              Size
            </label>
            <div className="mt-2">
              <select
                id="notifications"
                name="notifications"
                className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6 focus-visible:outline-none"
              >
                <option>On</option>
                <option>Off</option>
              </select>
            </div>
          </div>
        </AccordionItem>

        <AccordionItem header="Company Socials">
          <div>
            <div className="mt-5">
              <label
                htmlFor="notifications"
                className="block text-sm font-medium leading-6 "
              >
                Alignment
              </label>
              <div className="mt-2">
                <select
                  id="notifications"
                  name="notifications"
                  className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6 focus-visible:outline-none"
                >
                  <option>On</option>
                  <option>Off</option>
                </select>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mt-5">
                <div className="mt-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      id="switch"
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <label htmlFor="switch" className="hidden"></label>
                    <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#8343CC] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
                <h4 className="text-sm ">LinkedIn</h4>
              </div>
              <div className="mt-2">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="text"
                  className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mt-5">
                <div className="mt-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      id="switch"
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <label htmlFor="switch" className="hidden"></label>
                    <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#8343CC] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
                <h4 className="text-sm ">Facebook</h4>
              </div>
              <div className="mt-2">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="text"
                  className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2 mt-5">
                <div className="mt-2">
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      id="switch"
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <label htmlFor="switch" className="hidden"></label>
                    <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-[#8343CC] peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
                <h4 className="text-sm ">Website</h4>
              </div>
              <div className="mt-2">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="text"
                  className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 mt-5">
              <div className=" border border-md border-[#8343CC] text-[#8343CC] bg-[#f3edfa] p-1 rounded-md">
                <Icons.add />
              </div>
              <h4 className="text-sm ">Add Custom Socials</h4>
            </div>
          </div>
        </AccordionItem>
      </div>
    </PDFViewerLayout>
  );
};

export default Branding;
