"use client";

import { UserRole } from "@prisma/client";
import { useCurrentRole } from "../../../hooks/use-current-role";
import FormError from "../form-error";

interface RoleGateProps {
  children: React.ReactNode;
  allowedRoles: UserRole;
}

export const RoleGate = ({ children, allowedRoles }: RoleGateProps) => {
    const role = useCurrentRole();
    if(role !== allowedRoles){
        return <FormError message="You are not authorized to view this page" />
    }
  return <>{children}</>;
};
