import { type ReactNode } from "react";
import { useNavigate } from "react-router";
import ActionButton from "../shared/ActionButton/ActionButton";

export default function UpdateABookButton({
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
    <div onClick={() => navigate(`/edit-book/${_id}`)}>
      <ActionButton style={style}>{children}</ActionButton>
    </div>
  );
}
