import { useEffect, useState } from "react";
import Banner from "./Banner/Banner";
import Doll from "./Doll/Doll";
import Gallery from "./Gallery/Gallery";
import axios from "axios";
import NewArival from "./NewArival/NewArival";
import Commetment from "./Commetment/Commetment";

const Home = () => {
  const [dolls, setDolls] = useState([]);
  const [subcategory, setSubcategory] = useState([]);
  const [loading, setLoading] = useState(true);
  // console.log(dolls[dolls.length-1]);
  useEffect(() => {
    const fetchDolls = async () => {
      const res = await axios.get(
        "https://khelagorbackend.vercel.app/api/dolls"
      ); //todo change to live server
      setDolls(res.data.dolls);
      setLoading(false);
      const subCtg = [];
      res.data.dolls.map((doll) => {
        if (!subCtg.includes(doll.subcategory)) {
          subCtg.push(doll.subcategory);
        }
      });
      setSubcategory(subCtg);
      console.log(res.data);
    };
    fetchDolls();
  }, []);
  return (
    <div>
      <Banner />
      <Gallery dolls={dolls} loading={loading} />
      <Doll dolls={dolls} loading={loading} subcategory={subcategory} />
      <NewArival
        loading={loading}
        item1={dolls[dolls.length - 1]}
        item2={dolls[dolls.length - 2]}
      />
      <Commetment />
    </div>
  );
};

export default Home;
