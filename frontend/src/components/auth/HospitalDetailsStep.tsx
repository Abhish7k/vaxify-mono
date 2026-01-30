import type {
  UseFormRegister,
  FieldErrors,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { FileDropzone } from "@/components/ui/file-dropzone";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HospitalDetailsStepProps {
  register: UseFormRegister<any>;
  errors: FieldErrors;
  setValue: UseFormSetValue<any>;
  watch: UseFormWatch<any>;
}

export const HospitalDetailsStep = ({
  register,
  errors,
  setValue,
  watch,
}: HospitalDetailsStepProps) => {
  const documentUrl = watch("document");

  return (
    <section className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
      <div className="space-y-2">
        <Label>Hospital Name</Label>
        <Input {...register("hospitalName")} />
        {errors.hospitalName && (
          <p className="text-sm text-red-500">
            {errors.hospitalName.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Hospital Address</Label>
        <Input {...register("hospitalAddress")} />
        {errors.hospitalAddress && (
          <p className="text-sm text-red-500">
            {errors.hospitalAddress.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Hospital Registration ID</Label>
        <Input {...register("hospitalRegistrationId")} />
        {errors.hospitalRegistrationId && (
          <p className="text-sm text-red-500">
            {errors.hospitalRegistrationId.message as string}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Verification Document</Label>

        <FileDropzone
          value={documentUrl}
          onChange={(url, fileName) => {
            setValue("document", fileName || url || "", {
              shouldValidate: true,
            });
          }}
        />

        {errors.document && (
          <p className="text-sm text-red-500 mt-1">
            {errors.document.message as string}
          </p>
        )}
      </div>

      {/* approval note */}
      <div className="flex items-start gap-2 rounded-md border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-700">
          <strong>Note:</strong> Your account will remain in an approval phase
          until verified by the system administrator.
        </p>
      </div>
    </section>
  );
};
