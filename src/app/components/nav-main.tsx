"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Clapperboard, HomeIcon, ListIcon, Search } from "lucide-react"
import { FieldValues, useForm } from "react-hook-form"
import { HeaderAccountButton } from "./header-account-button"

export function Navbar() {
    const searchForm = useForm();

    function handleSearch(formData: FieldValues) {
        const query = formData.search as string;
        if (query) {
            window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
    }

    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                        <span className="flex gap-2 items-center"><Clapperboard color="darkred" /><span className="hidden md:block font-bold text-lg">MovieReviews</span></span>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                        <HomeIcon className="md:hidden" />
                        <span className="hidden md:block">Home</span>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <form onSubmit={searchForm.handleSubmit((data) => handleSearch(data))} className="flex gap-1">
                        <Input placeholder="Search..." {...searchForm.register("search")} className="w-full" />
                        <Button className="cursor-pointer" type="submit" variant="secondary" size="icon"><Search /></Button>
                    </form>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <HeaderAccountButton />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}

