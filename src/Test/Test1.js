function generateIndexList(value, baseValue, stake, type, betdata) {
    const totalIndexes = 21;
    const startValue = Math.max(0, value - 10); // Prevent negative Run values

    const indexList = Array.from({ length: totalIndexes }, (_, i) => startValue + i);

    let betData = [];

    if (betdata.length > 0) {
        const firstRunValue = betdata[0].Run; // Get the first Run value

        betData = betdata.map((runData) => {
            let amount;
            if (type.toLowerCase() === "y") {
                amount = (runData.Run >= firstRunValue && runData.Run <= value - 1) 
                ? runData.Amount - stake 
                : runData.Amount + baseValue;
            } else {
                amount = (runData.Run >= firstRunValue && runData.Run <= value - 1) 
                    ? runData.Amount + stake 
                    : runData.Amount - baseValue;
            }
            return { ...runData, Amount: amount };
        });
    } else {
        betData = indexList.map((run, i) => {
            const firstRunValue = betdata.length > 0 ? betdata[0].Run : startValue;
            let amount;
            if (type.toLowerCase() === "y") {
                amount = run >= firstRunValue && run <= value - 1?  -stake :  baseValue;
            } else {
                amount = run >= firstRunValue && run <= value - 1 ? stake :  -baseValue;
            }
            return { index: i, Run: run, Amount: amount };
        });
    }

    return betData;
}
// Example usage:
const betdata = [
    // { index: 0, Run: 36, Amount: -100 },
    // { index: 1, Run: 37, Amount: -100 },
    // { index: 2, Run: 38, Amount: -100 },
    // { index: 3, Run: 39, Amount: -100 },
    // { index: 4, Run: 40, Amount: -100 },
    // { index: 5, Run: 41, Amount: -100 },
    // { index: 6, Run: 42, Amount: -100 },
    // { index: 7, Run: 43, Amount: -100 },
    // { index: 8, Run: 44, Amount: -100 },
    // { index: 9, Run: 45, Amount: -100 },
    // { index: 10, Run: 46, Amount: 100 },
    // { index: 11, Run: 47, Amount: 100 },
    // { index: 12, Run: 48, Amount: 100 },
    // { index: 13, Run: 49, Amount: 100 },
    // { index: 14, Run: 50, Amount: 100 },
    // { index: 15, Run: 51, Amount: 100 },
    // { index: 16, Run: 52, Amount: 100 },
    // { index: 17, Run: 53, Amount: 100 },
    // { index: 18, Run: 54, Amount: 100 },
    // { index: 19, Run: 55, Amount: 100 },
    // { index: 20, Run: 56, Amount: 100 }
  ]
  

console.log(generateIndexList(20, 90, 100, "y", betdata));
