import { Tag } from "antd";
import {
  formatKeyFilterTags,
  formatValueFilterTags,
  deleleKeyNull,
  convertKeys,
} from "ultis/func";

const FilterTags = ({ data, onClose, languages }) => {
  deleleKeyNull(data);
  return (
    <div>
      {Object.keys(data).map(key => {
        if (Object.keys(convertKeys).indexOf(key) === -1) return;
        return (
          <Tag key={key} closable onClose={() => onClose(key)}>
            {formatKeyFilterTags(key)} :
            {formatValueFilterTags(key, data[key], languages)}
          </Tag>
        );
      })}
    </div>
  );
};

FilterTags.propTypes = {};

export default FilterTags;
