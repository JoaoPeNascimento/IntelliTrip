import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { LogOutIcon, MenuIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";

const Header = () => {
  const router = useRouter();
  const { setShowMyTravels, setShowMyInvites } = useUIStore();

  const onLogout = () => {
    useAuthStore.getState().setToken("", "");
    router.push("/");
  };

  const myTravelClick = () => {
    setShowMyTravels();
    router.push("/home");
  };

  const myInvitesClick = () => {
    setShowMyInvites();
    router.push("/home");
  };

  return (
    <Card className="border-solid border-b-gray-300">
      <CardContent className="flex flex-row justify-between items-center">
        <Link href="/home">
          <Image src="/Logo.png" alt="Logo" width={120} height={18} />
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col gap-2 p-2">
            <SheetTitle>Menu</SheetTitle>
            <Button onClick={myTravelClick} variant={"ghost"}>
              Minhas viagens
            </Button>
            <Button onClick={myInvitesClick} variant={"ghost"}>
              Meus convites
            </Button>
            <Button asChild variant={"ghost"}>
              <Link href={"/user"}>Meu perfil</Link>
            </Button>

            <Button onClick={onLogout}>
              Logout <LogOutIcon />
            </Button>
          </SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
