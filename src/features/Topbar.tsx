import {useState} from 'react';
import RoundedDiv from "@/components/RoundedDiv";
import {Switch} from "@/components/shadcn/switch";
import {Label} from "@/components/shadcn/label";
import docImg1 from "@/assets/doc1.jpg";
import {Button} from "@/components/shadcn/button";
import InlineInfo from "../components/InlineInfo";

const Topbar = (props) => {
  const [state, setState] = useState()

  return (
    <div className="flex flex-row gap-4 mb-4">
      <RoundedDiv className="flex-1 flex justify-between items-center">
        <div>
          <div className="flex flex-row items-center gap-3">
            <img src={docImg1} alt="Profile" className="w-13 inline-block rounded-full"/>
            <div>
              <h3 className="mb-1 text-black font-bold">Emily Carter</h3>
              <p className="text-gray-500 text-xs">Cardiologist at NHOG</p>
            </div>
          </div>
        </div>
        <div className="flex-and-center flex-col">
          <div className="flex-and-center flex-row gap-2 mb-1">
            <InlineInfo label="My Peers" value={232}/>
            <InlineInfo label="Following" value={124}/>
          </div>
          <Button className="font-normal text-xs px-10 py-3.5">
            Create web
          </Button>
        </div>
      </RoundedDiv>
      <RoundedDiv className="text-gray-500">
        <div className="flex items-center space-x-2 mb-2">
          <Switch id="show-connections" />
          <Label htmlFor="show-connections">Show connections</Label>
        </div>
        <div className="flex items-center space-x-2">
          <Switch id="show-connections-on-map" />
          <Label htmlFor="show-connections-on-map">Show connections on map</Label>
        </div>
      </RoundedDiv>
    </div>
  );
}

export default Topbar;