import { Spinner } from "@/components/ui/spinner";

export default function FullPageLoader() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/70 backdrop-blur-sm">
      <Spinner className="size-8" />
    </div>
  );
}
