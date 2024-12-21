import PasswordUpdate from "@/components/PasswordUpdate";
import ManageSub from "@/components/pricing/ManageSub";

export default function page() {
  return (
    <div className="container space-y-3">
      <ManageSub />
      <PasswordUpdate />
    </div>
  );
}
