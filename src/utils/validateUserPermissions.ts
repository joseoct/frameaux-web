type User = {
  role: string;
}

type ValidateUserPermissionsProps = {
  user: User;
  roles?: string[];
}

export function validateUserPermissions({
  user,
  roles,
}: ValidateUserPermissionsProps) {
  if (roles?.length > 0) {
    const hasRole = roles.includes(user.role);

    if (!hasRole) {
      return false;
    }
  }

  return true;
}

