import { AlertTriangle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface Props {
  message: string;
}

const ErrorState = ({ message }: Props) => (
  <Card className="border-destructive/30 bg-destructive/5 max-w-lg mx-auto">
    <CardContent className="p-6 flex items-center gap-3">
      <AlertTriangle className="h-5 w-5 text-destructive shrink-0" />
      <p className="text-sm text-foreground">{message}</p>
    </CardContent>
  </Card>
);

export default ErrorState;
