"use client";

import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { Card } from "../ui/card";
import { HeadphoneOff } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { BlurFade } from "../ui/blur-fade";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const RoomList = () => {
  const rooms = useQuery(api.room.getRooms, {});
  const { user } = useUser(); 
  const joinRoom = useMutation(api.room.joinRoom);
  const leaveAllRooms = useMutation(api.room.leaveAllRooms);


useEffect(() => {
  if (!user) return;
  const userId = user.id;

  (async () => {
    await leaveAllRooms({ clerkId: userId });
  })();
}, [user]);


  const handleAddUser = async (roomId: number) => {
    if (!user) return console.log("User not found");

    const userId = user.id;
    if (!userId) return console.log("user Id is undefined");

    await joinRoom({ roomCode: roomId, clerkId: userId });
    
    redirect(`/room/${roomId}`);
  };

  if (rooms===undefined) {
    return
  }

  if (!rooms?.length)
    return (
      <div className="w-full flex items-center justify-center p-8">
        <Card className="w-full max-w-md">
          <div className="flex flex-col items-center justify-center py-16 px-8 text-center space-y-6">
            <div className="relative">
              <div className="absolute inset-0 bg-linear-to-br from-emerald-500/20 to-green-500/20 blur-3xl rounded-full" />
              <div className="relative bg-linear-to-br from-green-300 to-green-200 dark:from-emerald-950 dark:to-emerald-950 p-6 rounded-2xl">
                <HeadphoneOff size={48} className="text-green-500 dark:text-green-400" strokeWidth={1.5} />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="text-2xl font-semibold tracking-tight text-gray-900 dark:text-gray-100">
                No Rooms Found
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm">
                It looks like there are no rooms available at the moment. Check back later or create a new room to get started.
              </p>
            </div>
          </div>
        </Card>
      </div>
    );

  return (
    <div>
      <div className="flex flex-col gap-4">
        {rooms.map(room => (
          <BlurFade key={room._id} delay={0.25 * 2} inView>
            <Card
              className="flex px-5 justify-between cursor-pointer"
              onClick={() => handleAddUser(room.roomCode)}
            >
              <div className="flex items-center gap-10 ">
                <div className="bg-primary w-12 h-12 rounded-xl"></div>

                <div className="flex-1 items-center justify-center text-sm">
                  <p className="font-semibold text-sm mb-1">{room.currentSong || "No Song Playing"}</p>
                  <p className="font-light text-xs text-slate-400">{room.roomCode} - Location</p>
                </div>

                <div>
                  <div  className="-space-x-[0.6rem] flex">
                  {room.members?.map(joinedUser => (
                      <Avatar key={joinedUser?._id} className="transition hover:ring-2 hover:ring-primary hover:ring-offset-background">
                        <AvatarImage alt="" src={joinedUser?.pfp} />
                        <AvatarFallback>{joinedUser?.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                  ))}
                  </div>
                </div>
              </div>
            </Card>
          </BlurFade>
        ))}
      </div>
    </div>
  );
};

export default RoomList;
