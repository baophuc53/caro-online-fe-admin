import React, { useState, useEffect, useRef } from "react";
import { Drawer, Select, List, Avatar } from "antd";
import Axios from "axios";
import config from "../../config/config.json";
const moment = require("moment");

function ViewChat({id}) {
  const [visible, setVisible] = useState(false);
  const token = localStorage.getItem("admin-token");
  const messagesEndRef = useRef(null);
  window.mess = messagesEndRef;
  const scrollToBottom = () => {
    messagesEndRef.current && messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };
  useEffect(scrollToBottom, [id]);
  const [data, setData] = useState([]);

  const showDrawer = async () => {
    setVisible(true);
    const response = await Axios.get(
      `${config.dev.path}/room/${id}/chat`,
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    if (response.data.status === "SUCCESS") {
      setData(response.data.data);
      console.log("data ", data);
    }
  };

  const onClose = () => {
    setVisible(false);
  };
  const data2 = [
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
    {
      username: "aaa",
      time_stamp: "2021-01-06 16:06:35",
      chat_content: "hiiii",
    },
  ];
  return (
    <>
      <a type="primary" onClick={showDrawer}>
        View chat
      </a>
      <Drawer
        title="Room"
        width={720}
        onClose={onClose}
        visible={visible}
        bodyStyle={{ paddingBottom: 80 }}
        footer={null}
      >
        <div>
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        paddingBottom: "3px",
                      }}
                    >
                      <div style={{ color: "#1890ff" }}>
                        {item?.username.toUpperCase()}
                      </div>
                      <div>
                        {" "}
                        {moment(item?.time_stamp).format(
                          "MMMM Do YYYY, h:mm:ss a"
                        )}
                      </div>
                    </div>
                  }
                  description={item?.chat_content}
                />
              </List.Item>
            )}
          />
          <div ref={messagesEndRef} />
        </div>
      </Drawer>
    </>
  );
}
export default ViewChat;
