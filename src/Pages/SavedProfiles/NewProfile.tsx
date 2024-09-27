import { useState } from "react";
import Button from "../../components/button";
import FieldInput from "../../components/form/Input";
import Modal from "../../components/modal";

const AddNewProfile: React.FC<{
  show: boolean;
  onClose: () => void;
}> = ({ show, onClose }) => {
    const [url, setUrl] = useState("");
  return (
    <div className="">
      <Modal
        show={show}
        onHide={onClose}
        props={{ roundedMd: true }}
        size="w-full lg:max-w-[600px]"
      >
          <div className="mb-6 text-center">
            <h1 className="font-outfit font-medium text-[30px]">
              Add New Profile
            </h1>
            <p className="font-medium">
              Paste the LinkedIn Profile URL you want to save in your Saved
              Profile section Here
            </p>
          </div>

          <div className="mb-9">
            <FieldInput
              label="Linkedin Profile URL"
              placeholder="Enter or Paste Link here"
              value={url}
              onChange={(val) => setUrl(val)}
              id="url"
            />
          </div>

          <div className="flex gap-3 justify-center items-center">
            <Button variant="outline-primary" rounded onClick={onClose}>
              Cancel
            </Button>
            <Button rounded onClick={() => {}}>
              Save Profile
            </Button>
          </div>
      </Modal>
    </div>
  );
};

export default AddNewProfile;
