'use client';

import { REGEXP_ONLY_DIGITS } from 'input-otp';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { CirclePlus } from "lucide-react";
import {
  Tooltip,
  TooltipPopup,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import CreateRoomButton from "./CreateRoomButton";
import { useAuth } from "@clerk/nextjs";
import { useState } from 'react';
import { toastManager } from '../ui/toast';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { join } from 'path';
import { redirect } from 'next/navigation';

export default function CodeJoin() {
  const joinRoom = useMutation(api.room.joinRoom);
  const { userId, isLoaded } = useAuth();
  const [roomCode, setroomCode] = useState("");

  if (!isLoaded) return null;


  const handleJoinRoom = async () =>{
    if(roomCode.length<6 || !roomCode){
      toastManager.add({
        title: "Invalid Room Code",
        description: "Please enter a valid room code.",
        type: "error",
      })
      return
    }
    const roomCodeNumber = parseInt(roomCode);
    await joinRoom({roomCode:roomCodeNumber,clerkId:userId!})
    redirect(`/room/${roomCodeNumber}`)

  }

  return (
    <Dialog>
      <DialogTrigger>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="outline">
              <CirclePlus />
            </Button>
          </TooltipTrigger>
          <TooltipPopup>Join</TooltipPopup>
        </Tooltip>
      </DialogTrigger>

      <DialogPopup className="sm:max-w-sm">
        <Form className="contents">
          <DialogHeader>
            <DialogTitle>Join a Room</DialogTitle>
            <DialogDescription>
              Enter a room code to join or create a new room.
            </DialogDescription>
          </DialogHeader>

          <DialogPanel className="grid gap-4 items-center justify-center">
            <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS} onChange={(v)=>{setroomCode(v)}}>
              <InputOTPGroup>
                <InputOTPSlot index={0} />
                <InputOTPSlot index={1} />
                <InputOTPSlot index={2} />
                <InputOTPSlot index={3} />
                <InputOTPSlot index={4} />
                <InputOTPSlot index={5} />
              </InputOTPGroup>
            </InputOTP>
          </DialogPanel>

          <DialogFooter>
            <CreateRoomButton clerkId={userId!} />

            <Button type="button" onClick={handleJoinRoom}>Join</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  );
}
