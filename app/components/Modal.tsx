import Button from "./Button";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}
export function GenericModal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-slate-800 p-6 rounded-lg relative">
        <Button onClick={onClose} className="absolute top-2 right-2">
          X
        </Button>
        {children}
      </div>
    </div>
  );
}
