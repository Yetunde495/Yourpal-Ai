import { PropsWithChildren } from "react";

interface Props {
  title: string;
  msg?: string;
  variant?: "error" | "info" | "warning" | "success";
}

export default function Notification({
  title,
  msg,
  children,
  variant,
}: Props & PropsWithChildren) {
  let cls =
    variant === "info"
      ? "mb-3 text-xl font-semibold text-primary dark:text-white"
      : variant === "error"
      ? "mb-3 text-xl font-semibold text-danger dark:text-white"
      : variant === "success"
      ? "mb-3 text-xl font-semibold text-success dark:text-white"
      : variant === "warning"
      ? "mb-3 text-xl font-semibold text-warning dark:text-white"
      : "mb-3 text-xl font-semibold text-black/80 dark:text-white";

  return (
    <div>
      <h2 className={cls}>{title}</h2>
      <p className="font-small">{msg || children}</p>
    </div>
  );
}
