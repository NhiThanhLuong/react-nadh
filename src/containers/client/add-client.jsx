/* eslint-disable no-unused-vars */
import { Button, message, Steps } from "antd";
import { AddClientInfo } from "components";
import { useState } from "react";

const AddClient = () => {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: "First",
      content: "First-content",
    },
    {
      title: "Second",
      content: "Second-content",
    },
    {
      title: "Last",
      content: "Last-content",
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };
  //   const items = steps.map(item => ({
  //     key: item.title,
  //     title: item.title,
  //   }));
  const items = [
    { title: "first step" },
    { title: "second step" },
    { title: "third step" },
  ];
  console.log(items);

  return (
    <div style={{ marginTop: 500 }}>
      <Steps>
        <Steps.Step title="first step" />
        <Steps.Step title="second step" />
        <Steps.Step title="third step" />
      </Steps>
      ;<div className="steps-content">{steps[current].content}</div>
      <div className="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            Next
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button
            type="primary"
            onClick={() => message.success("Processing complete!")}
          >
            Done
          </Button>
        )}
        {current > 0 && (
          <Button
            style={{
              margin: "0 8px",
            }}
            onClick={() => prev()}
          >
            Previous
          </Button>
        )}
      </div>
      <AddClientInfo />
    </div>
  );
};

export default AddClient;
