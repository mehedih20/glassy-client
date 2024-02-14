import { Button, Layout, Menu } from "antd";
import { Outlet, useLocation } from "react-router-dom";
import { sideNavGenerator } from "../../utils/sideNavGenerator";
import { userPaths } from "../../routes/user.routes";
import UserDashboard from "../../pages/Dashboard/Dashboard";
import { useAppDispatch } from "../../redux/hooks";
import { logout } from "../../redux/features/auth/authSlice";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Layout>
      <Sider breakpoint="lg" collapsedWidth="0">
        <div
          style={{
            display: "flex",
            marginTop: "15px",
            marginBottom: "15px",
          }}
        >
          <h1 style={{ color: "#fff", marginLeft: "28px", fontSize: "30px" }}>
            Glassy
          </h1>
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["0"]}
          items={sideNavGenerator(userPaths)}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: "0 20px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Button onClick={handleLogout} type="primary">
              Logout
            </Button>
          </div>
        </Header>
        <Content style={{ margin: "24px 5px 0" }}>
          <div
            style={{
              padding: "20px 10px",
              minHeight: 360,
            }}
          >
            {location.pathname === "/" ? <UserDashboard /> : <Outlet />}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Glassy | Your eye care ©{new Date().getFullYear()} Created by Mehedi
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
