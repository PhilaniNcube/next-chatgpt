import Image from "next/image";

const HomePageHero = () => {
  return <header className="relative isolate">
    <Image src="/images/ai_intelligence.jpg" width={1920} height={1280} alt="Artificial Intelligence" className="aspect-[3/1] w-full object-cover" />
    <div className="absolute inset-0 bg-slate-200/30 flex justify-center items-center">
      <h1 className="text-center text-2xl font-bold text-black">Ask Me Your Question</h1>
    </div>
  </header>;
};
export default HomePageHero;
