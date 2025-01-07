"use client"

import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";
import { useConvexAuth } from "convex/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Heading = () => {
    const {isAuthenticated,isLoading} = useConvexAuth();
    return ( 
        <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
                Your ideas, documents,& plans. Unified. Welcome to <span className="underline">DOTI</span>
            </h1>
            <h3 className="text-base sm:text-xl md:text-2xl font-medium">
                Doti is the connected space where <br />
                better faster work happens.
            </h3>
            {isAuthenticated && !isLoading && (
                <Button>
                    <Link href="/documents">
                        Enter Doti
                        <ArrowRight className="h-4 ml-2 w-4 inline"/>
                    </Link>
                </Button>
            )}

            {isLoading && (
                <div className="w-full flex items-center justify-center">
                    <Spinner size="lg"/>
                </div>
            )}

            {!isAuthenticated && !isLoading && (
                 <>
                 <SignInButton mode="modal">
                     <Button  size="sm">
                        Get Doti free
                        <ArrowRight className="h-4 ml-2 w-4"/>

                     </Button>
                 </SignInButton>
             </>
            )}
           
        </div>
     );
}
 
export default Heading;