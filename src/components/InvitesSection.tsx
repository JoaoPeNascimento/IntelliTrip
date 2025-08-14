"use client";

import { ChevronDown, ListCollapseIcon, PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import Title from "./Title";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState } from "react";

interface InviteList {
  invites: string[];
  onClick: () => void;
}

const InvitesSection = ({ invites, onClick }: InviteList) => {
  const [open, setOpen] = useState(false);

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <CollapsibleTrigger className="flex items-center justify-between w-full">
        <Title>Convidados</Title>
        <ChevronDown
          className={`transition-transform duration-300 ${
            open ? "rotate-180" : ""
          } text-blue-600`}
        />
      </CollapsibleTrigger>
      <CollapsibleContent>
        <div className="space-y-1">
          {invites.map((invite) => (
            <p className="text-gray-500" key={invite}>
              {invite}
            </p>
          ))}
          <Button variant={"outline"} onClick={onClick}>
            Criar convite
            <PlusCircleIcon />{" "}
          </Button>
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export default InvitesSection;
