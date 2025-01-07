"use client"

import { cn } from "@/lib/utils";
import { useScrollTop } from "../../../../hooks/use-scrool-top";
import Logo from "./logo";
import { ModeToggle } from "@/components/Toggle-button";
import { useConvexAuth } from "convex/react";
import { SignInButton, UserButton } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/spinner";
import Link from "next/link";

const Navbar = () => {

    const scrolled = useScrollTop();
    const {isAuthenticated,isLoading} = useConvexAuth();

    return ( 
        <div className={cn(
            "z-50 bg-background fixed top-0 flex items-centre w-full p-6 dark:bg-[#1f1f1f]",
            scrolled && "border-b shadow-sm"
        )}>
            <Logo/>
            <div className="md:ml-auto md:justify-end justify-between w-full flex item-center gap-x-2">
                
                {isLoading && (
                    <Spinner/>
                )}

                {!isAuthenticated && !isLoading &&(
                    <>
                        <SignInButton mode="modal" forceRedirectUrl="/">
                            <Button variant="ghost" size="sm">
                                log in
                            </Button>
                        </SignInButton>
                        <SignInButton mode="modal">
                            <Button  size="sm">
                                Get Doti free
                            </Button>
                        </SignInButton>
                    </>
                )}

                {isAuthenticated && !isLoading && (
                    <>
                        <Button variant="ghost" size="sm" asChild>
                            <Link rel="stylesheet" href="/documents">
                            Enter Doti
                            </Link>
                        </Button>
                        <UserButton
                            afterSignOutUrl="/"
                        />
                    </>
                )}

                <ModeToggle/>
                

            </div>
        </div>
     );
}
 
export default Navbar;