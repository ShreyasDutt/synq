
import CodeJoin from "@/components/home/CodeJoin";
import RoomList from "@/components/home/fetchRooms";
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler";
import { AuroraText } from "@/components/ui/aurora-text";
import { BlurFade } from "@/components/ui/blur-fade";
import { UserButton } from "@clerk/nextjs";

const page = () => {
  return (
    <div className="flex flex-col items-center justify-center max-w-7xl mx-auto">
      <div className="p-7 flex flex-col gap-8 w-full max-w-3xl ">
        {/* User Section */}
        <BlurFade delay={0.25} inView>
        <div className="flex items-center justify-between">

          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "w-15 h-15",
                userButtonAvatarImage: "w-15 h-15",
              },
            }}
          />

          {/* Join with code and Create Room btn */}
          <div className="flex items-center justify-center gap-3">
            <CodeJoin />
            <AnimatedThemeToggler />
          </div>
        </div>


        </BlurFade>
        

        {/* Greeting */}
        <div>
          <BlurFade delay={0.35} inView>
          <p className="font-sans font-semibold text-4xl">
            Currently <AuroraText>Playing</AuroraText>
          </p>
          </BlurFade>

        </div>
          <RoomList/>
        
      </div>
    </div>
  );
};

export default page;
