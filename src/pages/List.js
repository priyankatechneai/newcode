import React, { useEffect, useState, useCallback } from "react";
import Table from "../component/VTable";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { Trash2 } from "lucide-react";
import {fetchListData,deleteUser} from '../servises/apiServises.js'


export default function List() {
  const [list, setList] = useState([]);
  const [perPage, setPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
 
  const [isTableLoading, setIsTableLoading] = useState(false);

  const columns = [
    {
      title: "#",
      dataIndex: "srno",
      key: "srno",
    },
    {
      title: " Name",
      dataIndex: "name",
      
      key: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },

    {
      title: "Phone No",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Gender",
      dataIndex: "gender",
      key: "gender",
    },
    
    {
      title: "Action",
      render: (item) => (
        <>
          <div className="flex gap-1 text-center justify-center">
            <Link to="#">
              <Trash2
                color="#ff0000"
                onClick={() => handleDeleteUser(item.userId)}
                size={16}
              />
            </Link>
          </div>
        </>
      ),
      key: "action",
      width: 90,
    },
  ];

  const fetchData = useCallback(async () => {
    try {
      setIsTableLoading(true);

      const data = await fetchListData(currentPage, perPage);

      setList(data);
      setTotalPages(data.lastPage);
      setIsTableLoading(false);
    } catch (error) {
      console.error("Error fetching seller list data:", error);
    }
  }, [currentPage, perPage]);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (value) => {
    setPerPage(value);

    setCurrentPage(1); // Reset to the first page when changing per page
    fetchData(); // Fetch data for the first page with the new perPage value
  };

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDeleteUser = async (userId) => {
    try {
      const response = await deleteUser(userId);
      fetchData();
      alert(response.message);
    } catch (error) {
      console.error("Error deleting user:", error);

      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        alert(error.response.data.message);
      } else {
        alert("Error deleting user. Please try again later.");
      }
    }
  };


  return (
    <>
      <Layout>
        <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
          <div>
            <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
              List
            </h3>
          </div>
        </div>
        <div className="bg-white">
          <div className="p-4 rounded-lg dark:border-gray-700 ">
            <div className="flex justify-end mb-3 p-2">
              <Link
                to="/Stepperform"
                className="rounded-lg px-4 py-2 bg-green-700 text-green-100 hover:bg-green-800 duration-300"
              >
                Add
              </Link>
            </div>

            <Table
              cols={columns}
              data={list.data}
              totalPages={totalPages} // Adjust this based on your API response
              page={currentPage} // Pass the current page to the Table component
              handlePageChange={handlePageChange}
              handleRowsPerPageChange={handleRowsPerPageChange}
              onDeleteUser={handleDeleteUser}
              selectedRowsPerPage={perPage} //
            />
          </div>
        </div>
      </Layout>
    </>
  );
}
