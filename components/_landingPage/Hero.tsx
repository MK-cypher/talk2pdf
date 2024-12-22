import Underline from "../icons/Underline";
import StartBtn from "../StartBtn";

export default function Hero() {
  return (
    <div className="py-20 container">
      <div className="">
        <div className="max-w-[40rem] mx-auto flex text-center flex-col justify-center items-center">
          <h1 className="text-4xl font-bold mb-3 relative">
            Chat With <span className="text-red-400">Multiple</span> PDF Documents{" "}
          </h1>
          <div className="text-4xl font-bold relative">
            at the same time!
            <Underline />
          </div>
          <p className="text-muted-foreground">Upload Your PDF Documents and start chatting instantly!</p>
          <div className="mt-5">
            <StartBtn />
          </div>
        </div>
        <div className="w-full aspect-video bg-secondary/50 shadow-inner rounded-xl p-3 mt-20 relative">
          <div className="bg-primary w-full h-full blur-2xl absolute top-0 left-0 z-[-1]"></div>
          <img src="/hero.png" alt="Hero" className="w-full h-full bg-background rounded-xl object-cover" />
        </div>
      </div>
    </div>
  );
}
