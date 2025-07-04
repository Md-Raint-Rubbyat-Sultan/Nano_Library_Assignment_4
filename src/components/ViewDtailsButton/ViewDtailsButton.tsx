import type { ReactNode } from "react";
import { useNavigate } from "react-router";
import ActionButton from "../shared/ActionButton/ActionButton";

export default function ViewDtailsButton({
  children,
  style,
  _id,
}: {
  children: ReactNode;
  style?: string;
  _id: string;
}) {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/books/${_id}`)}>
      <ActionButton style={style}>{children}</ActionButton>
    </div>
  );
}
