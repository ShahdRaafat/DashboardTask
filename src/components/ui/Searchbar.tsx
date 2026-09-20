"use client";

import { SubmitEvent, useState } from "react";
import Button from "./Button";

interface SearchbarProps {
  onSearch: (value: string) => void;
  defaultValue?: string;

  placeholder?: string;
}
function Searchbar({
  onSearch,
  defaultValue = "",
  placeholder = "Search...",
}: SearchbarProps) {
  const [inputValue, setInputValue] = useState(defaultValue);

  function handleSubmit(e: SubmitEvent) {
    e.preventDefault();
    onSearch(inputValue);
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full gap-2 sm:max-w-xs">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-md border border-border bg-surface px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
      />
      <Button type="submit" variant="primary">
        Search
      </Button>
    </form>
  );
}

export default Searchbar;
