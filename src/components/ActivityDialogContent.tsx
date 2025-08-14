// components/EditActivityDialogContent.tsx
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

interface EditActivityDialogContentProps {
  tipo: string;
  formName: string;
  formDescription: string;
  formDate: string;
  setFormName: (value: string) => void;
  setFormDescription: (value: string) => void;
  setFormDate: (value: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

export function ActivityDialogContent({
  tipo,
  formName,
  formDescription,
  formDate,
  setFormName,
  setFormDescription,
  setFormDate,
  onCancel,
  onSave,
}: EditActivityDialogContentProps) {
  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{tipo} Atividade</DialogTitle>
      </DialogHeader>
      <div className="space-y-4">
        <div className="space-y-1">
          <Label htmlFor="name">Nome</Label>
          <Input
            id="name"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="description">Descrição</Label>
          <Input
            id="description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="date">Data</Label>
          <Input
            id="date"
            type="date"
            value={formDate}
            onChange={(e) => setFormDate(e.target.value)}
          />
        </div>
      </div>
      <DialogFooter>
        <Button variant="secondary" onClick={onCancel}>
          Cancelar
        </Button>
        <Button onClick={onSave}>Salvar</Button>
      </DialogFooter>
    </DialogContent>
  );
}
