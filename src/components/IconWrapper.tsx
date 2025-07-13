import type {ComponentType} from 'react';
import {clsx} from "clsx";
import type {LucideProps} from "lucide-react";

type IconCardProps = {
  Icon: ComponentType<LucideProps>
  active?: boolean
  className?: string
}

const IconWrapper = ({
  Icon,
  className,
  active = false,
}: IconCardProps) => (
  <div
    className={clsx(
      "p-2 text-center rounded-md border inline-flex text-gray-700",
      active ? "border-blue-900" : "border-transparent",
      className
    )}
  >
    <Icon size={24} strokeWidth={1.5}/>
  </div>
);


export default IconWrapper;