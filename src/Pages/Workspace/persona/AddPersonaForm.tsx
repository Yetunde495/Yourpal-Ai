import { Link } from "react-router-dom";
import { Icons } from "../../../components/icons";
import DefaultLayout from "../../../layout/DefaultLayout";
import { Textarea } from "../../../components/textarea";

const pages = [{ name: "Add Personas", href: "#", current: true }];

const AddPersonaForm = () => {
  return (
    <DefaultLayout>
      <section className="pb-6 px-4 md:px-6">
        <section className="sm:block py-8">
          <nav aria-label="Breadcrumb" className="flex">
            <ol role="list" className="flex items-center space-x-4">
              <li>
                <div>
                  <a
                    href="/app/workspace/persona"
                    className="text-gray-400 hover:text-gray-500 hover:underline"
                  >
                    <span className="">Personas</span>
                  </a>
                </div>
              </li>
              {pages.map((page) => (
                <li key={page.name}>
                  <div className="flex items-center">
                    <Icons.ChevronRight
                      aria-hidden="true"
                      className="h-5 w-5 flex-shrink-0 text-gray-400"
                    />
                    <a
                      href={page.href}
                      aria-current={page.current ? "page" : undefined}
                      className={`ml-4 text-sm font-medium text-gray-500 hover:text-gray-700 ${
                        page.current ? "cursor-text " : ""
                      }`}
                    >
                      {page.name}
                    </a>
                  </div>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex xl:gap-5 gap-3 items-center relative mb-3 flex-wrap mt-10">
            <div className="">
              <h3 className="font-bold">Add Persona</h3>
            </div>
            <div className="mt-2 flex gap-5 items-center ml-auto">
              <div className="">
                <Link
                  to="/app/workspace/persona/manage-tags"
                  className="underline text-primary"
                >
                  Manage Tag
                </Link>
              </div>
              <div className="ml-auto">
                <button className="rounded-full bg-indigo-600 px-3.5 w-[160px] text-center py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Save Persona
                </button>
              </div>
              <div className="ml-auto">
                <button className="rounded-full border text-indigo-600 border-indigo-600 px-3.5 w-[130px] text-center py-2.5 text-sm font-semibold  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          <div className="py-10 px-5 bg-white rounded-lg mt-10">
            <div className="divide-y divide-primary/5">
              <form className="">
                <div className="flex justify-end">
                  <p className="text-red-500">*Required</p>
                </div>
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="col-span-full flex items-center gap-x-8">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-24 w-24 flex-none rounded-full bg-gray-800 object-cover"
                    />
                    <div className="w-full">
                      <div className="col-span-full">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium leading-6"
                        >
                          Persona Name <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                          <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            placeholder="Ex: John Doe"
                            className="block w-full rounded-md border border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6 p-2"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5">
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="first-name"
                            className="block text-sm font-medium leading-6"
                          >
                            Tag <span className="text-red-500">*</span>
                          </label>
                          <div className="mt-2">
                            <input
                              id="tag"
                              name="tag"
                              type="text"
                              className="block w-full px-2 rounded-md border border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6"
                            />
                          </div>
                        </div>
                        <div className="sm:col-span-3">
                          <label
                            htmlFor="last-name"
                            className="block text-sm font-medium leading-6"
                          >
                            Upload your Resume to Automatically fill up the
                            informations below
                          </label>
                          <div className="mt-2 flex justify-center rounded-lg border border-[#D4D4D4]">
                            <div className="text-center">
                              <div className="py-1.5 flex text-sm leading-6 text-gray-400">
                                <label
                                  htmlFor="file-upload"
                                  className="relative cursor-pointer rounded-md bg-gray-900 font-semibold text-primary"
                                >
                                  <span>Click to Upload</span>
                                  <input
                                    id="file-upload"
                                    name="file-upload"
                                    type="file"
                                    className="sr-only"
                                  />
                                </label>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-full">
                    <hr className="text-[#D4D4D4] my-10" />
                  </div>
                  <div className="sm:col-span-3 ">
                    <label
                      htmlFor="industry"
                      className="block text-sm font-medium leading-6 "
                    >
                      Industry
                    </label>
                    <div className="mt-2">
                      <input
                        id="industry"
                        name="industry"
                        type="text"
                        className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="personality"
                      className="block text-sm font-medium leading-6 "
                    >
                      Tone and Personality
                    </label>
                    <div className="mt-2">
                      <select
                        id="personality"
                        name="personality"
                        className="block w-full rounded-md border border-[#D4D4D4] py-1.5 sm:text-sm focus-visible:outline-none sm:leading-6 [&_*]:text-black"
                      >
                        <option>Pacific Standard Time</option>
                        <option>Eastern Standard Time</option>
                        <option>Greenwich Mean Time</option>
                      </select>
                    </div>
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="keywords"
                      className="block text-sm font-medium leading-6"
                    >
                      Keywords and Phrases
                    </label>
                    <div className="mt-2">
                      <input
                        id="keywords"
                        name="keywords"
                        type="text"
                        className="block w-full rounded-md border border-[#D4D4D4] px-2 py-1.5 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="col-span-full my-10">
                    <hr className="text-[#D4D4D4]" />
                  </div>

                  <div className="col-span-full">
                    <label
                      htmlFor="keywords"
                      className="block text-sm font-medium leading-6"
                    >
                      Background and History
                      <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      placeholder="Write a bullet point or a short summary of this Persona, up to 2000 characters"
                      className="border border-[#D4D4D4] h-50 w-full mb-5"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
      </section>
    </DefaultLayout>
  );
};

export default AddPersonaForm;
