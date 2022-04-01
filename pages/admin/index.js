import { useEffect } from "react";
import { useRouter } from "next/router";
import routes from "../../config/routes";

const Admin = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(routes.admin.users.root);
  }, []);
  return null;
};

export default Admin;
