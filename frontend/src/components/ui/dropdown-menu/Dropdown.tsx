import { ChangeEvent, useEffect } from "react";
import { StackProp } from "../../../types/stack";

type StacksOverviewProps = {
    listItems: StackProp[];
    onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    label?: string;
    value: string;
};

export default function Dropdown({ listItems, onChange, label, value }: StacksOverviewProps) {
    useEffect(() => {
        console.log(listItems);
    });

    return (
        <div className="flex flex-col">
            {label && <label htmlFor="stackOverview">{label}</label>}
            {listItems.length >= 1 && (
                <select
                    name="Stack-Overview"
                    id="stackOverview"
                    value={value}
                    onChange={onChange}
                >
                    {listItems.map((item, i) => (
                        <option
                            key={i}
                            value={item._id}
                        >
                            {item.name}
                        </option>
                    ))}
                </select>
            )}
        </div>
    );
}
