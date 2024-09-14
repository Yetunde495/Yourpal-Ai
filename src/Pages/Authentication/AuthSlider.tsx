import { CardStack } from "../../AnimatedUi/CardStack";
import icon1 from "../../assets/svg/yourpal-icon.svg";
import icon2 from "../../assets/svg/jobseekerpal-icon.svg";
import icon3 from "../../assets/svg/recruiterpal-icon.svg";
import icon4 from "../../assets/svg/socialpal-icon.svg";

const CARDS = [
  {
    id: 0,
    content: (
      <div>
        <img />
      </div>
    ),
  },
  {
    id: 1,
    content: (
      <div className="flex flex-col items-center justify-center w-full">
        <div className="drop-shadow-3 flex items-center justify-center bg-white rounded-lg w-12 h-12 mb-5">
          <img src={icon1} />
        </div>
        <h6 className="font-outfit font-semibold text-2xl mb-3">YourPal Hub</h6>
        <p className="text-center">
          Lorem ipsum dolor sit amet consectetur. Hendrerit ornare mauris
          consectetur lorem iaculis non sit dui. Erat dolor pharetra sapien
          tincidunt vulputate semper tellus sit. Risus sit id volutpat
        </p>
      </div>
    ),
  },
  {
    id: 2,
    content:  <div className="flex flex-col items-center justify-center w-full">
    <div className="drop-shadow-3 flex items-center justify-center bg-white rounded-lg w-12 h-12 mb-5">
      <img src={icon2} />
    </div>
    <h6 className="font-outfit font-semibold text-2xl mb-3">JobSeeker Pal</h6>
    <p className="text-center">
      Lorem ipsum dolor sit amet consectetur. Hendrerit ornare mauris
      consectetur lorem iaculis non sit dui. Erat dolor pharetra sapien
      tincidunt vulputate semper tellus sit. Risus sit id volutpat
    </p>
  </div>,
  },
  {
    id: 3,
    content:  <div className="flex flex-col items-center justify-center w-full">
    <div className="drop-shadow-3 flex items-center justify-center bg-white rounded-lg w-12 h-12 mb-5">
      <img src={icon3} />
    </div>
    <h6 className="font-outfit font-semibold text-2xl mb-3">Recruiter Pal</h6>
    <p className="text-center">
      Lorem ipsum dolor sit amet consectetur. Hendrerit ornare mauris
      consectetur lorem iaculis non sit dui. Erat dolor pharetra sapien
      tincidunt vulputate semper tellus sit. Risus sit id volutpat
    </p>
  </div>,
  },
  {
    id: 4,
    content:  <div className="flex flex-col items-center justify-center w-full">
    <div className="drop-shadow-3 flex items-center justify-center bg-white rounded-lg w-12 h-12 mb-5">
      <img src={icon4} />
    </div>
    <h6 className="font-outfit font-semibold text-2xl mb-3">Social Pal</h6>
    <p className="text-center">
      Lorem ipsum dolor sit amet consectetur. Hendrerit ornare mauris
      consectetur lorem iaculis non sit dui. Erat dolor pharetra sapien
      tincidunt vulputate semper tellus sit. Risus sit id volutpat
    </p>
  </div>,
  },
];

const AuthSlider: React.FC = () => {
  return (
    <div className="">
      <CardStack items={CARDS} />
    </div>
  );
};

export default AuthSlider;
