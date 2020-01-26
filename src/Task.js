import React, { useState, useEffect } from "react";
import {
  Skeleton,
  Card,
  Icon,
  Form,
  Input,
  Button
} from "antd";
import axios from 'axios';
import DynamicCard from "./DynamicCard";


function Task(props) {
  let refInputText = null;
  const [cards, addCard] = useState([]);
  const [apiColor, setApiColor] = useState("");
  const [reverseColor, setReverseColor] = useState("");
  const [loading, setLoading] = useState(true);
  const [inputText, setInputText] = useState('');
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
        document.title = inputText
        props.form.resetFields()
        axios.get('http://api.creativehandles.com/getRandomColor')
          .then(res => {
            console.log(res.status);
            
            if (res.status == 200) {
              setApiColor(res.data.color)
              setReverseColor("#" + invertColor(apiColor.replace("#", "")))
            } else {
              setApiColor("#6d4298")
              setReverseColor("#FFFFFF")
              alert("Something bad happened !");
            }
          }).catch(err => {
              console.log(err)
              setApiColor("#6d4298")
              setReverseColor("#FFFFFF")
          })
        console.log("Received values of form: ", values);
        addCard([
          ...cards,
          {
            id: cards.length,
            caption: inputText,
            apiColor:apiColor,
            reverseColor:reverseColor
          }
        ]);
      }
    });
  };

  const invertColor = (hex) => {
    return (Number(`0x1${hex}`) ^ 0xffffff)
      .toString(16)
      .substr(1)
      .toUpperCase();
  }

  const handleTextChange = e => {
    setInputText(e.target.value)
  }

  return (
    <div>
      <Card title="Some Random Texts" style={{ width: 300, marginTop: 16 }} bodyStyle={{ paddingBottom: 0 }}>
        <Skeleton loading={loading} paragraph active>
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
                  onChange={handleTextChange}
                  autoFocus={true}
                  ref={(input) => { refInputText = input; }}
                  autoComplete="off"
                />
              )}
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                disabled={!inputText}
              >
                Submit
            </Button>
            </Form.Item>
          </Form>
        </Skeleton>
      </Card>
      {cards.map(card => (
        <DynamicCard key={card.id} caption={card.caption} apiColor={card.apiColor} reverseColor={card.reverseColor} />
      ))}
    </div>
  );
}

export default Form.create()(Task);
