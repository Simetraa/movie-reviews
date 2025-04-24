import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu"
import { Search } from "lucide-react"
import Link from "next/link"

export function Navbar() {
    return <NavigationMenu>
        <NavigationMenuList>
            <NavigationMenuItem>
                <NavigationMenuLink href="/" className={navigationMenuTriggerStyle()}>
                    Home
                </NavigationMenuLink>
            </NavigationMenuItem>
        </NavigationMenuList>
    </NavigationMenu>
}