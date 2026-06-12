export const saveWatchlist = (stocks: unknown[]) => {
  localStorage.setItem(
    "watchlist",
    JSON.stringify(stocks)
  );
};

export const getWatchlist = () => {
  const data = localStorage.getItem("watchlist");

  return data
    ? JSON.parse(data)
    : [];
};