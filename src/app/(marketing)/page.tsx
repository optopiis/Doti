import Footer from "./_components/footer";
import Heading  from "./_components/heading";
import Heros from "./_components/heros";

export default function Home() {
  return (
      <div className="min-h-full flex flex-col ">
        <div className="flex flex-col flex-1 items-center justify-center md:justify-start text-center gap-y-8 px-6 pb-10">
          <Heading/>
          <Heros/>
          </div>  
          <Footer/>      
      </div>
  );
}
