"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"
import { Clapperboard, Search } from "lucide-react"
import { FieldValues, useForm } from "react-hook-form"
import { HeaderAccountButton } from "./header-account-button"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

function SearchInput() {
    const searchParams = useSearchParams();
    const searchForm = useForm();

    function handleSearch(formData: FieldValues) {
        const query = formData.search as string;
        if (query) {
            window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
    }

    return (
        <form onSubmit={searchForm.handleSubmit((data) => handleSearch(data))} className="flex gap-1">
            <Input placeholder="Search..." {...searchForm.register("search")} className="w-full"
                defaultValue={searchParams.get("q") ?? ""} />
            <Button className="cursor-pointer" type="submit" variant="secondary"
                size="icon"><Search /></Button>
        </form>
    );
}

export function Navbar() {
    return (
        <NavigationMenu className="h-[56px]">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                        <Link href="/"><span className="flex gap-2 items-center"><Clapperboard color="darkred" /><span
                            className="hidden md:block font-bold text-lg">MovieReviews</span></span></Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <Suspense fallback={
                        <form className="flex gap-1">
                            <Input placeholder="Search..." className="w-full" />
                            <Button className="cursor-pointer" type="submit" variant="secondary"
                                size="icon"><Search /></Button>
                        </form>
                    }>
                        <Suspense><SearchInput /></Suspense>
                    </Suspense>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <HeaderAccountButton />
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}