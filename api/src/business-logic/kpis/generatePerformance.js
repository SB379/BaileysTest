import yf from "yahoo-finance2";
import connectDb from "../../knex/connectDb.js";
import dayjs from "dayjs";

export default async () => {
  console.log("Generating performance...")
  const knex = await connectDb();
  const holdings = await knex("holdings").select("*");
  const tickers = holdings.map((holding) => holding.ticker);
  const now = dayjs();
  const yesterdayDay = now.subtract(1, "day");
  const lastMonthDay = now.subtract(1, "month");
  const lastYearDay = now.subtract(1, "year");

  const yesterdayDate = yesterdayDay.format("YYYY-MM-DD");
  const lastMonthDate = lastMonthDay.format("YYYY-MM-DD");
  const lastYearDate = lastYearDay.format("YYYY-MM-DD");

  const todayQuotesArray = await yf.quote(tickers);
  const todayQuotes = todayQuotesArray.reduce((quotes, quote) => {
    quotes[quote.symbol] = quote;
    return quotes;
  }, {});
  const historicalQuoteArrays = await Promise.all(
    [yesterdayDate, lastMonthDate, lastYearDate].map((date) =>
      Promise.all(
        tickers.map((ticker) =>
          yf.historical(ticker, {
            period1: date,
            period2: date,
          })
        )
      )
    )
  );

  const quotes = historicalQuoteArrays.map((historicalQuotes) =>
    historicalQuotes.reduce((quotes, quote) => {
      quotes[quote.symbol] = quote;
      return quotes;
    }, {})
  );

  const [yesterdayQuotes, lastMonthQuotes, lastYearQuotes] = quotes;

  const total_value_now = holdings.reduce((total, holding) => {
    const quote = todayQuotes[holding.ticker];
    const value = quote.regularMarketPrice * holding.shares;
    return total + value;
  }, 0);

  const [total_value_yesterday, total_value_last_month, total_value_last_year] =
    quotes.map((quote) =>
      holdings.reduce((total, holding) => {
        const value = quote[holding].regularMarketPrice * holding.shares;
        return total + value;
      }, 0)
    );

  const year_return_percent =
    (total_value_now - total_value_last_year) / total_value_last_year;

  const month_return_percent =
    (total_value_now - total_value_last_month) / total_value_last_month;

  const day_return_percent =
    (total_value_now - total_value_yesterday) / total_value_yesterday;

  const year_return_dollars = total_value_now - total_value_last_year;

  const month_return_dollars = total_value_now - total_value_last_month;

  const day_return_dollars = total_value_now - total_value_yesterday;

  const performance = {
    total_value_now,
    total_value_yesterday,
    total_value_last_month,
    total_value_last_year,
    year_return_percent,
    month_return_percent,
    day_return_percent,
    year_return_dollars,
    month_return_dollars,
    day_return_dollars,
  };

  await knex("performance").insert(performance);
};
