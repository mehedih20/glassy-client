/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, DatePicker, Form, Input, InputNumber, Modal } from "antd";
import { TProduct } from "../../../types/product.types";
import "./SellSingleProduct.css";
import { useState } from "react";
import { useCreateSaleMutation } from "../../../redux/features/sales/salesApi";
import { toast } from "sonner";
import Loading from "../Loading";

type TDate = {
  $d: Date;
};

type FieldType = {
  quantity: number;
  buyerName: string;
  dateOfSale: TDate;
};

type ParamType = {
  data: TProduct;
  refetch?: any;
  location?: string;
};

const SellSingleProduct = ({ data, refetch, location }: ParamType) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [createSale, { isLoading }] = useCreateSaleMutation();
  const [form] = Form.useForm();
  const { _id, name, price, quantity, brand } = data;

  const handleSell = async (values: FieldType) => {
    const newObj = {
      productId: _id,
      data: {
        productName: name,
        brand,
        price,
        quantity: values.quantity,
        buyerName: values.buyerName,
        dateOfSale: new Date(values.dateOfSale.$d).toISOString().split("T")[0],
      },
    };

    await createSale(newObj);
    setIsModalOpen(false);
    toast.success("Eye glass sold successfully");
    refetch();
  };

  return (
    <>
      {/* Modal for selling */}
      <Modal
        title="Order details"
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        onCancel={() => setIsModalOpen(false)}
      >
        <p className="sell-modal-text">
          <span style={{ fontWeight: "bold" }}>Product:</span> {name}
        </p>
        <p
          className="sell-modal-text"
          style={{
            marginBottom: "20px",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Available:</span> {quantity}
        </p>
        <Form
          form={form}
          layout="vertical"
          autoComplete="off"
          onFinish={handleSell}
        >
          <Form.Item
            name="quantity"
            label="Quantity to be sold"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator() {
                  if (
                    getFieldValue("quantity") <= quantity &&
                    getFieldValue("quantity") > 0
                  ) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error("Invalid quantity"));
                },
              }),
            ]}
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="buyerName"
            label="Name of the buyer"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Date of sell"
            name="dateOfSale"
            rules={[{ required: true, message: "Please input!" }]}
          >
            <DatePicker style={{ width: "100%" }} format={"YYYY-MM-DD"} />
          </Form.Item>

          <Form.Item>
            <Button
              htmlType="submit"
              type="primary"
              style={{ width: "100%", marginTop: "15px" }}
              danger
            >
              {isLoading ? <Loading /> : "Sell"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* Product */}

      <div className="sell-product-box">
        <div className="sell-product-box-text">
          <h2>{name}</h2>
          <p>
            <span>Price:</span>
            {price}
          </p>
          <p>
            <span>Quantity:</span>
            {quantity}
          </p>
          <p>
            <span>Brand:</span>
            {brand}
          </p>
        </div>
        {location !== "dashboard" && (
          <Button
            type="primary"
            danger
            className="sell-product-box-btn"
            onClick={() => setIsModalOpen(true)}
          >
            Sell
          </Button>
        )}
      </div>
    </>
  );
};

export default SellSingleProduct;
