import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function ActionButton({
  children,
  style,
  available = false,
}: {
  children: ReactNode;
  style?: string;
  available?: boolean;
}) {
  return (
    <Button
      variant={"outline"}
      className={cn("text-green-500", style)}
      disabled={available}
    >
      {children}
    </Button>
  );
}
