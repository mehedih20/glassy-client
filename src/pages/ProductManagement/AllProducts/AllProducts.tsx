/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Checkbox,
  Divider,
  Drawer,
  Form,
  Slider,
  Space,
  Typography,
} from "antd";
import { FilterOutlined } from "@ant-design/icons";
import {
  useDeleteProductInBulkMutation,
  useGetDistinctProductValuesQuery,
  useGetHighestPriceQuery,
  useGetProductsQuery,
} from "../../../redux/features/products/productsApi";
import "./AllProducts.css";
import { useState } from "react";
import Loading from "../../../components/ui/Loading";
import { TProduct } from "../../../types/product.types";
import SingleProduct from "../../../components/ui/SingleProduct/SingleProduct";

const { Text } = Typography;

type DrawerItem = {
  title: string;
  values: string[];
};

const fixedOptions = [
  {
    title: "Frame material",
    values: ["metal", "plastic", "acetate"],
  },
  {
    title: "Frame shape",
    values: ["rectangular", "round", "cat-eye"],
  },
  {
    title: "Lens type",
    values: ["single-vision", "bifocal", "progressive"],
  },
  {
    title: "Gender",
    values: ["men", "women", "unisex"],
  },
];

function toCamelCase(inputString: string) {
  return inputString
    .replace(/(?:^\w|[A-Z]|\b\w)/g, (word, index) => {
      return index === 0 ? word.toLowerCase() : word.toUpperCase();
    })
    .replace(/\s+/g, "");
}

const AllProducts = () => {
  const [queryObject, setQueryObject] = useState({});
  const [multipleSelected, setMultipleSelected] = useState(false);
  const [itemsToBeDeleted, setItemsToBeDeleted] = useState<string[]>([]);
  const {
    data: productData,
    isFetching,
    refetch,
  } = useGetProductsQuery(queryObject);
  const { data: distinctData } = useGetDistinctProductValuesQuery(undefined);
  const { data: highestPriceData } = useGetHighestPriceQuery(undefined);
  const [deleteInBulk] = useDeleteProductInBulkMutation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [form] = Form.useForm();

  const highestPrice = Math.ceil(highestPriceData?.result?.price);

  const handleCheckbox = (checked: boolean, id: string) => {
    if (checked) {
      if (!itemsToBeDeleted.includes(id)) {
        setItemsToBeDeleted((prev) => [...prev, id]);
      }
    } else {
      if (itemsToBeDeleted.includes(id)) {
        const newArr = itemsToBeDeleted.filter((item) => item !== id);
        setItemsToBeDeleted(newArr);
      }
    }
  };

  const handleBulkDelete = async () => {
    await deleteInBulk(itemsToBeDeleted);
    setMultipleSelected(false);
  };

  const handleApplyFilter = (values: any) => {
    setQueryObject(() => values);
    setDrawerOpen(false);
  };

  const handleClearFilter = () => {
    setQueryObject({});
    setDrawerOpen(false);
    refetch();
  };

  return (
    <>
      {/* Filter Drawer */}
      <Drawer
        title="Filter"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
      >
        <Form
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={handleApplyFilter}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "10px",
            }}
          >
            <Button
              htmlType="submit"
              type="primary"
              style={{
                width: "100%",
                marginBottom: "20px",
                backgroundColor: "#043d54",
              }}
            >
              Apply
            </Button>
            <Button
              htmlType="reset"
              type="primary"
              danger
              style={{
                width: "100%",
                marginBottom: "20px",
              }}
              onClick={handleClearFilter}
            >
              Clear
            </Button>
          </div>
          <Space direction="vertical">
            <Text strong>Price range</Text>
            <Form.Item name={toCamelCase("price")}>
              <Slider
                range={{ draggableTrack: true }}
                min={0}
                max={highestPrice}
                defaultValue={[0, highestPrice]}
                style={{ width: "200px" }}
              />
            </Form.Item>
          </Space>
          <Divider />
          {fixedOptions.map((item, index) => (
            <div key={index}>
              <Space direction="vertical">
                <Text strong>{item.title}</Text>
                <Form.Item key={index} name={toCamelCase(item.title)}>
                  <Checkbox.Group options={item.values} />
                </Form.Item>
              </Space>
              <Divider />
            </div>
          ))}

          {distinctData &&
            distinctData.data.map((item: DrawerItem, index: number) => (
              <div key={index}>
                <Space direction="vertical">
                  <Text strong>{item.title}</Text>
                  <Form.Item key={index} name={toCamelCase(item.title)}>
                    <Checkbox.Group options={item.values} />
                  </Form.Item>
                </Space>
                <Divider />
              </div>
            ))}
        </Form>
      </Drawer>

      {/* All Products */}

      <div className="allProducts">
        <h1 className="page-title">All Products</h1>
        <div className="container">
          <div className="product-utils">
            <Button
              type="primary"
              onClick={() => setDrawerOpen(true)}
              style={{ backgroundColor: "#043d54" }}
            >
              <FilterOutlined />
              Filter
            </Button>

            <div className="product-utils-btns">
              {multipleSelected && (
                <Button
                  type="primary"
                  danger
                  disabled={itemsToBeDeleted.length > 0 ? false : true}
                  onClick={handleBulkDelete}
                >
                  Delete
                </Button>
              )}
              <Button
                type="primary"
                style={{ backgroundColor: "#043d54" }}
                onClick={() => setMultipleSelected(!multipleSelected)}
              >
                {multipleSelected ? "Cancel" : "Delete Multiple"}
              </Button>
            </div>
          </div>
          <div className="products-container">
            {isFetching ? (
              <Loading />
            ) : productData.products.length > 0 ? (
              productData?.products.map((item: TProduct) => (
                <SingleProduct
                  key={item._id}
                  data={item}
                  multipleSelected={multipleSelected}
                  handleCheckbox={handleCheckbox}
                />
              ))
            ) : (
              <p className="empty-data-text">No product found!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AllProducts;
