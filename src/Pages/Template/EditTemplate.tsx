import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb";
import Button from "../../components/button";
import DefaultLayout from "../../layout/DefaultLayout";
import { FormProvider, useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "react-toastify";
import { AutoInput } from "../../components/form/customInput";
import Select from "../../components/form/customSelect";
import { Textarea } from "../../components/form";

const EditTemplate: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [_isSuccess, setIsSuccess] = useState<boolean>(false);
  const [templateData, _setTemplateData] = useState({
    name: 'Test',
    tag: 'Job Seeker',
    content: `Test template content
    Test a new line
    `
  })

  const onSubmit = async (data: any) => {
    const { errors } = methods.formState;

    // Check if there are any validation errors
    if (Object.keys(errors).length > 0) {
      console.log("Validation errors:", errors);
      return;
    }

    try {
      setIsLoading(true);
      console.log(data);
      setIsSuccess(true);
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="px-4 py-4 md:py-6 md:px-6">
        <Breadcrumb
          pageName="Edit Template"
          homeRoute="/app/templates"
          homeRouteName="Templates"
        />

        <div className="w-full">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl lg:text-2xl font-semibold dark:text-slate-200">
                  Update Template
                </h1>
                <div className="flex gap-3 items-center">
                  <Button type="button" variant="link" rounded onClick={() => navigate(`/app/persona/manage-tags`)}>
                    Manage Tags
                  </Button>
                  <Button type="submit" rounded onClick={() => {}} disabled={isLoading}>
                    {isLoading ? 'Saving Template' : 'Save Template'}
                  </Button>
                  <Button type="button" variant="outline-primary" rounded onClick={() => {
                    navigate(-1)
                  }}>
                    Cancel
                  </Button>
                </div>
              </div>
              <div className="grid gap-6 bg-white px-4 py-12">
                <AutoInput
                  label="Template Name"
                  name="name"
                  placeholder="Enter a name for this template"
                  isRequired
                  defaultValue={templateData?.name}
                  rules={{
                    required: "This field is required",
                  }}
                />
                <div>
                  <Select
                    label="Tag"
                    name="tag"
                    isRequired
                    defaultValue={templateData?.tag}
                    rules={{ required: "This field is required" }}
                  >
                    <option value={templateData?.tag || ''}>{templateData?.tag || 'Select...'}</option>
                    <option>Job Seeker</option>
                    <option>Recruiter</option>
                  </Select>
                </div>

                <Textarea
                 label="Template Content"
                 name="content"
                 isRequired
                 defaultValue={templateData?.content}
                 placeholder="Type your content here"
                 rules={{required: 'This field is required'}}
                 props={{maxLength: 3000, row: 6, copy: true}}
                />
              </div>
            </form>
          </FormProvider>
        </div>
      </section>
    </DefaultLayout>
  );
};

export default EditTemplate;