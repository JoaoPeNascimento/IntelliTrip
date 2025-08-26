import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const password = () => {
  const onSubmit = async (email: string) => {};

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-full max-w-md shadow-xl p-6">
        <CardContent>
          <h1 className="text-2xl font-bold text-center mb-6">Alterar senha</h1>
          <form onSubmit={} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Email</Label>
              <Input id="nome" className="border-slate-300" required />
            </div>
            <Button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Enviar
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default password;
