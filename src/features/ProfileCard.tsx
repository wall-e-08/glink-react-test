import {HeartPulse, Star, EllipsisVertical, TrendingUp} from "lucide-react";
import type {LucideIcon} from "lucide-react";
import profileBg from "@/assets/profile-bg.jpg";
import profileImg from "@/assets/doc1.jpg";
import RoundedDiv from "@/components/RoundedDiv";
import {Button} from "@/components/shadcn/button";


type SuccessBadgeProps = {
  label: string;
  Icon: LucideIcon;
  count: string | number;
  trending: string | number;
};

const SuccessBadge = ({label, Icon, count, trending}: SuccessBadgeProps) => (
  <div className="bg-gray-100/50 rounded-xl p-4">
    <div className="flex items-center gap-2 text-gray-400">
      <Icon className="w-4 h-4"/>
      {label}
    </div>
    <div className="text-xl font-bold text-gray-800">{count}</div>
    <div className="flex items-center gap-2 text-green-500 text-xs">
      <TrendingUp size={10}/>
      <span>{trending}</span>
    </div>
  </div>
);

type EducationProps = {
  institution: string;
  degree: string;
  specialization: string;
  duration: string;
}

const Education = ({institution, degree, specialization, duration}: EducationProps) => (
  <div className="bg-gray-100 rounded-xl p-4 flex items-start gap-3 mb-4">
    <div className="w-6 h-6 rounded-md bg-gradient-to-r from-blue-400 to-indigo-500"/>
    <div className="text-sm text-gray-700">
      <div className="font-medium text-base text-gray-900">{institution}</div>
      <div>{degree}</div>
      <div className="text-gray-500">{specialization}</div>
      <div className="text-xs text-gray-400 mt-1">{duration}</div>
    </div>
  </div>
)

function ProfileCard() {
  return (
    <>
      <RoundedDiv className="mb-3">
        <div className="relative">
          <img src={profileBg} alt="Background" className="w-full h-48 object-cover"/>
          <div className="absolute -bottom-12 left-1/2 transform -translate-x-1/2">
            <img
              src={profileImg}
              alt="Doctor"
              className="w-24 h-24 rounded-full border-4 border-white object-cover"
            />
          </div>
        </div>
        <div className="pt-16 px-6 text-center">
          <h2 className="text-xl font-semibold text-gray-800">Dr. Emily Carter</h2>
          <div className="flex justify-center gap-2 text-sm mt-1 text-gray-500">
            <span className="bg-pills-bg text-sky-500/50 px-2 py-0.5 rounded-md">Cardiologist</span>
            <span className="bg-pills-bg text-sky-500/50 px-2 py-0.5 rounded-md">29, Spain</span>
          </div>
          <p className="mt-2 text-gray-600">
            Experienced and compassionate doctor specializing in cardiology
          </p>

          <div className="flex justify-center mt-4 text-gray-600 text-sm">
            <div className="pr-4 border-r border-black">
              Peers
              <div className="font-bold text-lg text-gray-800">232</div>
            </div>
            <div className="pl-4">
              Following
              <div className="font-bold text-lg text-gray-800">124</div>
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-4">
            <Button>
              View Profile
            </Button>
            <Button variant="outline" className="text-gray-500">Resume</Button>
            <Button variant="outline" className="text-gray-500 px-[6px]">
              <EllipsisVertical/>
            </Button>
          </div>
        </div>
      </RoundedDiv>
      <RoundedDiv>
        <div className="grid grid-cols-2 gap-4 mt-6 px-6 py-4 text-sm">
          <SuccessBadge
            label="Patient Served"
            Icon={HeartPulse}
            count="1000"
            trending="+20"
          />
          <SuccessBadge
            label="Success rate"
            Icon={Star}
            count="95%"
            trending="+5%"
          />
        </div>

        <div className="px-6 pb-4">
          <h3 className="font-semibold text-gray-800 mt-4">About</h3>
          <p className="text-gray-600 text-sm mt-1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam lectus risus, finibus
            ornare vestibulum et, feugiat quis dui. Vivamus sit amet dolor.
          </p>

          <div className="pb-6">
            <h3 className="font-semibold text-gray-800 mt-4 mb-2">Education</h3>
            <Education
              institution="Harvard Medical University"
              degree="Cardiology Degree"
              specialization="Specialization in Heart Health"
              duration="Sep 2015 - Jun 2020"
            />
            <Education
              institution="Stanford University"
              degree="Master's in Cardiology"
              specialization="Advanced Cardiac Care"
              duration="Sep 2020 - Jun 2022"
            />
          </div>
        </div>
      </RoundedDiv>
    </>
  );
}

export default ProfileCard;