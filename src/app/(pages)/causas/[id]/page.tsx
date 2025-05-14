"use client";
import { useParams } from "next/navigation";

export default function CausaUnica() {
  const { id } = useParams();
  console.log(id);
  return <p>{id}</p>;
}
