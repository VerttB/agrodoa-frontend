export const formatTel = (value: string): string => {
  const cleanedValue = value.replace(/\D/g, "");

  return cleanedValue
    .replace(/(\d{1})(\d)/, "($1$2)")
    .replace(/(\d{5})(\d)/, "$1-$2");
};
