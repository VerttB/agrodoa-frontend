interface ItemPageDescriptionProps {
  children: React.ReactNode;
  title: string;
}
export const ItemPageDescription = ({
  title,
  children,
}: ItemPageDescriptionProps) => {
  return (
    <div className="bg-neutral w-full rounded-xl">
      <h2 className="bg-secondary text-neutral mb-4 rounded-xl px-4 py-3 text-3xl">
        {title}
      </h2>
      <div className="flex flex-col gap-4 p-4 ">{children}</div>
    </div>
  );
};
