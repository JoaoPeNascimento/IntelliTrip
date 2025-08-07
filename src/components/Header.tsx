import Link from "next/link";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";
import { MenuIcon } from "lucide-react";

const Header = () => {
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
          <SheetContent></SheetContent>
        </Sheet>
      </CardContent>
    </Card>
  );
};

export default Header;
