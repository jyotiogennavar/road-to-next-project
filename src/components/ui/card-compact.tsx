import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardCompactProps = {
  title: string;
  content: React.ReactNode;
  description: string;
  className?: string;
  footer?: React.ReactNode;
};

const CardCompact = ({ title, content, description, className, footer } : CardCompactProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        {content}
      </CardContent>
      {footer && <CardFooter>{footer}</CardFooter>} 
    </Card>
  );
};

export { CardCompact };
