import React, { useState, useEffect } from "react";
import {
  Skeleton,
  Switch,
  Card,
  Icon,
  Avatar,
  Form,
  Input,
  Button
} from "antd";
import DynamicCard from "./DynamicCard";

function Task(props) {
  const [lines, setLines] = useState([0]);
  const [loading, setLoading] = useState(true);
  const [disabledBtn, setDisabled] = useState(true);
  const { getFieldDecorator } = props.form;
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  const appendCard = e => {
    e.preventDefault();
    props.form.validateFields((err, values) => {
      if (!err) {
        setDisabled(false);
        console.log("Received values of form: ", values);
        return lines.map(m => (
          <DynamicCard
            key={m}
            caption={`Click ${m}`}
            pstate={{ lines, setLines }}
          />
        ));
      }
    });
  };

  return (
    <Card style={{ width: 300, marginTop: 16 }}>
      <Skeleton loading={loading} avatar active>
        <Form onSubmit={appendCard} className="login-form">
          <Form.Item>
            {getFieldDecorator("Text", {
              rules: [{ required: true, message: "Text cannot be empty !" }]
            })(
              <Input
                prefix={
                  <Icon type="form" style={{ color: "rgba(0,0,0,.25)" }} />
                }
                placeholder="Text"
              />
            )}
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="login-form-button"
              disabled={disabledBtn}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Skeleton>
    </Card>
  );
}

export default Form.create()(Task);
