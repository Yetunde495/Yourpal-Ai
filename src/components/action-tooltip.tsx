import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip-new";
import { cn } from "../lib/utils/cn";

interface ActionTooltipProps {
  label: string | undefined;
  children: React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  align?: "start" | "center" | "end";
  className?: string;
}

export const ActionTooltip = ({
  label,
  children,
  side,
  align,
  className,
}: ActionTooltipProps) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger className="w-fit" asChild>
          {children}
        </TooltipTrigger>
        <TooltipContent
          className={cn(
            "max-w-[350px] bg-gray-50 text-gray-700 py-2 border-none",
            className
          )}
          side={side}
          align={align}
        >
          <p className="font-semibold text-sm">{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
