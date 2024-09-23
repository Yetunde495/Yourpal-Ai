import { Icons } from "../../components/icons";

const Settings = () => {
  return (
    <section>
      <div className="py-6 px-4 md:px-6">
        {/* //personal details? */}
        <div className="py-10 px-5 bg-white rounded-lg mt-10">
          <div className="flex justify-between items-center mb-10">
            <p className="font-bold">Profile</p>
            <div className="flex gap-4 items-center">
              <button className="border-primary border px-4 py-2 text-primary text-sm rounded-full">
                Cancel
              </button>
              <button className="text-white px-4 py-2 rounded-full bg-primary text-sm">
                Save Changes
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full flex gap-x-8">
              <img
                alt=""
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                className="h-24 w-24 flex-none rounded-full bg-gray-800 object-cover"
              />
              <div className="w-full">
                <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5">
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="firstname"
                      className="block text-sm font-medium leading-6"
                    >
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-2">
                      <input
                        id="firstname"
                        name="firstname"
                        type="text"
                        autoComplete="first name"
                        placeholder="First name"
                        className="block w-full rounded-md border border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6 p-2"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="lastname"
                      className="block text-sm font-medium leading-6"
                    >
                      Last Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="lastname"
                        name="lastname"
                        type="text"
                        autoComplete="last name"
                        placeholder="Last name"
                        className="block w-full rounded-md border border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6 p-2"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6"
                    >
                      First Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="Email"
                        className="block w-full rounded-md border border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6 p-2"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium leading-6"
                    >
                      Phone Number
                    </label>
                    <div className="mt-2">
                      <input
                        id="phone"
                        name="phone"
                        type="phone"
                        className="block w-full px-2 rounded-md border border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* //password change? */}
        <div className="py-10 px-5 bg-white rounded-lg mt-10">
          <div className="flex justify-between items-center mb-10">
            <div>
              <p className="font-bold">Change Password</p>
              <p className="text-xs">
                Minimum 8 Characters, Including one Number, 0ne Special
                Characters
              </p>
            </div>

            <button className="text-white px-4 py-2 bg-primary text-sm rounded-full">
              Confirm and change
            </button>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3 ">
              <label
                htmlFor="currentPassword"
                className="block text-sm font-medium leading-6 "
              >
                Current Password
              </label>
              <div className="mt-2">
                <input
                  id="currentPassword"
                  name="currentPassword"
                  type="text"
                  className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3 ">
              <label
                htmlFor="newPassword"
                className="block text-sm font-medium leading-6 "
              >
                New Password
              </label>
              <div className="mt-2">
                <input
                  id="newPassword"
                  name="newPassword"
                  type="text"
                  className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="confrimPassword"
                className="block text-sm font-medium leading-6"
              >
                Confirm Password
              </label>
              <div className="mt-2">
                <input
                  id="confrimPassword"
                  name="confrimPassword"
                  type="text"
                  className="block w-full rounded-md border border-[#D4D4D4] px-2 py-1.5 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
        </div>

        {/* other settings */}
        <div className="py-10 px-5 bg-white rounded-lg mt-10">
          <div className=" mb-10">
            <p className="font-bold ">Other Settings</p>
          </div>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="language"
                className="block text-sm font-medium leading-6 text-white"
              >
                Language
              </label>
              <div className="mt-2">
                <select
                  id="language"
                  name="language"
                  className="block w-full rounded-md border px-2 py-1.5 border-[#D4D4D4] sm:text-sm sm:leading-6 focus-visible:outline-none"
                >
                  <option>English</option>
                  <option>French</option>
                  <option>Latin</option>
                </select>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="notifications"
                className="block text-sm font-medium leading-6 text-white"
              >
                Notifications
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
          </div>

          <div className="py-10 px-8 bg-white rounded-xl mt-10 linkedin-cont">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="flex justify-between items-center  col-span-full">
                <div className="flex items-center gap-1">
                  <Icons.linkedIn className="text-primary" />
                  <p className="font-bold">LinkedIn</p>
                </div>

                <div>
                  <label className="relative inline-flex cursor-pointer items-center">
                    <input
                      id="switch"
                      type="checkbox"
                      className="peer sr-only"
                    />
                    <label htmlFor="switch" className="hidden"></label>
                    <div className="peer h-6 w-11 rounded-full bg-slate-200 after:absolute after:left-[2px] after:top-0.5 after:h-5 after:w-5 after:rounded-full after:border after:border-white after:bg-white after:transition-all after:content-[''] peer-checked:bg-primary peer-checked:after:translate-x-full peer-checked:after:border-white"></div>
                  </label>
                </div>
              </div>
              <div className="col-span-full mb-5">
                <div className="mt-2">
                  <input
                    id="linkedin"
                    name="linkedin"
                    type="href"
                    autoComplete="link"
                    placeholder="https:/..."
                    className="block w-full rounded-md border border-[#D4D4D4] py-1.5 sm:text-sm sm:leading-6 p-2"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="my-10">
            <button className="border border-red-500 px-4 py-2 text-red-500 text-sm rounded-full">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Settings;
