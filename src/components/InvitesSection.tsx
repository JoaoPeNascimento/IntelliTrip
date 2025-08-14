import { PlusCircleIcon } from "lucide-react";
import { Button } from "./ui/button";
import Title from "./Title";

interface InviteList {
  invites: string[];
}

const InvitesSection = ({ invites }: InviteList) => {
  return (
    <>
      <Title>Convidados</Title>
      <div className="space-y-1">
        {invites.map((invite) => (
          <p className="text-gray-500" key={invite}>
            {invite}
          </p>
        ))}
        <Button variant={"outline"}>
          Criar convite
          <PlusCircleIcon />{" "}
        </Button>
      </div>
    </>
  );
};

export default InvitesSection;
