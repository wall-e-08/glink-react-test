import {useState, ReactNode} from 'react';
import {clsx} from "clsx";

type RoundedDivProps = {
  className?: string;
  children: ReactNode;
}

const RoundedDiv = ({className, children}: RoundedDivProps) => (
  <div className={clsx(
    "rounded-lg border border-red-500 p-3 bg-white",
    className
  )}>
    {children}
  </div>
)

export default RoundedDiv;