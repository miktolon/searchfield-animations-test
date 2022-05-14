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
      <div className="row">
        <div className="col" style={{flex: 1}}>
          <div className="group group-1">
            <h2>Search</h2>
            <Searchfield
              onQuery={async (value) => {
                return await query(value, 9, 250);
              }}
            />
          </div>
          <div className="group group-info top-40">
            <p>Type work like <code>brea</code> or <code>st</code> and continue changing the search by typing more. fe. <code>bread</code> or <code>straw</code></p>
          </div>
        </div>
        <div className="col" style={{flex: 3}}>
          <div className="group group-2">
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