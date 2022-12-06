import { useEffect } from "react";
import { useDispatch } from "react-redux";

const useFecthApi = (fetchFn, open = true) => {
  const dispatch = useDispatch();

  useEffect(() => {
    open && dispatch(fetchFn);
  }, [open]);
};

export default useFecthApi;
