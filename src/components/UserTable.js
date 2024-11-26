import React, { useState, useEffect } from "react";
import { Table, Spin } from "antd";
import axios from "axios";

const UserTable = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
  });

  useEffect(() => {
    fetchData();
  }, [pagination.current]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/users`
      );
      setData(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTableChange = (newPagination, _, sorter) => {
    setPagination(newPagination);
    if (sorter.order) {
      setData((prevData) =>
        [...prevData].sort((a, b) => {
          const valueA = sorter.field === "name" ? a.name : a.email;
          const valueB = sorter.field === "name" ? b.name : b.email;
          return sorter.order === "ascend"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        })
      );
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: true,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      render: (text) => <a href={`https://${text}`} target="_blank" rel="noreferrer">{text}</a>,
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <h2>User List</h2>
      <Spin spinning={loading}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{
            ...pagination,
            total: data.length,
            showSizeChanger: false,
          }}
          onChange={handleTableChange}
          rowKey="id"
        />
      </Spin>
    </div>
  );
};

export default UserTable;
