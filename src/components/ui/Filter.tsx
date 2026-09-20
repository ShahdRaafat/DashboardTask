import Button from "./Button";

//I wanted this filter to be reusable not only for the status but also i can use it whenever i want
//that's why i used generics to make it reusable for any type of filter

type FilterOption<T extends string> = {
  label: string;
  value: T;
};

interface FilterProps<T extends string> {
  options: FilterOption<T>[];
  onChange: (option: T) => void;
  activeValue: T;
}
function Filter<T extends string>({
  options,
  onChange,
  activeValue,
}: FilterProps<T>) {
  return (
    <div className="flex flex-wrap p-1 border border-border rounded-lg bg-surface">
      {options.map((option) => (
        <Button
          key={option.value}
          onClick={() => onChange(option.value)}
          variant={activeValue === option.value ? "primary" : "ghost"}
          className="border-none"
        >
          {option.label}
        </Button>
      ))}
    </div>
  );
}

export default Filter;
