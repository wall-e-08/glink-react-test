import React, { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/shadcn/popover"
import { Button } from "@/components/shadcn/button"
import { Checkbox } from "@/components/shadcn/checkbox"
import { Separator } from "@/components/shadcn/separator"
import {clsx} from "clsx";

export type MultiDropdownOption = {
  label: string
  value: string
}

interface MultiSelectDropdownProps {
  options: MultiDropdownOption[]
  selected: string[]
  onChange: (values: string[]) => void
  placeholder: string
  className?: string
}

export function MultiSelectDropdown({
  className="",
  options,
  selected,
  onChange,
  placeholder,
}: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const [tmpSelected, setTmpSelected] = useState<string[]>(selected)

  const toggleOption = (value: string) => {
    setTmpSelected((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    )
  }

  const applySelection = () => {
    onChange(tmpSelected)
    setOpen(false)
  }

  const onOpenChangeHandler = isOpen => {
    setOpen(isOpen);
    if (isOpen) setTmpSelected(selected)
  }

  return (
    <Popover
      open={open}
      onOpenChange={onOpenChangeHandler}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={clsx(
            "cursor-pointer",
            className,
          )}
        >
          {selected.length > 0
            ? options
              .filter((opt) => selected.includes(opt.value))
              .map((opt) => opt.label)
              .join(", ")
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[220px] p-0">
        {options.map((option) => (
          <div
            key={option.value}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer"
            onClick={() => toggleOption(option.value)}
          >
            <Checkbox
              checked={tmpSelected.includes(option.value)}
              onCheckedChange={() => toggleOption(option.value)}
            />
            <span className="text-sm">{option.label}</span>
          </div>
        ))}
        <Separator />
        <div className="w-full flex py-2 pr-3">
          <Button className="ml-auto" onClick={applySelection}>
            Apply
          </Button>
        </div>

        {/*<div className="p-2 flex justify-between gap-2">
          <Button variant="secondary" className="w-full" onClick={cancelSelection}>
            Cancel
          </Button>
        </div>*/}
      </PopoverContent>
    </Popover>
  )
}
