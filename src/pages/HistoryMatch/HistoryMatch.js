import React, { useState, useEffect } from "react";
import { Table, Tag,  Input, Checkbox, PageHeader} from "antd";
import { useHistory } from 'react-router-dom';
import Axios from "axios";
import config from "../../config/config.json";
import { Link, Route } from "react-router-dom";
import ViewChat from "../../components/ViewChat/ViewChat";
const { Search } = Input;

function HistoryMatch(props) {
  const [filter, setFilter] = useState("active");
  const token = localStorage.getItem("admin-token");
  const [data, setData] = useState([]);
  const userId = props.match.params.id;
  console.log("iddd ",userId);
  let history = useHistory();
  

  // useEffect(scrollToBottom, [messages]);
  useEffect(async () => {
    const response = await Axios.get(`${config.dev.path}/room/user/${userId}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    });
    console.log("res ", response);
    if (response.data.status === "SUCCESS") setData(response.data.data);
    // scrollToBottom();
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
      title: "Time(minute)",
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
      render: (_, record) => <ViewChat id={record.id} />
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
      <PageHeader
        className="site-page-header"
        ghost={true}
        onBack={() => history.goBack()}
        title="History matches"
        subTitle="These are matches which player joined"
      />
      ,
      <Table
        columns={columns}
        dataSource={data}
        bordered
        // style={{ marginTop: "20px" }}
      />
    </div>
  );
}

export default HistoryMatch;
