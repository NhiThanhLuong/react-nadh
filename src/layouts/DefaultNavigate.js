import { Menu } from "antd";
import useNav from "hooks/useNav";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const DefaultNavigate = ({ collapsed }) => {
  const [selectedKeys, setSelectedKeys] = useState();
  const [openKeys, setOpenKeys] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  const navs = useNav();

  let getKeysFromPathname = (pathname, isSelectedKey) => {
    let pathArray = pathname?.substring(1)?.split?.("/");
    if (!isSelectedKey) {
      pathArray.splice(pathArray.length - 1);
    }
    return pathArray.reduce((result, item) => {
      const path = "/" + item;
      if (result.length === 0) result.push(path);
      else result.push(result[result.length - 1] + path);
      return result;
    }, []);
  };

  useEffect(() => {
    setOpenKeys((prev = []) => {
      let keys = new Set([...prev, ...getKeysFromPathname(location.pathname)]);
      return [...keys];
    });
    setSelectedKeys(getKeysFromPathname(location.pathname, true));
  }, [location.pathname, collapsed]);

  const onClickMenuItem = ({ key, keyPath }) => {
    setSelectedKeys(keyPath);
    navigate(key);
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      onOpenChange={(props) => {
        setOpenKeys(props);
      }}
      onClick={onClickMenuItem}
      selectedKeys={
        selectedKeys ?? getKeysFromPathname(location.pathname, true)
      }
      openKeys={
        collapsed
          ? undefined
          : openKeys ?? getKeysFromPathname(location.pathname)
      }
      style={{
        borderRight: 0,
        paddingBottom: "25px",
        flexGrow: 1,
        overflowY: "auto",
        overflowX: "hidden",
      }}
      items={navs ?? undefined}
    />
  );
};

export default React.memo(DefaultNavigate);
