// import PropTypes from 'prop-types'
import { Button } from "antd";

const ClearAllFilter = ({ onClick }) => {
  return (
    <Button type="primary" ghost onClick={onClick}>
      Clear All Filter
    </Button>
  );
};

ClearAllFilter.propTypes = {};

export default ClearAllFilter;
