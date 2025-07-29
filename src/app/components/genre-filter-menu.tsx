import React from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

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
    const toggleGenre = (id: number) => {
        if (selectedGenres.includes(id)) {
            onChange(selectedGenres.filter((g) => g !== id));
        } else {
            onChange([...selectedGenres, id]);
        }
    };


    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-48 justify-between">
                    Genres
                    <div className="overflow-hidden">{selectedGenres.map((id) => <Badge key={id}
                                                                                        className="mr-2">{genres.find(g => g.id === id)?.name}</Badge>)}</div>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48 max-h-60 overflow-y-auto">
                {genres.map(({id, name}) => (
                    <DropdownMenuCheckboxItem
                        key={id}
                        checked={selectedGenres.includes(id)}

                        onSelect={(e) => {
                            e.preventDefault();
                            toggleGenre(id);
                        }}
                    >
                        {name}
                    </DropdownMenuCheckboxItem>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
