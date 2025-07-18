"use client"
import { Button } from "@/components/ui/button"
import { Form } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Clapperboard, HomeIcon, MoveIcon, Navigation, Search } from "lucide-react"
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

    return <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                    <span className="flex gap-2"><Clapperboard color="darkred"></Clapperboard><span className="hidden md:block">MovieReviews</span></span>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                    <HomeIcon className="md:hidden"></HomeIcon><span className="hidden md:block">Home</span>
                </NavigationMenuLink>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <form onSubmit={searchForm.handleSubmit((data) => handleSearch(data))} className="flex gap-1">
                    <Input placeholder="Search..." {...searchForm.register("search")} />
                    <Button className="cursor-pointer" type="submit" variant="secondary" size="icon"><Search /></Button>
                </form>
            </NavigationMenuItem>
            <NavigationMenuItem>
                <HeaderAccountButton></HeaderAccountButton>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
}

