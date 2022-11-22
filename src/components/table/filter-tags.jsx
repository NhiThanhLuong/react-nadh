import { Tag } from "antd";
import { formatKeyFilterTags, deleteKeyNull, convertKeys } from "ultis/func";

const FilterTags = ({ data, onClose }) => {
  deleteKeyNull(data);
  return (
    <div style={{ margin: "8px 0" }}>
      {Object.keys(data).map(key => {
        if (Object.keys(convertKeys).indexOf(key) === -1) return;
        return (
          <Tag
            key={key}
            closable
            onClose={() => onClose(key)}
            style={{ fontSize: "14px" }}
          >
            {formatKeyFilterTags(key)} : <span> </span>
            {data[key]}
          </Tag>
        );
      })}
    </div>
  );
};

FilterTags.propTypes = {};

export default FilterTags;
