/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd";
import { TUser } from "../../../redux/features/auth/authSlice";
import "./SingleUser.css";
import { useChangeUserRoleMutation } from "../../../redux/features/users/usersApi";
import Loading from "../Loading";
import { toast } from "sonner";

type SingleUserParam = {
  item: Partial<TUser>;
  refetch: any;
};

const SingleUser = ({ item, refetch }: SingleUserParam) => {
  const [changeUserRole, { isLoading }] = useChangeUserRoleMutation();

  const makeManager = async () => {
    const userObj = {
      id: item._id,
      body: {
        role: "manager",
      },
    };
    const result = await changeUserRole(userObj).unwrap();
    if (result.success) {
      toast.success(result.message);
    }
    refetch();
  };
  const makeUser = async () => {
    const userObj = {
      id: item._id,
      body: {
        role: "user",
      },
    };
    const result = await changeUserRole(userObj).unwrap();
    if (result.success) {
      toast.success(result.message);
    }
    refetch();
  };

  return (
    <div key={item._id} className="user-box">
      <div className="user-box-info">
        <h4>
          {item.username} <span>({item.role})</span>
        </h4>
        <p>{item.email}</p>
      </div>
      {item?.role === "user" && (
        <Button
          className="user-box-btn"
          type="primary"
          style={{ width: "120px" }}
          onClick={makeManager}
        >
          {isLoading ? <Loading /> : "Make Manager"}
        </Button>
      )}
      {item?.role === "manager" && (
        <Button
          className="user-box-btn"
          type="primary"
          danger
          style={{ width: "120px" }}
          onClick={makeUser}
        >
          {isLoading ? <Loading /> : "Make User"}
        </Button>
      )}
    </div>
  );
};

export default SingleUser;
