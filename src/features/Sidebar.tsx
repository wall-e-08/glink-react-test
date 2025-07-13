import RoundedDiv from "@/components/RoundedDiv";
import IconWrapper from "@/components/IconWrapper";
import {Search, User, MessageCircle, Bell, Book,
    BookOpen, Calendar, Award, Target, Package,
    CreditCard, Settings, LogOut} from "lucide-react";
import glnkIconOnly from "@/assets/glnk-icon-only.png";

const Sidebar = () => {
  return (
    <RoundedDiv className="flex flex-col gap-2 w-fit">
      <img src={glnkIconOnly} alt="GLnk" className="w-[40px] mb-1"/>
      <IconWrapper
        Icon={Search}
        active
        className="cursor-pointer"
      />
      <IconWrapper
        Icon={User}
        className="cursor-pointer"
      />
      <IconWrapper
        Icon={MessageCircle}
        className="cursor-pointer"
      />
      <IconWrapper
        Icon={Bell}
        className="cursor-pointer"
      />
      <IconWrapper
        Icon={Book}
        className="cursor-pointer"
      />
      <IconWrapper
        Icon={BookOpen}
        className="cursor-pointer"
      />
      <IconWrapper
        Icon={Calendar}
        className="cursor-pointer"
      />
      <IconWrapper
        Icon={Award}
        className="cursor-pointer"
      />
      <IconWrapper
        Icon={Target}
        className="cursor-pointer"
      />
      <IconWrapper
        Icon={Package}
        className="cursor-pointer"
      />
      <IconWrapper
        Icon={CreditCard}
        className="cursor-pointer"
      />
      <IconWrapper
        Icon={Settings}
        className="cursor-pointer mb-4"
      />
      <IconWrapper
        Icon={LogOut}
        className="cursor-pointer mt-auto"
      />
    </RoundedDiv>
  );
}

export default Sidebar;