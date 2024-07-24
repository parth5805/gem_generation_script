const xlsx = require('xlsx');

// Capture command-line arguments
const args = process.argv.slice(2);
const shapes = args[0].split(',').map(shape => shape.trim());
const TITANWSTONValues = args.slice(1).reduce((acc, val, index) => {
    acc[shapes[index]] = parseInt(val, 10);
    return acc;
}, {});

let rarityLevels = {};

// Initialize rarity levels with numerical representations
function initializeRarityLevels() {
    shapes.forEach((shape, index) => {
        rarityLevels[shape] = {
            name: shape,
            maxLevel: index + 1,
            TITANWSTON: TITANWSTONValues[shape]
        };
    });
}

// Function to generate gems based on rarity levels and shapes
function getGems() {
    const allGems = [];
    const totalAmount = {};
    const levelGems = {};

    for (const shape1 in rarityLevels) {
        for (const shape2 in rarityLevels) {
            for (const shape3 in rarityLevels) {
                for (const shape4 in rarityLevels) {
                    // Convert shapes to their corresponding numerical values
                    const shapeNumbers = [shape1, shape2, shape3, shape4].map(shape => {
                        return Object.keys(rarityLevels).indexOf(shape) + 1;
                    });
                    const gem = shapeNumbers.join('');
                    const rarityLevelsArray = shapeNumbers.map(num => rarityLevels[shapes[num - 1]].maxLevel);
                    const minLevel = Math.min(...rarityLevelsArray);
                    const rarity = Object.keys(rarityLevels).find(level => {
                        return minLevel <= rarityLevels[level].maxLevel;
                    });

                    if (rarity) {
                        const rarityName = rarityLevels[rarity].name;
                        const totalTITANWSTON = shapeNumbers.reduce((sum, num) => sum + rarityLevels[shapes[num - 1]].TITANWSTON, 0);
                        if (!totalAmount[rarityName]) {
                            totalAmount[rarityName] = { count: 0, amount: 0 };
                            levelGems[rarityName] = [];
                        }
                        totalAmount[rarityName].count++;
                        totalAmount[rarityName].amount += totalTITANWSTON;
                        levelGems[rarityName].push({ gem, totalTITANWSTON });
                        allGems.push({ gem, rarity: rarityName, totalTITANWSTON });
                    }
                }
            }
        }
    }

    return { allGems, totalAmount, levelGems };
}

// Main execution
function main() {
    if (shapes.length === 0 || Object.keys(TITANWSTONValues).length === 0) {
        console.error('Please provide shapes and TITANWSTON values.');
        process.exit(1);
    }

    initializeRarityLevels();

    const { allGems, totalAmount, levelGems } = getGems();

    // Create workbook and sheets
    const wb = xlsx.utils.book_new();

    // Create sheet for Gems details
    const gemsSheetData = allGems.map(gem => ({
        gem: gem.gem,
        rarity: gem.rarity,
        totalTITANWSTON: gem.totalTITANWSTON
    }));
    const gemsSheet = xlsx.utils.json_to_sheet(gemsSheetData);
    xlsx.utils.book_append_sheet(wb, gemsSheet, 'Gems Details');

    // Create sheets for each rarity level
    Object.keys(levelGems).forEach(rarity => {
        const raritySheet = xlsx.utils.json_to_sheet(levelGems[rarity]);
        xlsx.utils.book_append_sheet(wb, raritySheet, `${rarity} Gems`);
    });

    // Create summary sheet
    const summarySheetData = Object.keys(totalAmount).map(rarity => {
        return {
            Rarity: rarity,
            Count: totalAmount[rarity].count,
            TotalAmount: totalAmount[rarity].amount
        };
    });

    // Calculate totals
    const totalSummaryCount = summarySheetData.reduce((sum, item) => sum + item.Count, 0);
    const totalSummaryAmount = summarySheetData.reduce((sum, item) => sum + item.TotalAmount, 0);

    // Add total row
    summarySheetData.push({
        Rarity: 'TOTAL',
        Count: totalSummaryCount,
        TotalAmount: totalSummaryAmount
    });

    const summarySheet = xlsx.utils.json_to_sheet(summarySheetData);
    xlsx.utils.book_append_sheet(wb, summarySheet, 'Summary');

    // Write to file
    const filePath = 'Gems_Details_Summary.xlsx';
    xlsx.writeFile(wb, filePath);

    console.log(`Excel file with grouped sheets and summary generated: ${filePath}`);
}

main();
