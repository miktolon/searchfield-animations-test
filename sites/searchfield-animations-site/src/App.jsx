import { useEffect, useState } from "react";
import { Searchfield } from "@miktolon/searchfield-animations";
import { getAll, query } from "./util/mockapi";

import "./App.scss";

function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getAll(0);
      setData(data);
    }
    fetch();
  }, []);

  return (
    <div className="container top-40">
      <div className="row row-responsive">
        <div className="col" style={{flex: 1}}>
          <div className="group">
            <h2>Info</h2>
            <p>Type search like <code>dr</code> or <code>st</code> and continue changing the search. fe. <code>dry</code> or <code>straw</code></p>
          </div>
          <div className="group top-40">
            <h2>Search</h2>
            <div className="search-container">
              <Searchfield
                onQuery={async (value) => {
                  return await query(value, 9, 350);
                }}
              />
            </div>
          </div>
        </div>
        <div className="col" style={{flex: 2}}>
          <div className="group list-group">
            <h2>Mock data</h2>
            <div style={{overflowY: 'scroll'}}>
              <ul>
              { data
                &&
                data.map((item, index) => {
                  return <li key={index}>{item.name}</li>
                })
              }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;