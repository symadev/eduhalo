import Marquee from "react-fast-marquee";

const MarqueeBanner = () => {
  return (
    <div className="bg-[#FFEBE5]  p-12  m-12 text-gray-600 border-t border-b text-xl border-pink-200">
      <Marquee pauseOnHover speed={50} gradient={false}>
        📢 Stay updated with EduHalo: Track homework, attendance, results & more — right from your phone! &nbsp;&nbsp;&nbsp;
        🎓 Empowering schools and parents with real-time academic updates. &nbsp;&nbsp;&nbsp;
        🧑‍🏫 Teachers can upload tasks and results instantly!
      </Marquee>
    </div>
  );
};

export default MarqueeBanner;
