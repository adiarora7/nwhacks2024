"use client"
import { useEffect, useState } from "react";
import cn from "classnames";
import styles from "./search.module.scss";

export type Location = {
  name: string;
  address: string;
  longitude: number;
  latitude: number;
};

type Props = {
  value?: string;
  error?: boolean;
  onChange?: (e: string) => void;
  onSearch?: (e: string) => void;
  locations?: Location[];
  handleCoordinate: (arg0: Location) => void;
};

const placeholder = "Search ...";

export function Search({ value, onChange, onSearch, error, locations, handleCoordinate }: Props) {
  const [text, setText] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredLocations, setFilteredLocations] = useState<Location[]>([]);

  useEffect(() => {
    if (locations) {
      const filtered = locations.filter((location) =>
        location.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredLocations(filtered);
    }
  }, [text, locations]);

  const handleInputChange = (input: string) => {
    setText(input);
    onChange?.(input);
    setShowDropdown(input.length > 0); // Show dropdown if input is not empty
  };

  const handleSearch = () => {
    onSearch?.(text);
    setShowDropdown(false); // Hide dropdown on search
  };

  return (
    <div className={styles.search}>
      <input
        value={text}
        className={cn(styles.input, error && styles.error)}
        type="text"
        placeholder={placeholder}
        onChange={(e) => handleInputChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            handleSearch();
          }
        }}
      />
      {showDropdown && filteredLocations.length > 0 && (
        <div className={styles.dropdown}>
          {filteredLocations.map((location, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => {
                setText(location.name);
                setShowDropdown(false); // Hide dropdown on item click
                handleCoordinate(location)
              }}
            >
              <div className={styles.name}>{location.name}</div>
              {location.address}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
