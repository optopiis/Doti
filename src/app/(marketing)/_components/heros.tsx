import Image from "next/image";

const Heros = () => {
    return ( 
        <div className="flex flex-col items-center justify-center max-w-5xl">
            <div className="flex items-center">
                <div className="relative w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md-h-[400px] md:w-[400px]">
                    <Image 
                    src="/ecto-plasma.png"
                    fill
                    alt="docuemnts"
                    className="object-contain"
                    />
                </div>
                <div className="relative w-[300px] h-[300px] hidden md:block mt-3">
                    <Image
                    src="/plants.png"
                    alt="documents"
                    fill
                    className="object-contain"
                    />
                </div>
            </div>
        </div>
     );
}
 
export default Heros;