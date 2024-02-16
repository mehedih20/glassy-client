import { Button, Modal } from "antd";
import { FcOk } from "react-icons/fc";
import "./SingleProduct.css";
import Loading from "../../ui/Loading";
import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useUpdateProductMutation,
} from "../../../redux/features/products/productsApi";
import { TProduct } from "../../../types/product.types";
import { useState } from "react";
import AddProductForm from "../AddProductForm/AddProductForm";
import { toast } from "sonner";
import { useAppSelector } from "../../../redux/hooks";

type SingleProductParam = {
  data: TProduct;
  multipleSelected: boolean;
  handleCheckbox: (checked: boolean, id: string) => void;
};

const SingleProduct = ({
  data,
  multipleSelected,
  handleCheckbox,
}: SingleProductParam) => {
  // modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  // rtq query hooks
  const [deleteProduct, { isLoading: deleteLoading }] =
    useDeleteProductMutation();
  const [updateProduct, { isLoading: editLoading }] =
    useUpdateProductMutation();
  const [createProduct, { isLoading: createLoading }] =
    useCreateProductMutation();

  const handleEditSubmit = async (values: TProduct) => {
    const newObj = {
      id: data._id,
      data: values,
    };
    const result = await updateProduct(newObj).unwrap();
    if (result?.success) {
      toast.success("Product updated successfully!");
    } else {
      toast.error("Something went wrong!");
    }
    setIsEditModalOpen(false);
  };

  const handelCreateSubmit = async (values: TProduct) => {
    const newProductObj = {
      ...values,
      createdBy: user?.email,
    };
    const result = await createProduct(newProductObj).unwrap();
    if (result?.success) {
      toast.success(result?.message);
    } else {
      toast.error("Something went wrong!");
    }
    setIsVariantModalOpen(false);
  };

  const {
    _id,
    name,
    price,
    productImg,
    quantity,
    frameMaterial,
    frameShape,
    lensType,
    brand,
    gender,
    color,
    templeLength,
    bridgeSize,
  } = data;

  return (
    <>
      {/* Modal for editing */}
      <Modal
        title="Edit Product"
        open={isEditModalOpen}
        onOk={() => setIsEditModalOpen(false)}
        onCancel={() => setIsEditModalOpen(false)}
        width={700}
      >
        <AddProductForm
          handleSubmit={handleEditSubmit}
          isLoading={editLoading}
          productValues={data}
        />
      </Modal>

      {/* Modal for creating variant */}
      <Modal
        title="Create Variant"
        open={isVariantModalOpen}
        onOk={() => setIsVariantModalOpen(false)}
        onCancel={() => setIsVariantModalOpen(false)}
        width={700}
      >
        <AddProductForm
          handleSubmit={handelCreateSubmit}
          isLoading={createLoading}
          productValues={data}
          type="create"
        />
      </Modal>

      {/* Single product box */}
      <div key={_id} className="product-box">
        <div
          className={`product-checkbox ${multipleSelected && "display-flex"}`}
        >
          <input
            type="checkbox"
            name=""
            id=""
            onChange={(e) => handleCheckbox(e.target.checked, _id as string)}
          />
        </div>
        <div className="product-content">
          <FcOk className="product-icon" />
          <div className="product-desc">
            <div className="product-img">
              <img src={productImg} alt="productImg" />
            </div>
            <h2>{name}</h2>
            <p>
              <span>Brand:</span> {brand}
            </p>
            <p>
              <span>Frame material:</span> {frameMaterial}
            </p>
            <p>
              <span>Frame shape:</span> {frameShape}
            </p>
            <p>
              <span>Lens type:</span> {lensType}
            </p>
            <p>
              <span>Temple length:</span> {templeLength}
            </p>
            <p>
              <span>Bridge size:</span> {bridgeSize}
            </p>
            <p>
              <span>Gender:</span> {gender}
            </p>
            <p>
              <span>Color:</span> {color}
            </p>
            <p>
              <span>Quantity:</span> {quantity}
            </p>
            <p>
              <span>Price:</span> {price}
            </p>
          </div>
        </div>
        <div className="product-btns">
          <Button type="primary" onClick={() => setIsEditModalOpen(true)}>
            Edit
          </Button>
          <Button type="primary" danger onClick={() => deleteProduct(_id)}>
            {deleteLoading ? <Loading /> : "Delete"}
          </Button>
          <Button
            type="primary"
            onClick={() => setIsVariantModalOpen(true)}
            className="bg-green-dark"
          >
            Create variant
          </Button>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
