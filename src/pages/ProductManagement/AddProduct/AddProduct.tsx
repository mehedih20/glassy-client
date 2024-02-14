import "./AddProduct.css";
import { useCreateProductMutation } from "../../../redux/features/products/productsApi";
import { TProduct } from "../../../types/product.types";
import AddProductForm from "../../../components/ui/AddProductForm/AddProductForm";
import { toast } from "sonner";

const AddProduct = () => {
  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (values: TProduct) => {
    await createProduct(values);
    toast.success("Product created successfully");
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
