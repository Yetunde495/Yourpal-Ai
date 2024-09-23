import React, { Fragment } from "react";
import Drawer from "../../components/Drawer";
import { formatDate } from "../../lib/utils/formatters";

const ApplicationInfo: React.FC<{
  resumeData: any;
  show: boolean;
  setShow: () => void;
}> = ({ resumeData, show, setShow }) => {
  return (
    <Fragment>
      <Drawer
        isOpen={show}
        onClose={() => {
          setShow();
        }}
        width="400px"
        title="Application Info"
      >
        <div className=" dark:text-white mb-7.5 px-2">
          <label className="mb-1 block text-black dark:text-white">
            Summary:
          </label>
          <p className="w-full text-slate-800 text-sm">
            {resumeData?.summary}
          </p>
        </div>

      

        <h4 className="px-2">Keywords:</h4>
        <div className="flex flex-col space-y-6 mb-7.5 px-2">
            <div className="flex flex-wrap gap-2 mt-2">
              {resumeData?.tags?.map((val: string, index: number) => (
                <div
                  key={index}
                  className="flex items-center text-sm bg-stone-100 dark:bg-black dark:text-white rounded-md py-1 px-3 mr-2"
                >
                  <span>{val}</span>
                </div>
              ))}
            </div>
        </div>

        <div className=" dark:text-white mb-7.5 px-2">
          <label className="mb-1 block text-black dark:text-white">
            Company Name:
          </label>
          <p className="w-full text-slate-800 text-sm">
            {resumeData?.job_title || 'Unspecified'}
          </p>
        </div>

        <div className=" dark:text-white mb-7.5 px-2">
          <label className="mb-1 block text-black dark:text-white">
            Date Created:
          </label>
          <p className="w-full text-slate-800 text-sm">
            {formatDate(resumeData?.created_at)}
          </p>
        </div>

        <div className=" dark:text-white mb-7.5 px-2">
          <label className="mb-1 block text-black dark:text-white">
            Last Modified:
          </label>
          <p className="w-full text-slate-800 text-sm">
            {formatDate(resumeData?.last_updated)}
          </p>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default ApplicationInfo;
