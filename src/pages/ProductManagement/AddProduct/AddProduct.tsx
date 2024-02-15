import "./AddProduct.css";
import { useCreateProductMutation } from "../../../redux/features/products/productsApi";
import { TProduct } from "../../../types/product.types";
import AddProductForm from "../../../components/ui/AddProductForm/AddProductForm";
import { toast } from "sonner";
import { useAppSelector } from "../../../redux/hooks";

const AddProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();
  const { user } = useAppSelector((state) => state.auth);

  const handleSubmit = async (values: TProduct) => {
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
  };

  return (
    <div className="addProduct">
      <h1 className="page-title">Add Product</h1>
      <div className="container">
        <div className="addProduct-container">
          <AddProductForm
            handleSubmit={handleSubmit}
            isLoading={isLoading}
            type="create"
          />
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
