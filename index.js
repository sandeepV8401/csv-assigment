const csv = require("csv-parser");
const fs = require("fs");
const Pool = require("pg").Pool;

// create a new connection to the database
const pool = new Pool({
  host: "localhost",
  user: "postgres",
  database: "csv-project",
  password: "12345",
  port: 5432,
});

fs.createReadStream("sample_data2.csv",{headers:true})
  .pipe(csv())
  .on("data", (row) => {
  
     console.log(row);
    let Region = row.Region;
    let Country = row.Country;
    let Item_Type = row.Item_Type;
    let Sales_Channel = row.Sales_Channel;
    let Order_Priority = row.Order_Priority;
    let Order_Date = row.Order_Date;
    let Order_ID = row.Order_ID;
    let Ship_Date = row.Ship_Date;
    let Units_Sold = row.Units_Sold;
    let Unit_Price = row.Unit_Price;
    let Unit_Cost = row.Unit_Cost;
    let Total_Revenue = row.Total_Revenue;
    let Total_Cost = row.Total_Cost;
    let Total_Profit = row.Total_Profit;

    pool.query(
      "INSERT INTO salesTB3 (Region,Country,Item_Type,Sales_Channel,Order_Priority,Order_Date,Order_ID,Ship_Date,Units_Sold,Unit_Price,Unit_Cost,Total_Revenue,Total_Cost,Total_Profit) \
      VALUES ($1, $2, $3, $4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)",[
        Region,
        Country,
        Item_Type,
        Sales_Channel,
        Order_Priority,
        Order_Date,
        Order_ID,
        Ship_Date,
        Units_Sold,
        Unit_Price,
        Unit_Cost,
        Total_Revenue,
        Total_Cost,
        Total_Profit
      ],
      function (err) {
        if (err) {
          console.log(err);
        }
      }
    );

   
  })
  .on("end", () => {
    console.log("CSV file successfully processed");
  });
