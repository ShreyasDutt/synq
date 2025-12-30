import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { Download, Ellipsis, Heart, Search, Settings } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@radix-ui/react-separator";

const page = () => {
  return (
    <div>
      {/* top bar */}
      <div className="flex justify-between items-center pt-15 px-10">
        <div>
          <SignedIn>
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: "w-20 h-20",
                  userButtonAvatarImage: "w-20 h-20",
                },
              }}
            />
          </SignedIn>

          <SignedOut>
            <Button>Sign in</Button>
          </SignedOut>
        </div>
        <div className="flex justify-center items-center gap-7">
          <div className="bg-gray-500 p-3 rounded-4xl">
            <Search size={28} />
          </div>
          <div className="bg-gray-500 p-3 rounded-4xl">
            <Heart size={28} />
          </div>
        </div>
      </div>

      {/* name */}
      <div className="text-5xl font-bold px-5 py-13">Hi, Param</div>
      <Separator />

      {/* trending list */}
      <div className="text-3xl px-5"> Curated & trending</div>

      <div className="mx-1 my-5">
        <ScrollArea className="w-full rounded-xl bg-background">
          {/* padding belongs INSIDE so scrollbar doesn't overlap content */}
          <div className="p-4">
            <div className="flex gap-4">
              {/* Card 1 - Featured */}
              <Card className="min-w-85 max-w-85 overflow-hidden border-0 bg-linear-to-br from-violet-600 to-fuchsia-500 text-white shadow-lg">
                <div className="flex h-full flex-col justify-between p-5">
                  <div className="space-y-2">
                    <div className="text-2xl font-extrabold leading-tight">
                      Weekly Trending Rooms
                    </div>
                    <p className="text-sm/6 text-white/90 line-clamp-2">
                      The original slow instrumental best playlists.
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <Button
                      variant="secondary"
                      className="bg-white/15 text-white hover:bg-white/25"
                    >
                      Join
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/15"
                        aria-label="Like"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/15"
                        aria-label="More options"
                      >
                        <Ellipsis className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Card 2 - Standard */}
              <Card className="min-w-85 max-w-85 overflow-hidden border-0 bg-linear-to-br text-white shadow-lg">
                <div className="flex h-full flex-col justify-between p-5">
                  <div className="space-y-2">
                    <div className="text-2xl font-extrabold leading-tight">
                      Weekly Trending Rooms
                    </div>
                    <p className="text-sm/6 text-white/90 line-clamp-2">
                      The original slow instrumental best playlists.
                    </p>
                  </div>

                  <div className="mt-5 flex items-center justify-between">
                    <Button
                      variant="secondary"
                      className="bg-white/15 text-white hover:bg-white/25"
                    >
                      Join
                    </Button>

                    <div className="flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/15"
                        aria-label="Like"
                      >
                        <Heart className="h-5 w-5" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-white hover:bg-white/15"
                        aria-label="More options"
                      >
                        <Ellipsis className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>

          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>

      {/* Favourite Rooms */}
      <div className="px-5 mt-10">
        <div className="text-3xl font-semibold mb-4">Your Favourite Rooms</div>

        <ScrollArea className="h-[320px] rounded-xl border bg-background">
          <div className="p-4 space-y-4">
            {/* Room Item */}
            <Card className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <CardTitle className="text-lg">Late Night Lofi</CardTitle>
                <CardDescription>128 listeners · Chill beats</CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Ellipsis className="h-5 w-5" />
                </Button>
              </div>
            </Card>

            {/* Room Item */}
            <Card className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <CardTitle className="text-lg">Focus Mode</CardTitle>
                <CardDescription>64 listeners · Instrumental</CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Ellipsis className="h-5 w-5" />
                </Button>
              </div>
            </Card>

            {/* Room Item */}
            <Card className="flex items-center justify-between p-4">
              <div className="space-y-1">
                <CardTitle className="text-lg">Focus Mode</CardTitle>
                <CardDescription>64 listeners · Instrumental</CardDescription>
              </div>

              <div className="flex items-center gap-2">
                <Button size="icon" variant="ghost">
                  <Heart className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="ghost">
                  <Ellipsis className="h-5 w-5" />
                </Button>
              </div>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export default page;
