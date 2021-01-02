import React, { useState } from "react";
import PropTypes from "prop-types";
import { Table, Tag, Space, Input, Radio } from "antd";
import "./ManageUser.scss";
const { Search } = Input;

function ManageUser(props) {
  const [filter, setFilter] = useState("active");
  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Nickname",
      dataIndex: "nickname",
      key: "nickname",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (status) => {
        let colorText = status === "active" ? "green" : "red";

        return (
          <Tag color={colorText} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "History Match",
      render: () => (
        <a style={{ color: "#a0d911", fontWeight: "600" }}>
          View History Matches
        </a>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => <a>Block</a>,
    },
  ];

  const data = [
    {
      key: "1",
      username: "quanky",
      nickname: "Killer Warning",
      email: "quanky99@gmail.com",
      status: "active",
    },
    {
      key: "2",
      username: "quanky99",
      nickname: "Best Quan Ky",
      email: "quanky99@gmail.com",
      status: "unactive",
    },
  ];

  const onSearch = (value) => {
    console.log(value);
  };

  const options = [
    { label: "ACTIVE", value: "active" },
    { label: "BLOCKED", value: "blocked" },
    { label: "ALL", value: "all" },
  ];

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setFilter(e.target.value);
  };

  return (
    <div>
      <div style={{display: 'flex'}}>
        <Search
          placeholder="input search text"
          onSearch={onSearch}
          style={{ width: 300 }}
        />
        <br />
        <Radio.Group
          // style={{ marginTop: "20px" }}
          options={options}
          onChange={onChange}
          value={filter}
          optionType="button"
          buttonStyle="solid"
        />
      </div>
      <Table
        columns={columns}
        dataSource={data}
        bordered
        style={{ marginTop: "20px" }}
      />
    </div>
  );
}

export default ManageUser;
