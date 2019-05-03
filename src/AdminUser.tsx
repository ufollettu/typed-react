import React, { FunctionComponent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { IUser, adminUserData } from "./AdminUserData";

const AdminUser: FunctionComponent<
  RouteComponentProps<{ id: string }>
> = props => {
  let user: IUser;
  if (props.match.params.id) {
    const id: number = parseInt(props.match.params.id, 10);
    user = adminUserData.filter(u => u.id === id)[0];
  } else {
    return null;
  }
  return (
    <div>
      <div>
        <b>ID: </b>
        <span>{user.id.toString()}</span>
      </div>
      <div>
        <b>Is Admin: </b>
        <span>{user.isAdmin ? "yes" : "no"}</span>
      </div>
    </div>
  );
};

export default AdminUser;
