import {useState} from 'react';
import RoundedDiv from "@/components/RoundedDiv";
import IconWrapper from "@/components/IconWrapper";
import glnkIconOnly from "@/assets/glnk-icon-only.png";

const Sidebar = (props) => {
  const [state, setState] = useState()

  return (
    <RoundedDiv className="flex flex-col gap-2 w-fit">
      <img src={glnkIconOnly} alt="GLnk" className="w-[40px] mb-1"/>
      <IconWrapper
        icon="Search"
        active
        className="cursor-pointer"
      />
      <IconWrapper
        icon="User"
        active
        className="cursor-pointer"
      />
      <IconWrapper
        icon="MessageCircle"
        className="cursor-pointer"
      />
      <IconWrapper
        icon="Bell"
        className="cursor-pointer"
      />
      <IconWrapper
        icon="Book"
        className="cursor-pointer"
      />
      <IconWrapper
        icon="BookOpen"
        className="cursor-pointer"
      />
      <IconWrapper
        icon="Calendar"
        className="cursor-pointer"
      />
      <IconWrapper
        icon="Award"
        className="cursor-pointer"
      />
      <IconWrapper
        icon="Target"
        className="cursor-pointer"
      />
      <IconWrapper
        icon="Package"
        className="cursor-pointer"
      />
      <IconWrapper
        icon="CreditCard"
        className="cursor-pointer"
      />
      <IconWrapper
        icon="Settings"
        className="cursor-pointer mb-4"
      />
      <IconWrapper
        icon="LogOut"
        className="cursor-pointer mt-auto"
      />
    </RoundedDiv>
  );
}

export default Sidebar;