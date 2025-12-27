import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs"
import { Button } from "../ui/button"
import Image from "next/image"
import Logo from '@/public/logo.png'

const Navbar = () => {
  return (
    <div className=" h-fit m-10 flex items-center justify-between p-3 px-6 bg-black/10 backdrop-blur-md rounded-full">
        <div className="flex items-center">
           <Image src={Logo} alt="logo" width={50} height={50} className="rounded-2xl"/>
        </div>

        <div>
            <SignedIn>
                <UserButton/>
            </SignedIn>

            <SignedOut>
                <Button>Sign in</Button>
            </SignedOut>
        </div>


    </div>
  )
}

export default Navbar