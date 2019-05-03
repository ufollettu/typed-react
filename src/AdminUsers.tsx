import React, { FunctionComponent } from "react";
import { NavLink, Route } from "react-router-dom";
import { adminUserData } from "./AdminUserData";
import AdminUser from "./AdminUser";

const AdminUsers: FunctionComponent = () => {
  return (
    <div>
      <ul className="admin-sections">
        {adminUserData.map(user => (
          <li key={user.id}>
            <NavLink
              to={`/admin/users/${user.id}`}
              activeClassName="admin-link-active"
            >
              {user.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <Route path="/admin/users/:id" component={AdminUser} />
    </div>
  );
};

export default AdminUsers;
