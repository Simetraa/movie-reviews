import React, { useState, useRef, useEffect } from "react";

interface Genre {
    id: number;
    name: string;
}

interface GenreFilterMenuProps {
    genres: Genre[];
    selectedGenres: number[];
    onChange: (selected: number[]) => void;
}

export default function GenreFilterMenu({
                                            genres,
                                            selectedGenres,
                                            onChange,
                                        }: GenreFilterMenuProps) {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    const toggleGenre = (id: number) => {
        if (selectedGenres.includes(id)) {
            onChange(selectedGenres.filter((g) => g !== id));
        } else {
            onChange([...selectedGenres, id]);
        }
    };

    // Klick außerhalb schließt das Dropdown
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Anzeige der ausgewählten Genres als Text
    const selectedNames = genres
        .filter((g) => selectedGenres.includes(g.id))
        .map((g) => g.name)
        .join(", ") || "Select genres";

    return (
        <div className="relative inline-block text-left" ref={ref}>
            <button
                type="button"
                className="inline-flex justify-between w-48 rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                onClick={() => setOpen(!open)}
                aria-haspopup="true"
                aria-expanded={open}
            >
                {selectedNames}
                <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                >
                    <path
                        fillRule="evenodd"
                        d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>

            {open && (
                <div
                    className="origin-top-left absolute mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 max-h-60 overflow-auto z-10"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="menu-button"
                    tabIndex={-1}
                >
                    <div className="py-1" role="none">
                        {genres.map(({ id, name }) => (
                            <label
                                key={id}
                                className="flex items-center px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 select-none"
                            >
                                <input
                                    type="checkbox"
                                    checked={selectedGenres.includes(id)}
                                    onChange={() => toggleGenre(id)}
                                    className="form-checkbox mr-2"
                                />
                                {name}
                            </label>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
