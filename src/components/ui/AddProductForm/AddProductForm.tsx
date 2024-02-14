import { Button, Form, Input, InputNumber, Select } from "antd";
import Loading from "../Loading";
import { TProduct } from "../../../types/product.types";
import { useLocation } from "react-router-dom";

type AddProductFormParams = {
  handleSubmit: (values: TProduct) => Promise<void>;
  isLoading: boolean;
  productValues?: TProduct | object;
  type?: string;
};

const AddProductForm = ({
  handleSubmit,
  isLoading,
  productValues,
  type,
}: AddProductFormParams) => {
  const [form] = Form.useForm();
  const { pathname } = useLocation();

  const buttonText = type !== "create" ? "Edit Product" : "Add Product";

  const handleClear = () => {
    form.resetFields();
  };

  return (
    <Form
      form={form}
      onFinish={handleSubmit}
      labelCol={{ span: 24 }}
      wrapperCol={{ span: 24 }}
      layout="vertical"
      className="addProduct-form"
      initialValues={productValues}
      style={{ marginLeft: "auto", marginRight: "auto" }}
    >
      <Form.Item
        label={`Name ${
          pathname === "/all-products" && type === "create"
            ? "(Change name if creating a variant)"
            : ""
        }`}
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
      <Form.Item label="Price" name="price" rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item label="Quantity" name="quantity" rules={[{ required: true }]}>
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Frame material"
        name="frameMaterial"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="metal">Metal</Select.Option>
          <Select.Option value="plastic">Plastic</Select.Option>
          <Select.Option value="acetate">Acetate</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        label="Frame shape"
        name="frameShape"
        rules={[{ required: true }]}
      >
        <Select>
          <Select.Option value="rectangular">Rectangular</Select.Option>
          <Select.Option value="round">Round</Select.Option>
          <Select.Option value="cat-eye">Cat-eye</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Lens type" name="lensType" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="single-vision">Single-vision</Select.Option>
          <Select.Option value="bifocal">Bifocal</Select.Option>
          <Select.Option value="progressive">Progressive</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Brand" name="brand" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item label="Gender" name="gender" rules={[{ required: true }]}>
        <Select>
          <Select.Option value="men">Men</Select.Option>
          <Select.Option value="women">Women</Select.Option>
          <Select.Option value="unisex">Unisex</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item label="Color" name="color" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="Temple length"
        name="templeLength"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <Form.Item
        label="Bridge size"
        name="bridgeSize"
        rules={[{ required: true }]}
      >
        <InputNumber />
      </Form.Item>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: "15px",
        }}
      >
        <Form.Item wrapperCol={{ span: 24 }}>
          <Button
            style={{ width: "100%" }}
            className={`${type === "create" && "bg-green"}`}
            type="primary"
            htmlType="submit"
          >
            {isLoading ? <Loading /> : buttonText}
          </Button>
        </Form.Item>
        {pathname === "/add-product" && (
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              style={{ width: "100%" }}
              type="primary"
              danger
              onClick={handleClear}
            >
              Clear
            </Button>
          </Form.Item>
        )}
      </div>
    </Form>
  );
};

export default AddProductForm;
