import React, { useEffect, useState } from "react";
import Table from "../../component/VTable";
import Layout from "../../component/Layout";
import { Link } from "react-router-dom";
import apiService from "../../servises/apiServises";

export default function Product() {
  const [productData, setProductData] = useState([]);
  const [perPage, setPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const columns = [
    {
      title: "#",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Product Image",
      dataIndex: "imagePath",
      key: "imagePath",
      render: (item) => (
        <>
          <div className="m-auto flex justify-center">
            <img
              src={item.imagePath}
              alt="productimg"
              width="50px"
              height="50px"
              className="rounded"
            />
          </div>
        </>
      ),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
  ];

  // useEffect(() => {
  const fetchProductData = async (pageNumber) => {
    try {
      const response = await apiService.get(
        `/product-list?page=${pageNumber}&perPage=${perPage}`
      );

      setProductData(response.data);
      setCurrentPage(pageNumber);
      setTotalPages(response.data.lastPage);
    } catch (error) {
      console.error("Error fetching product data:", error);
    }
  };

  // }, []);

  const handlePageChange = (event, newPage) => {
    fetchProductData(newPage);
  };

  const handleRowsPerPageChange = (value) => {
    setPerPage(value);
    setCurrentPage(1); // Reset to the first page when changing per page
    fetchProductData(1); // Fetch data for the first page with the new perPage value
  };

  useEffect(() => {
    fetchProductData(currentPage);
  }, [currentPage, perPage]);

  return (
    <>
      <Layout>
        <div className="bg-white p-4 mb-2 rounded-lg  dark:border-gray-700 mt-14">
          <div>
            <h3 class="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
              Product
            </h3>
          </div>
        </div>
        <div className="bg-white">
          <div className="p-4 rounded-lg dark:border-gray-700 ">
            <div className="flex justify-end mb-3 p-2">
              <Link
                to="/Add-product"
                className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
              >
                Add Product
              </Link>
            </div>

            <Table
              cols={columns}
              data={productData.data || []}
              totalPages={totalPages} // Adjust this based on your API response
              page={currentPage} // Pass the current page to the Table component
              handlePageChange={handlePageChange}
              handleRowsPerPageChange={handleRowsPerPageChange}
              selectedRowsPerPage={perPage} //
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
