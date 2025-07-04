import {useState} from 'react';
import RoundedDiv from "@/components/RoundedDiv";
import {Funnel, Search, X} from "lucide-react";
import {clsx} from "clsx";
import {MultiDropdownOption, MultiSelectDropdown} from "@/components/MultiSelectDropdown";

const filterOptions:(MultiDropdownOption)[] = [
  { label: "Filter 1", value: "Filter 1" },
  { label: "Filter 2", value: "Filter 2" },
  { label: "Filter 3", value: "Filter 3" },
  { label: "Filter 4", value: "Filter 4" },
]

const RefinePanel = (props) => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([])

  return (
    <RoundedDiv className="flex flex-row gap-4 text-secondary">
      <div className="flex items-center flex-1 relative">
        <Search
          className="absolute left-2 pointer-events-none"
          size={18}
        />
        <input
          type="text"
          className={clsx(
            "pl-10 py-1 w-full",
            "text-black border border-secondary rounded-md",
            "focus:outline-none focus:ring-2 focus:ring-blue-500"
          )}
          placeholder="Search"
          id="search-input"
        />
      </div>
      <div className=" w-[20%] h-full text-test flex relative">
        <Funnel
          className="absolute left-2 top-1/2 transform -translate-y-1/2 pointer-events-none"
          size={16}
        />
        <MultiSelectDropdown
          className="w-full h-full flex-1 pl-9"
          options={filterOptions}
          selected={selectedFilter}
          onChange={setSelectedFilter}
          placeholder="Filter"
        />
        {selectedFilter.length !== 0 && (
          <X
            className="absolute right-1 top-1/2 transform -translate-y-1/2 cursor-pointer"
            size={16}
            onClick={() => setSelectedFilter([])}
          />
        )}
      </div>
    </RoundedDiv>
  );
}

export default RefinePanel;