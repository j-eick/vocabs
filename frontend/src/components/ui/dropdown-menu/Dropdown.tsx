import { ChangeEvent } from "react";

interface HasNameAndID {
  name: string;
  id: string;
}

type StacksOverviewProps<T extends HasNameAndID> = {
  listItems: T[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
  label?: string;
  dropDownValue: string;
};

export default function Dropdown<T extends HasNameAndID>({
  listItems,
  onChange,
  label,
  dropDownValue,
}: StacksOverviewProps<T>) {
  console.log(listItems);

  return (
    <div className="flex flex-col">
      {label && <label htmlFor="stackOverview">{label}</label>}
      {listItems.length >= 1 && (
        <select name="Stack-Overview" id="stackOverview" value={dropDownValue} onChange={onChange}>
          {listItems.map((item, i) => (
            <option key={i} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}
