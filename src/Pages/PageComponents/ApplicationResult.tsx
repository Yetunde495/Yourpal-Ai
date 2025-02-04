import { ContentAccordion } from "../../components/Accordion";
import { SkeletonLoader } from "../../components/Loader";

const ApplicationResult: React.FC = () => {
  return (
    <section>
      <div className="xl:flex xl:space-x-4 xl:space-y-0 space-y-6 custom-scrollbar overflow-y-auto max-h-[500px]">
        <ContentAccordion
          title={
            <div className="w-full flex items-center gap-3">
              <h6 className="font-outfit text-lg font-medium">
                Job Specific Cover Letter
              </h6>
            </div>
          }
        >
          <SkeletonLoader
            style={{ height: "400px", width: "100%", borderRadius: "8px" }}
          />
        </ContentAccordion>
        <ContentAccordion
          title={
            <div className="w-full flex items-center gap-3">
              <h6 className="font-outfit text-lg font-medium">
                Job Specific Resume
              </h6>
            </div>
          }
        >
          <SkeletonLoader
            style={{ height: "400px", width: "100%", borderRadius: "8px" }}
          />
        </ContentAccordion>
        <ContentAccordion
          title={
            <div className="w-full flex items-center gap-3">
              <h6 className="font-outfit text-lg font-medium">
                Job Specific Resume
              </h6>
            </div>
          }
        >
          <SkeletonLoader
            style={{ height: "400px", width: "100%", borderRadius: "8px" }}
          />
        </ContentAccordion>
        <ContentAccordion
          title={
            <div className="w-full flex items-center gap-3">
              <h6 className="font-outfit text-lg font-medium">
                Job Specific Resume
              </h6>
            </div>
          }
        >
          <SkeletonLoader
            style={{ height: "400px", width: "100%", borderRadius: "8px" }}
          />
        </ContentAccordion>
      </div>
    </section>
  );
};

export default ApplicationResult;
