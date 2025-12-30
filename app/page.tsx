import CodeJoin from "@/components/home/CodeJoin"
import CreateRoom from "@/components/home/CreateRoom"
import { AnimatedThemeToggler } from "@/components/ui/animated-theme-toggler"
import { AuroraText } from "@/components/ui/aurora-text"
import { Card } from "@/components/ui/card"
import { UserButton } from "@clerk/nextjs"

const page = () => {
  return (
    
    <div className="flex items-center justify-center max-w-7xl mx-auto">
    <div className="p-7 flex flex-col gap-8 w-full max-w-3xl ">
      {/* User Section */}
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
              <CodeJoin/>
              <CreateRoom/>
              <AnimatedThemeToggler/>
            </div>
        </div>

        {/* Greeting */}
        <div>
            <p className="font-sans font-semibold text-4xl">Currently <AuroraText>Playing</AuroraText></p>
        </div>

        <div className="flex flex-col gap-4">
          
          <Card className="flex items-start px-5 justify-center cursor-pointer">
            <div className="flex items-center gap-10">
                <div className="bg-primary w-12 h-12 rounded-xl"></div>

                <div className="flex-1 items-center justify-center text-sm">
                    <p className="font-bold">Current Song - Artist</p>
                    <p>Room Code - Location</p>
                </div>
            </div>
          </Card>

          <Card className="flex items-start px-5 justify-center cursor-pointer">
            <div className="flex items-center gap-10">
                <div className="bg-primary w-12 h-12 rounded-xl"></div>

                <div className="flex-1 items-center justify-center text-sm">
                    <p className="font-bold">Current Song - Artist</p>
                    <p>Room Code - Location</p>
                </div>
            </div>
          </Card>
        </div>




      </div>
    </div>
  )
}

export default page