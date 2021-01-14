import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Table, Tag, Space, Input, Radio, message } from "antd";
import Axios from "axios";
import "./ManageUser.scss";
import ModalInfoUser from "../../components/InformationUser/ModalInfoUser";
import config from "../../config/config.json";
import { Link } from "react-router-dom";
const { Search } = Input;

function ManageUser(props) {
  const [filter, setFilter] = useState("active");
  const token = localStorage.getItem("admin-token");
  const [data, setData] = useState([]);
  useEffect(async () => {
    const response = await Axios.get(`${config.dev.path}/user`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    if (response.data.status === "SUCCESS") setData(response.data.data);
  }, []);

  const blockUser = async (record) => {
    const response = await Axios.put(
      `${config.dev.path}/block/user/${record.id}`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    console.log("res ", response);
    if (response.data.status === "SUCCESS") {
      message.success(response.data.data.message);
      const getUser = await Axios.get(`${config.dev.path}/user`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (getUser.data.status === "SUCCESS") setData(getUser.data.data);
    } else message.error(response.data.data.message);
  };

  const columns = [
    {
      title: "Username",
      dataIndex: "username",
      key: "username",
      render: (text, record) => (
        <ModalInfoUser userName={text} infor={record} />
      ),
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
      filters: [
        {
          text: "ACTIVATED",
          value: "activated",
        },
        {
          text: "INACTIVATED",
          value: "inactivated",
        },
        {
          text: "BLOCK",
          value: "block",
        },
      ],
      onFilter: (value, record) => record.status.indexOf(value) === 0,
      render: (status) => {
        let colorText = status.toUpperCase() === "ACTIVATED" ? "green" : "red";

        return (
          <Tag color={colorText} key={status}>
            {status.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: "History Match",
      render: (_, record) => (
        <Link
          to={`/admin/history/user/${record.id}`}
          style={{ color: "#a0d911", fontWeight: "600" }}
        >
          View History Matches
        </Link>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return record.status === "activated" ? (
          <a onClick={() => blockUser(record)}>Block</a>
        ) : (
          ""
        );
      },
    },
  ];
  window.data = data;

  const onSearch = async (value) => {
    await console.log(value);
    const response = await Axios.post(
      `${config.dev.path}/search`,
      {
        search: value,
      },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    console.log("res ", response);
    if (response.data.status === "SUCCESS") setData(response.data.data);
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
  const onChangeSearch = async (e) => {
    if (!e.target.value) {
      const response = await Axios.get(`${config.dev.path}/user`, {
        headers: {
          Authorization: `token ${token}`,
        },
      });
      if (response.data.status === "SUCCESS") setData(response.data.data);
    }
  };

  return (
    <div>
      <div style={{ display: "flex" }}>
        <Search
          placeholder="Tìm kiếm người dùng theo username, email"
          onChange={onChangeSearch}
          onSearch={onSearch}
          style={{ width: 400 }}
        />
        <br />
        {/* <Radio.Group
          options={options}
          onChange={onChange}
          value={filter}
          optionType="button"
          buttonStyle="solid"
        /> */}
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
