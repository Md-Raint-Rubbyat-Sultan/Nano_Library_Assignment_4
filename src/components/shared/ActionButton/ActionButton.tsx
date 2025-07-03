import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

export default function ActionButton({
  children,
  style,
}: {
  children: ReactNode;
  style?: string;
}) {
  return (
    <Button variant={"outline"} className={cn("text-green-500", style)}>
      {children}
    </Button>
  );
}
