import StartBtn from "../StartBtn";

export default function Hero() {
  return (
    <div className="py-20 container">
      <div className="">
        <div className="max-w-[40rem] mx-auto flex text-center flex-col justify-center items-center">
          <h1 className="text-4xl font-bold ">
            Chat With <span className="text-red-400">Multiple</span> PDFs at the same time!
          </h1>
          <p className="text-muted-foreground">Upload Your PDFs and start chatting instantly!</p>
          <div className="mt-5">
            <StartBtn />
          </div>
        </div>
        <div className="w-full aspect-video bg-secondary/50 shadow-inner rounded-xl p-3 mt-20"></div>
      </div>
    </div>
  );
}
