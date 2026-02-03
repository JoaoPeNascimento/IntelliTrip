import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Button } from "./ui/button";
import { CircleUser, LogOutIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/authStore";
import { useUIStore } from "@/stores/uiStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

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

  const pushToUserProfile = () => {
    router.push("/user");
  };

  return (
    <Card className="border-solid border-b-gray-300">
      <CardContent className="flex flex-row justify-between items-center">
        <Link href="/home">
          <Image src="/Logo.png" alt="Logo" width={120} height={18} />
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="rounded-full" asChild>
              <CircleUser className="h-16 w-16" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-40" align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-lg" onClick={pushToUserProfile}>
                Conta
              </DropdownMenuItem>
              <DropdownMenuSeparator />

              <DropdownMenuItem className="text-lg" onClick={myTravelClick}>
                Minhas Viagens
              </DropdownMenuItem>
              <DropdownMenuItem className="text-lg" onClick={myInvitesClick}>
                Meus Convites
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={onLogout}
                className="bg-blue-600 text-white text-lg"
              >
                Sair <LogOutIcon className="h-4 w-4 text-white" />
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardContent>
    </Card>
  );
};

export default Header;
