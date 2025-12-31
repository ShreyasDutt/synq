import ButtonGroup from "@/components/room/ButtonGroup";
import { Button } from "@/components/ui/button";
import { Card, CardAction } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
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
import { Menu, Play, PlayIcon, Repeat, Repeat2, SkipBack, SkipForward, User, Users } from "lucide-react";

const Page = () => {
  return (
    <>
      <div className="min-h-screen flex justify-center">
        <div className="w-full max-w-5xl relative">
          {/* side bar */}
          <Sheet>
            <SheetTrigger className="absolute left-0 top-2 p-4">
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

                  <ButtonGroup />
                </div>

                <Separator className="bg-white/20" />
              </SheetHeader>

              <SheetPanel>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Users size={19} />
                    <div>CONNECTED USERS</div>
                  </div>
                  <div>2</div>
                </div>

                <div className="py-6">
                  <ScrollArea className="h-64">
                    <div className="flex flex-col gap-2">
                      <Card className="p-5">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <User />
                            <div>param07_</div>
                          </div>
                          <div className="bg-primary text-primary-foreground rounded-xl px-5 py-1 text-sm">
                            You
                          </div>
                        </div>
                      </Card>

                      <Card className="p-5">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2">
                            <User />
                            <div>shreyas-56</div>
                          </div>
                          <div className="bg-primary text-primary-foreground rounded-xl px-5 py-1 text-sm">
                            Other
                          </div>
                        </div>
                      </Card>
                    </div>
                  </ScrollArea>
                </div>
              </SheetPanel>

              <SheetFooter>
                <SheetClose>
                  <Button variant="secondary">Close</Button>
                </SheetClose>
              </SheetFooter>
            </SheetPopup>
          </Sheet>

          {/* hero section */}
          <div className="flex flex-col items-center gap-10">
            <Input
              className="w-75 py-2 mt-4 ml-6"
              placeholder="What do you want to play?"
            />

            {/* songs */}
            <div>
              <ScrollArea>
                <div className="flex flex-col justify-center items-center gap-5">
                  {/* song 1 */}
                  <Card className="ml-6 w-75">
                    <div className="flex items-center gap-3 text-sm px-6">
                      <div>
                        <PlayIcon />
                      </div>
                      <div>
                        <div>That's what I like</div>
                        <div className="text-[11px] text-muted-foreground">
                          Bruno Mars
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* song 2 */}
                  <Card className="ml-6 w-75">
                    <div className="flex items-center gap-3 text-sm px-6">
                      <div>
                        <PlayIcon />
                      </div>
                      <div>
                        <div>That's what I like</div>
                        <div className="text-[11px] text-muted-foreground">
                          Bruno Mars
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </ScrollArea>
            </div>
          </div>
        </div>
      </div>

      {/* music play pause */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
        <div className="flex items-center gap-4 bg-background/80 backdrop-blur px-6 py-3 rounded-full shadow-lg">
          <Repeat size={20} />
          <SkipBack size={25} />
          <div className="bg-white/30 p-4 rounded-full">
            <Play size={25} />
          </div>
          <SkipForward size={25} />
          <Repeat2 size={20} />
        </div>
      </div>
    </>
  );
};

export default Page;
