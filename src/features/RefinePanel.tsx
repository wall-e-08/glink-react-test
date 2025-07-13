import {useState} from 'react';
import {Funnel, X} from "lucide-react";
import RoundedDiv from "@/components/RoundedDiv";
import {MultiSelectDropdown} from "@/components/MultiSelectDropdown";
import type {MultiDropdownOption} from "@/components/MultiSelectDropdown";
import SearchDropdown from "@/features/SearchDropdown";
import type {Item} from "@/features/SearchDropdown";

const filterOptions:(MultiDropdownOption)[] = [
  { label: "Filter 1", value: "Filter 1" },
  { label: "Filter 2", value: "Filter 2" },
  { label: "Filter 3", value: "Filter 3" },
  { label: "Filter 4", value: "Filter 4" },
]

type RefinePanelProps = {
  doctorsList: Item[];
  onSelect?: (item: Item) => void;
}

const RefinePanel = ({doctorsList, onSelect}: RefinePanelProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string[]>([])

  return (
    <RoundedDiv className="flex flex-row gap-4 text-secondary">
      <SearchDropdown
        data={doctorsList}
        onSelect={onSelect}
      />
      <div className="w-[20%] h-full text-test flex relative">
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