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
import Delete from "../../components/modal/Delete";
import { UploadUserPhoto } from "../Authentication/uploadProfilephoto";
import { useApp } from "../../context/AppContext";
import { FiUpload } from "react-icons/fi";

const EditPersona: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useApp();
  const methods = useForm<any>();
  const [isLoading, setIsLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [_url, setUrl] = useState("");

  const [_isSuccess, setIsSuccess] = useState<boolean>(false);
  const [personaData, _setPersonaData] = useState<any>({
    name: "John Doe",
    industry: 'Tech',
    tone: 'Analytical',
    tag: "Job Seeker",
    content: `Lorem ipsum dolor sit amet consectetur. In et mi laoreet dapibus diam. Eu dis nisi orci sed vitae imperdiet. Viverra ut felis accumsan nulla quis vitae leo. Morbi nunc at nunc donec. Adipiscing aenean velit quis eget tincidunt massa enim eget mauris. Eget a sed porttitor suspendisse ullamcorper massa proin posuere feugiat.

Scelerisque porta vestibulum consectetur cras dolor quis. Sed pellentesque dui tempor vel sem amet neque turpis. Ipsum nec non dolor vulputate lacinia massa. Id enim feugiat tristique adipiscing. Sagittis dignissim nulla neque pharetra condimentum. Amet pellentesque egestas velit augue nam viverra turpis viverra. Montes ut dolor urna dis. Bibendum nunc aliquet diam et sed ullamcorper morbi. Ut vulputate volutpat imperdiet tincidunt.
    `,
  });

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
          pageName="Edit Persona"
          homeRoute="/app/persona"
          homeRouteName="Personas"
        />

        <div className="w-full">
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)} className="">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-xl lg:text-2xl font-semibold dark:text-slate-200">
                  Edit Persona
                </h1>
                <div className="flex gap-3 items-center">
                  <Button
                    type="button"
                    variant="link"
                    rounded
                    onClick={() => navigate(`/app/persona/manage-tags`)}
                  >
                    Manage Tags
                  </Button>
                  <Button
                    type="submit"
                    rounded
                    onClick={() => {}}
                    disabled={isLoading}
                  >
                    {isLoading ? "Saving Template" : "Update Persona"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline-primary"
                    rounded
                    onClick={() => {
                      setDeleteModal(true);
                    }}
                  >
                    Delete Persona
                  </Button>
                </div>
              </div>
              <div className="grid gap-7.5 bg-white md:px-4 px-2 lg:px-8 py-12">
                <div className="flex justify-end">
                  <p className="text-red-500">*Required</p>
                </div>

                <div className="col-span-full flex items-start gap-x-8">
                  <UploadUserPhoto user={user} setUrl={setUrl} />
                  <div className="w-full">
                    <div className="col-span-full">
                      <AutoInput
                        label="Persona Name"
                        name="name"
                        placeholder="Ex: John Doe"
                        isRequired
                        defaultValue={personaData?.name}
                        rules={{
                          required: "This field is required",
                        }}
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 mt-5">
                      <div className="sm:col-span-2">
                        <Select
                          label="Tag"
                          name="tag"
                          isRequired
                          defaultValue={personaData?.tag}
                          rules={{ required: "This field is required" }}
                        >
                          <option value={personaData?.tag || ""}>
                            {personaData?.tag || "Select..."}
                          </option>
                          <option>Job Seeker</option>
                          <option>Recruiter</option>
                        </Select>
                      </div>
                      <div className="sm:col-span-4">
                        <label
                          htmlFor="last-name"
                          className="block mb-[0.4rem]"
                        >
                          Upload your Resume to Automatically fill up the
                          informations below
                        </label>
                        <div className="mt-2 flex justify-center rounded-full border border-primary cursor-pointer bg-primary/15">
                          <div className="text-center">
                            <div className="py-2.5 flex leading-6">
                              <label
                                htmlFor="file-upload"
                                className="relative cursor-pointer flex items-center justify-center gap-2  font-semibold text-primary"
                              >
                                <span><FiUpload /></span>
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
                  <hr className="text-[#D4D4D4] my-6" />
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  <AutoInput
                    label="Industry"
                    name="industry"
                    placeholder="Ex: Tech"
                    defaultValue={personaData?.industry}
                    rules={{
                      required: false,
                    }}
                  />
                  <Select
                    label="Tone and Personality"
                    name="tone"
                    defaultValue={personaData?.tag}
                    rules={{ required: false }}
                  >
                    <option value={personaData?.tone || ""}>
                      {personaData?.tone || "Select..."}
                    </option>
                    <option>Analytical</option>
                    <option>Engaging</option>
                  </Select>
                </div>

                <div>
                  <AutoInput
                    label="Keywords and Phrases"
                    name="keywords"
                    placeholder="Ex: Fast Growing, Hardworking"
                    isRequired
                    defaultValue={personaData?.keywords}
                    rules={{
                      required: false,
                    }}
                  />
                </div>

                <Textarea
                  label="Background and History"
                  name="content"
                  isRequired
                  defaultValue={personaData?.content}
                  placeholder="Type your content here"
                  rules={{ required: false }}
                  props={{ maxLength: 2000, row: 6 }}
                />
              </div>
            </form>
          </FormProvider>
        </div>
        <Delete
          show={deleteModal}
          onHide={() => {
            setDeleteModal(false);
          }}
          title={`Delete Persona?`}
          desc="Are you sure you want to delete this persona? This action is irreversible"
          //  size="w-full max-w-[300px]"
          onProceed={() => {}}
          isLoading={false}
          isLoadingText="Deleting..."
        />
      </section>
    </DefaultLayout>
  );
};

export default EditPersona;
