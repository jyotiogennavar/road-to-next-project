import { Separator } from "@/components/ui/separator";

type HeadingProps = {
  title: string;
  subtitle?: string;
};

const Header = ({ title, subtitle }: HeadingProps) => {
  return (
    <>
      <div className="px-5">
        <h1 className="text-2xl font-semibold ">{title}</h1>
        {subtitle && <p className="text-muted-foreground">{subtitle}</p>}
      </div>
      <Separator />
    </>
  );
};

export { Header };
