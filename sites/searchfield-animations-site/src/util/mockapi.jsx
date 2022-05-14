import mockdata from "../data/mock-data.json";

var timeout;

export const getAll = (delay) => {
  return new Promise(resolve => {
    setTimeout(() => resolve(mockdata), delay);
  });
}

export const query = (value, limit, delay) => {
  return new Promise(resolve => {

    if (timeout) {
      clearTimeout(timeout);
    }

    if (!value || value === "") {
      resolve([]);
      return;
    }

    timeout = setTimeout(() => {

      const searchWords = value.toLowerCase().split(" ");
      let results = mockdata.filter((item) => {
        const target = item.name.toLowerCase();
        return searchWords.every(v => target.includes(v));
      });

      if (limit > 0) {
        results = results.slice(0, limit);
      }

      resolve(results);

    }, delay);
  });
}