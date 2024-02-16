import { ConfigProvider, Space } from "antd";
import Search, { SearchProps } from "antd/es/input/Search";
import { useState } from "react";
import { useGetAllUsersQuery } from "../../redux/features/users/usersApi";
import { TUser } from "../../redux/features/auth/authSlice";
import SingleUser from "../../components/ui/SingleUser/SingleUser";

const ManageUser = () => {
  const [email, setEmail] = useState("");
  const { data, isFetching, refetch } = useGetAllUsersQuery(email);

  const onSearch: SearchProps["onSearch"] = (value: string) => {
    setEmail(value);
  };

  return (
    <>
      <div className="sellProduct">
        <h1 className="page-title">Manage User</h1>
        <div className="container">
          <div className="sellProduct-container">
            <div>
              <Space direction="vertical">
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#043d54",
                      fontSize: 14,
                    },
                  }}
                >
                  <Search
                    placeholder="Search by user email"
                    onSearch={onSearch}
                    loading={isFetching}
                    enterButton
                    width={400}
                    size="large"
                  />
                </ConfigProvider>
              </Space>
            </div>

            <div className="sellProduct-data">
              {!data ? (
                <h2 className="empty-data-text">No user to show</h2>
              ) : data?.data?.length > 0 ? (
                data.data.map((item: Partial<TUser>) => (
                  <SingleUser key={item._id} item={item} refetch={refetch} />
                ))
              ) : (
                <h2 className="empty-data-text">No users found!</h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ManageUser;
