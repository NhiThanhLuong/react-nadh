/* eslint-disable no-unused-vars */
import { Button, message, Steps } from "antd";
import { AddClientContactPerson, AddClientInfo } from "components";
import { useState } from "react";

const { Step } = Steps;

const AddClient = () => {
  const [current, setCurrent] = useState(0);

  const steps = [
    {
      title: "Client Information",
      content: <AddClientInfo />,
    },
    {
      title: "Contact Person",
      content: <AddClientContactPerson />,
    },
    {
      title: "Finish",
      content: "Last-content",
    },
  ];

  const next = () => {
    setCurrent(current + 1);
  };
  const prev = () => {
    setCurrent(current - 1);
  };

  return (
    <div style={{ marginTop: 100 }}>
      <Steps current={current}>
        {steps.map(({ title }) => (
          <Step key={title} title={title} />
        ))}
      </Steps>
      <div className="steps-content">{steps[current].content}</div>
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
    </div>
  );
};

export default AddClient;
