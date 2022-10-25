import { useMemo } from "react";
// import { useSelector } from "react-redux";
import { getNavigation } from "_nav";

const useNav = (isRoute = false) => {
  // const { info } = useSelector((state) => state.auth);
  let authNav = useMemo(() => {
    //get permission from info to reduce navigate
    // console.log("info", info);
    return getNavigation({ isRoute });
    // return _nav.reduce((result, nav) => {
    //   result.push(nav);
    //   return result;
    // }, []);
  }, [isRoute]);

  return authNav;
};

export default useNav;
