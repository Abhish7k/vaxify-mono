import { Link } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { User, Hospital } from "lucide-react";

const RegisterPage = () => {
  return (
    <div>
      <div className="flex items-center justify-center gap-2 mb-5">
        <img src="/logo.svg" alt="VMS Logo" className="w-12 h-12 mb-0.5" />
        {/* <h1 className="text-3xl font-bold text-indigo-600">VAXIFY</h1> */}
      </div>

      <h2 className="text-xl font-semibold text-center text-slate-800 mb-2">
        Create an Account
      </h2>

      <p className="text-center text-slate-500 mb-8 text-sm">
        Choose how you want to register
      </p>

      <div className="grid gap-6">
        {/* Register as User */}
        <Link to="/register/user">
          <Card className="cursor-pointer border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row gap-4 items-start">
              <User className="w-8 h-8 text-indigo-600" />

              <div className="space-y-1">
                <CardTitle>Register as User</CardTitle>

                <CardDescription>
                  For citizens booking vaccination appointments
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>

        {/* Register as Hospital Staff */}
        <Link to="/register/staff">
          <Card className="cursor-pointer border-indigo-200 hover:border-indigo-400 hover:shadow-md transition-all duration-300">
            <CardHeader className="flex flex-row gap-4 items-start">
              <Hospital className="w-8 h-8 text-indigo-600" />
              <div className="space-y-1">
                <CardTitle>Register as Hospital Staff</CardTitle>

                <CardDescription>
                  For hospital staff managing vaccination centers
                </CardDescription>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
