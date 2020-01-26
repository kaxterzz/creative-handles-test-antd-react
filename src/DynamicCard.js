import React, { useEffect, useState } from 'react';
import {
  Skeleton,
  Card
} from "antd";

function DynamicCard(props) {
  const { caption } = props;
  const { apiColor } = props;
  const { reverseColor } = props;
  const [loading, setLoading] = useState(true);

  const cardStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return <div style={cardStyle}>
    <Card style={{ width: 300, marginTop: 16, backgroundColor: apiColor }} bodyStyle={{ color: reverseColor, fontSize: 20 }}>
      {caption}
    </Card>
  </div>;
}

export default DynamicCard;