import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, Phone } from "lucide-react";

type Props = {
  name: string;
  email: string;
  phone: string;
};

export default function AdminHospitalStaffSection({
  name,
  email,
  phone,
}: Props) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <h2 className="text-lg font-medium">Registered Staff</h2>

        <div className="space-y-2 text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span>{name}</span>
          </div>

          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span>{email}</span>
          </div>

          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-muted-foreground" />
            <span>{phone}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
