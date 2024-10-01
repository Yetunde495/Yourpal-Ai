const BrandingForm = () => {
  return (
    <div className="w-full p-5 my-5 bg-white">
      <form>
        <div className="grid grid-cols-1 sm:grid-cols-6">
          <div className="col-span-full flex items-center border border-[#A3A6A9]">
            <label
              htmlFor="currentPassword"
              className="block text-sm sm:leading-6 w-[30%] pl-2"
            >
              Candidate Name:
            </label>
            <div className="w-full">
              <input
                id="currentPassword"
                name="currentPassword"
                type="text"
                className="block w-full border-l px-2 py-1.5 border-[#A3A6A9] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full flex items-center border-x  border-[#A3A6A9]">
            <label
              htmlFor="currentPassword"
              className="block text-sm sm:leading-6 w-[30%] pl-2"
            >
              Last Employer:
            </label>
            <div className="w-full">
              <input
                id="currentPassword"
                name="currentPassword"
                type="text"
                className="block w-full border-l px-2 py-1.5 border-[#A3A6A9] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full flex items-center border border-[#A3A6A9]">
            <label
              htmlFor="currentPassword"
              className="block text-sm sm:leading-6 w-[30%] pl-2"
            >
              Position:
            </label>
            <div className="w-full">
              <input
                id="currentPassword"
                name="currentPassword"
                type="text"
                className="block w-full border-l px-2 py-1.5 border-[#A3A6A9] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full flex items-center border-x  border-[#A3A6A9]">
            <label
              htmlFor="currentPassword"
              className="block text-sm sm:leading-6 w-[30%] pl-2"
            >
              Location:
            </label>
            <div className="w-full">
              <input
                id="currentPassword"
                name="currentPassword"
                type="text"
                className="block w-full border-l px-2 py-1.5 border-[#A3A6A9] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full flex items-center border border-[#A3A6A9]">
            <label
              htmlFor="currentPassword"
              className="block text-sm sm:leading-6 w-[30%] pl-2"
            >
              Nationality:
            </label>
            <div className="w-full">
              <input
                id="currentPassword"
                name="currentPassword"
                type="text"
                className="block w-full border-l px-2 py-1.5 border-[#A3A6A9] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full flex items-center border-x  border-[#A3A6A9]">
            <label
              htmlFor="currentPassword"
              className="block text-sm sm:leading-6 w-[30%] pl-2"
            >
              Expected Salary:
            </label>
            <div className="w-full">
              <input
                id="currentPassword"
                name="currentPassword"
                type="text"
                className="block w-full border-l px-2 py-1.5 border-[#A3A6A9] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full flex items-center border border-[#A3A6A9]">
            <label
              htmlFor="currentPassword"
              className="block text-sm sm:leading-6 w-[30%] pl-2"
            >
              Notice Period:
            </label>
            <div className="w-full">
              <input
                id="currentPassword"
                name="currentPassword"
                type="text"
                className="block w-full border-l px-2 py-1.5 border-[#A3A6A9] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full flex items-center border-x  border-[#A3A6A9]">
            <label
              htmlFor="currentPassword"
              className="block text-sm sm:leading-6 w-[30%] pl-2"
            >
              Reason for Leaving:
            </label>
            <div className="w-full">
              <input
                id="currentPassword"
                name="currentPassword"
                type="text"
                className="block w-full border-l px-2 py-1.5 border-[#A3A6A9] sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="col-span-full flex border border-[#A3A6A9]">
            <label
              htmlFor="currentPassword"
              className="block text-sm sm:leading-6 w-[30%] pl-2"
            >
              The Resolute Group Comment:
            </label>
            <div className="w-full">
              <textarea
                id="currentPassword"
                name="currentPassword"
                className="block w-full h-[150px] border-l px-2 py-1.5 border-[#A3A6A9] sm:text-sm sm:leading-6"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BrandingForm;
