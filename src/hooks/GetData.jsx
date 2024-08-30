import axios from "axios";
import { useState, useEffect } from "react";
export default function GetData(api) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getData = async () => {
    try {
      axios.get(api).then((e) => {
        setData(e.data.data);
        setLoading(false);
      });
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return [data, loading];
}
