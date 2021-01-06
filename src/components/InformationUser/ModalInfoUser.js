import React, { useState } from "react";
import { Modal,  Tag } from "antd";
import { Descriptions, Badge } from "antd";
import moment from 'moment'
import 'moment-timezone';

const ModalInfoUser = (props) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { infor } = props;
  console.log("infor", infor);
  return (
    <>
      <a type="primary" onClick={showModal}>
        {props.userName}
      </a>
      <Modal
        title="User Info"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width="1100px"
        footer={null}
      >
        <Descriptions bordered>
          <Descriptions.Item label="Username">
            {infor?.username}
          </Descriptions.Item>
          <Descriptions.Item label="Nickname">
            {infor?.nickname}
          </Descriptions.Item>
          <Descriptions.Item label="Email">{infor?.email}</Descriptions.Item>
          <Descriptions.Item label="Status" span={2}>
            {infor?.status.toLowerCase() === "activated" ? (
              <Badge status="processing" text="Actived" />
            ) : (
              <Badge status="error" text="Unactived" />
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Platform">
            {infor?.platform ? <Tag color="blue">{infor?.platform}</Tag>: null}
          </Descriptions.Item>
          <Descriptions.Item label="Started Time">
          {moment(infor?.time_join).format('MMMM Do YYYY, h:mm:ss a')}
          </Descriptions.Item>
          <Descriptions.Item label="Played">{infor?.played}</Descriptions.Item>
          <Descriptions.Item label="Won">{infor?.won}</Descriptions.Item>
        </Descriptions>
      </Modal>
    </>
  );
};

export default ModalInfoUser;
