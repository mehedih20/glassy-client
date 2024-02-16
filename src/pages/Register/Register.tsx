import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined, MailOutlined } from "@ant-design/icons";
import "./Register.css";
import { toast } from "sonner";
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { useNavigate } from "react-router-dom";
import Loading from "../../components/ui/Loading";

type FieldType = {
  username?: string;
  email?: string;
  password?: string;
};

const Register = () => {
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  const onFinish = async (values: FieldType) => {
    const toastId = toast.loading("Registering");

    try {
      await register(values);
      toast.success("Registration successful", { id: toastId });
      navigate("/login");
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div className="section-register">
      <div className="register-container">
        <h1>
          Register on <span>Glassy</span>
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
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input
              prefix={<MailOutlined className="color-grey" />}
              placeholder="Email"
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
              {isLoading ? <Loading /> : "Register"}
            </Button>
            <Button
              type="link"
              onClick={() => navigate("/login")}
              style={{ width: "100%", marginTop: "1rem" }}
            >
              Login
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Register;
