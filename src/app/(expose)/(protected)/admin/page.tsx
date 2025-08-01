"use client";
export const dynamic = "force-dynamic";
import { admin } from "@/components/auth/admin-action";
import { FormSuccess } from "@/components/auth/form-success";
import { RoleGate } from "@/components/auth/role-gate";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

const AdminPage = () => {
  const onServerActionClick = () => {
    admin()
      .then((data) => {
        if (data.error) {
          toast.error(data.error);
        }

        if (data.success) {
          toast.success(data.success);
        }
      })
  }
  
  const onApiRouteClick = () => {
    fetch("/api/admin")
      .then((response) => {
        if (response.ok) {
          toast.success("Allowed API Route!");
        } else {
          toast.error("Forbidden API Route!");
        }
      })
  }

  return (
    <Card className="w-[450px] border-none shadow-none">
      {/* <CardHeader>
        <p className="text-2xl font-semibold text-center">
          🔑 Admin
        </p>
      </CardHeader> */}
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess
            message="You are allowed to see this content!"
          />
        </RoleGate>
        <div className="flex flex-row items-center justify-between border  p-4 ">
          <p className="text-sm font-medium">
            Admin-only API Route
          </p>
          <Button onClick={onApiRouteClick}>
            Test
          </Button>
        </div>

        <div className="flex flex-row items-center justify-between border p-4 ">
          <p className="text-sm font-medium">
            Admin-only Server Action
          </p>
          <Button onClick={onServerActionClick}>
            Test
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminPage;
