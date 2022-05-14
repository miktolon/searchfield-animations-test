import { createRef, startTransition, useState, useEffect, useRef } from "react";
import PropTypes from 'prop-types';
import ResultsList from "./resultslist";

import styles from "./searchfield.module.scss";

export default function Searchfield({
  onQuery
}) {
  const ref = useRef();
  const [hasFocus, setFocus] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({results: [], total: 0});
  const [search, setSearch] = useState("");

  useEffect(() => {
    if (document.hasFocus() && ref?.current.contains(document.activeElement)) {
      setFocus(true);
    }
  }, []);

  const handleChange = (value) => {
    setSearch(value);
    setLoading(true);
    startTransition(async () => {
      if (typeof onQuery === 'function') {
        const res = await onQuery(value);
        if (Array.isArray(res)) {
          setData({
            results: res,
            total: res.length
          });
        }
      }
      setLoading(false);
    });
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.inputContainer} ${hasFocus && styles.focused}`}>
        <span className={styles.icon}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </span>
        <input ref={ref}
          type="text"
          placeholder="Type to search ..."
          className={styles.input}
          onChange={(e) => handleChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        />
        <span className={styles.activityIndicator}>
          { loading && <small>loading</small> }
        </span>
      </div>
      { hasFocus
        &&
        <div className={`${styles.resultsContainer}`}>
          <ResultsList>
            {
              data?.results.map((item) => {
                return (
                  <div key={item.id}
                    ref={createRef()}
                    className={styles.result}
                  >
                    {item.name}
                  </div>
                )
              })
            }
          </ResultsList>
          <div className={styles.footer}>
            <small>Total results { data?.total }</small>
          </div>
        </div>
      }
    </div>
  );
}

Searchfield.propTypes = {
  onQuery: PropTypes.func
};