const CardContainer = ({
  styles = "",
  children,
}: {
  styles?: string;
  children: React.ReactNode;
}) => {
  if (!styles) {
    styles = "";
  }
  return (
    <div
      className={`py-6 px-3 bg-bgDark-080 border border-bgDark-070 rounded-[12px] shadow ${styles}`}>
      {children}
    </div>
  );
};

export default CardContainer;
