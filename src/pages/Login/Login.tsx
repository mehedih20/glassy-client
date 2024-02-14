/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, ConfigProvider, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import "./Login.css";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { jwtDecode } from "jwt-decode";
import { TUser, setUser } from "../../redux/features/auth/authSlice";
import { useAppDispatch } from "../../redux/hooks";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../../components/ui/Loading";
import { toast } from "sonner";

type FieldType = {
  username?: string;
  password?: string;
};

const Login = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/dashboard" } };

  const onFinish = async (values: FieldType) => {
    try {
      const result = await login(values).unwrap();
      const verifiedUser = jwtDecode(result.data.token) as TUser;
      dispatch(setUser({ user: verifiedUser, token: result.data.token }));
      navigate(from);
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="section-register">
      <div className="register-container" style={{}}>
        <h1>
          Login to <span>Glassy</span>
        </h1>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={<UserOutlined className="color-grey" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              prefix={<LockOutlined className="color-grey" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>

          <Form.Item>
            <Button
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              className="login-form-button"
            >
              {isLoading ? (
                <ConfigProvider
                  theme={{
                    token: {
                      colorPrimary: "#043d54",
                    },
                  }}
                >
                  <Loading />
                </ConfigProvider>
              ) : (
                "Log in"
              )}
            </Button>
            <Button
              type="link"
              onClick={() => navigate("/register")}
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Register now!
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
