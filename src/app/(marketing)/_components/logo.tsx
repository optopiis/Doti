import { Poppins } from "next/font/google";
import Image from "next/image";
import { cn } from "@/lib/utils";

const font = Poppins({
    subsets : ["latin"],
    weight : ["400","600"]
});

const Logo = () => {
    return ( 
        <div className="hidden md:flex items-center gap-x-2">
            <Image
            src="/logo.png"
            alt="logo"
            height="40"
            width="40"
            className="dark:hidden"
            />
            <p className={cn("font-semibold", font.className)}>Doti</p>
        </div>
     );
}
 
export default Logo;