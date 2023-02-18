export const sortByLowToHigh = (crypto, property, sortOrder, setCrypto) => {
    const sortedCrypto = [...crypto].sort((a, b) => {
      if (sortOrder === "asc") {
        return a[property] - b[property];
      } else {
        return b[property] - a[property];
      }
    });
    setCrypto(sortedCrypto);
  };