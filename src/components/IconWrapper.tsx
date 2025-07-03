import {createElement, useState} from 'react';
import {clsx} from "clsx";
import * as Icons from 'lucide-react';
import {capitalize} from "@/lib/utils";

type IconCardProps = {
  icon: string
  active?: boolean
  className?: string
}

const IconWrapper = ({
  // unseen=false,
  icon,
  className,
  active=false,
  // children
}: IconCardProps) => {
  const IconComponent = Icons[capitalize(icon)] || Icons.HelpCircle; // fallback

  return (
    <div className={clsx(
      "p-2 text-center rounded-md border inline-flex text-gray-700",
      active ? "border-blue-900" : "border-transparent",
      className
    )}>
      {createElement(IconComponent, { size: 24, strokeWidth: 1.5 })}
    </div>
  );
}

export default IconWrapper;