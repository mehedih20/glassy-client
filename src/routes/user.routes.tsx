import AddProduct from "../pages/ProductManagement/AddProduct/AddProduct";
import AllProducts from "../pages/ProductManagement/AllProducts/AllProducts";
import SalesHistory from "../pages/SalesManagement/SalesHistory/SalesHistory";
import SellProduct from "../pages/SalesManagement/SellProduct/SellProduct";
import Dashboard from "../pages/Dashboard/Dashboard";
import ManageUser from "../pages/ManageUser/ManageUser";
import SuperAdminRoute from "../components/layout/SuperAdminRoute";

export const userPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Manage Products",
    children: [
      {
        name: "Add Product",
        path: "add-product",
        element: <AddProduct />,
      },
      {
        name: "All Products",
        path: "all-products",
        element: <AllProducts />,
      },
    ],
  },
  {
    name: "Manage Sales",
    children: [
      {
        name: "Sell Product",
        path: "sell-product",
        element: <SellProduct />,
      },
      {
        name: "Sales History",
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
];

export const superAdminPaths = [
  {
    name: "Dashboard",
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    name: "Manage User",
    path: "manageUser",
    element: (
      <SuperAdminRoute>
        <ManageUser />
      </SuperAdminRoute>
    ),
  },
  {
    name: "Manage Products",
    children: [
      {
        name: "Add Product",
        path: "add-product",
        element: <AddProduct />,
      },
      {
        name: "All Products",
        path: "all-products",
        element: <AllProducts />,
      },
    ],
  },
  {
    name: "Manage Sales",
    children: [
      {
        name: "Sell Product",
        path: "sell-product",
        element: <SellProduct />,
      },
      {
        name: "Sales History",
        path: "sales-history",
        element: <SalesHistory />,
      },
    ],
  },
];
