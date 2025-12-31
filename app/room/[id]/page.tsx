import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Crown, Menu, Play, User, Users } from "lucide-react";

const page = () => {
  return (
    <>
      <Sheet>
        <SheetTrigger className="left-0 top-0 absolute p-4">
          <Menu />
        </SheetTrigger>
        <SheetPopup side="left">
          <SheetHeader>
            <SheetTitle className="font-bold"># Room 234165</SheetTitle>
            <Separator className="bg-white/20" />
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 mt-2">
                <Play size={19} />
                <div className="text-sm">PLAYBACK PERMISSIONS</div>
              </div>

              <div className="flex gap-4">
                <Button>
                  <Users />
                  Everyone
                </Button>
                <Button>
                  <Crown />
                  Admins
                </Button>
              </div>
            </div>
            <Separator className="bg-white/20" />
          </SheetHeader>

          <SheetPanel>
            <div className="flex items-center justify-between className text-sm">
              <div className="flex justify-center items-center gap-2">
                <Users size={19} />
                <div>CONNECTED USERS</div>
              </div>
              <div>1</div>
            </div>

            <div className="py-6">
              <ScrollArea>
                <div className="flex flex-col justify-center gap-2">
                  <Card>
                    <div className="px-5">
                      <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center gap-2">
                          <User />
                          <div>param07_</div>
                        </div>
                        <div className="bg-primary rounded-xl px-5 py-1">
                          You
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card>
                    <div className="px-5">
                      <div className="flex justify-between items-center">
                        <div className="flex justify-center items-center gap-2">
                          <User />
                          <div>param07_</div>
                        </div>
                        <div className="bg-primary rounded-xl px-5 py-1">
                          You
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </div>
          </SheetPanel>

          <SheetFooter>
            <SheetClose>Close</SheetClose>
          </SheetFooter>
        </SheetPopup>
      </Sheet>
    </>
  );
};

export default page;
