import type { ReactNode } from "react";
import ActionButton from "../shared/ActionButton/ActionButton";
import { useNavigate } from "react-router";

export default function BorrowABookButton({
  children,
  style,
  _id,
  available,
}: {
  children: ReactNode;
  style?: string;
  _id: string;
  available: boolean;
}) {
  const navigate = useNavigate();
  return (
    <div onClick={() => !available && navigate(`/borrow/${_id}`)}>
      <ActionButton style={style} available={available}>
        {children}
      </ActionButton>
    </div>
  );
}
