# Gems Generator

This project includes a Node.js script to generate and analyze Gems based on user-defined shapes and their corresponding TITANWSTON values. The script produces an Excel file containing details about the generated Gems, categorized by rarity levels, and a summary sheet with total counts and amounts.

## Prerequisites

- Node.js (>=14.x)
- npm (Node Package Manager)

## Installation

1. Clone this repository or download the script file.

2. Navigate to the project directory in your terminal.

3. Install the required npm packages:

   ```bash
   npm install xlsx

## Usage

- Running the Script

To generate the Gems and produce the Excel file, run the script with the following command:

```bash
node generateGems.js "Common,Rare,Unique,Epic,Legendary,Mythic" 1 2 3 4 5 6
```

## Command Explanation

- node generateGems.js: Runs the script using Node.js.
- "Common,Rare,Unique,Epic,Legendary,Mythic": A comma-separated list of shapes. These represent different rarity levels or types of Gems.
- 1 2 3 4 5 6: The TITANWSTON values associated with each shape. Each number corresponds to the shape in the same order as provided.

## Example

If you run:

```bash
node generateGems.js "Common,Rare,Unique,Epic,Legendary,Mythic" 1 2 3 4 5 6
```
## Purpose

This script will:
1. **Generate Gems**: Create all possible combinations of the specified shapes, each shape represented by a number.
2. **Calculate Total Values**: Sum the TITANWSTON values for each Gem.
3. **Create Excel File**: Produce an Excel file named `Gems_Details_Summary.xlsx` containing:
   - **Gems Details**: A sheet listing each Gem, its rarity, and total TITANWSTON.
   - **Rarity Sheets**: Individual sheets for each rarity level containing the Gems of that rarity.
   - **Summary**: A sheet summarizing the count and total TITANWSTON for each rarity level, including a final row with totals.
row with totals.

## Script Overview

### File: `generateGems.js`

**Purpose**: Generates a list of Gems based on user-defined shapes and their TITANWSTON values, and writes this data into an Excel file.

### Command-line Arguments

- The first argument is a comma-separated list of shape names.
- The subsequent arguments are TITANWSTON values corresponding to these shapes.

### Steps

1. **Initialize Rarity Levels**: Set up rarity levels with numerical representations based on input shapes and TITANWSTON values.
2. **Generate Gems**: Create all possible combinations of shapes and calculate their TITANWSTON values.
3. **Create Excel Workbook**: Generate sheets for Gem details, rarity levels, and a summary.
4. **Write File**: Save the workbook as `Gems_Details_Summary.xlsx`.

## DEMO
<img width="1112" alt="image" src="https://github.com/user-attachments/assets/f71345a1-967a-4236-8cb4-8c52f439c5b9">

<img width="1021" alt="image" src="https://github.com/user-attachments/assets/2cccbe9c-a415-447a-b547-af255d3895f0">

<img width="1017" alt="image" src="https://github.com/user-attachments/assets/48905b2d-50d9-4712-9363-fbb1e4ef3cdf">


