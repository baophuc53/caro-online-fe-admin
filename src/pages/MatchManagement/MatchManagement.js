import React, { useState, useEffect } from "react";
import { Table, Tag, Space, Input, Radio, Checkbox } from "antd";
// import "./MatchManagement.scss";
import ModalInfoUser from "../../components/InformationUser/ModalInfoUser";
import Axios from "axios";
import config from "../../config/config.json";
import { Link, Route } from "react-router-dom";
import ViewChat from "../../components/ViewChat/ViewChat";
const { Search } = Input;

function MatchManagement(props) {
  const [filter, setFilter] = useState("active");
  const token = localStorage.getItem("admin-token");
  const [data, setData] = useState([]);
  useEffect(() => {
    const response = Axios.get(`${config.dev.path}/room`, {
      headers: {
        Authorization: `token ${token}`,
      },
    }).then((response) => {
    console.log("res ", response);
    if (response.data.status == "SUCCESS") setData(response.data.data);
    });
  }, []);
  const columns = [
    {
      title: "Room",
      dataIndex: "name_room",
      key: "name_room",
    },
    {
      title: "Code to join",
      dataIndex: "join_code",
      key: "join_code",
    },
    {
      title: "Owner",
      dataIndex: "owner",
      key: "owner",
    },
    {
      title: "Private",
      key: ["private", "data"],
      dataIndex: ["private", "data"],

      render: (check) => <Checkbox checked={check[0]} />,
    },
    {
      title: "Time(second)",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "Winner",
      dataIndex: "winner",
      key: "winner",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => {
        let color;
        if (text === "online") color = "blue";
        else if (text === "offline") color = "";
        else color = "#FF7F50";
        return <Tag color={color}>{text.toUpperCase()}</Tag>;
      },
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => <ViewChat id={record.id} />,
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
  console.log(data);
  return (
    <div>
      {/* <div style={{ display: "flex" }}> */}
      {/* <Search
          placeholder="Tìm kiếm người dùng theo tên, email"
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
        /> */}
      {/* </div> */}
      <Table
        columns={columns}
        dataSource={data.reverse()}
        bordered
        // style={{ marginTop: "20px" }}
      />
    </div>
  );
}

export default MatchManagement;
