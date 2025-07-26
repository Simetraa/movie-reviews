import React from "react";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface SortOption {
    label: string;
    value: string;
}

interface SortByMenuProps {
    options: SortOption[];
    selectedSort: string;
    onChange: (value: string) => void;
}

export default function SortByMenu({
                                       options,
                                       selectedSort,
                                       onChange,
                                   }: SortByMenuProps) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-48 justify-between">
                    Sort By
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 max-h-60 overflow-y-auto">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                {options.map(({ label, value }) => (
                    <DropdownMenuItem
                        key={value}
                        onSelect={(e) => {
                            e.preventDefault();
                            onChange(value);
                        }}
                        className={selectedSort === value ? "font-bold" : ""}
                    >
                        {label}
                    </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
