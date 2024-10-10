import { ReactNode } from "react";

type InfoModalProps = {
  content: ReactNode;
  className: string;
};

export default function InfoModal({ content, className }: InfoModalProps) {
  return (
    <div
      className={`absolute top-8 left-1/2 -translate-x-1/2
                          border-2  ${className}`}
    >
      {content}
    </div>
  );
}
