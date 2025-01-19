"use client"

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";


const Error = () => {
    return ( 
        <div className="flex flex-col items-center justify-center space-y-4 h-full">
            <Image
            src="/feliz.png"
            height={400}
            width={400}
            alt="error"
            />
            <h2 className="text-xl font-bold">
                Something went wrong !
            </h2>

            <Button asChild>
                <Link href="/documents">
                    Go back
                </Link>
            </Button>
        </div>
     );
}
 
export default Error;