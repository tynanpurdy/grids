//// MODULES ////
// configure enviroment varaibles vault
require("dotenv").config();
const apiKey = process.env.GOOGLE_FONTS_API_KEY;

// initialize the font-picker module
const FontPicker = require("font-picker");
const fontPicker = new FontPicker(
  apiKey, // Google API key
  "Open Sans", // Default font
  { limit: 30 } // Additional options
);

//// VARIABLES ////
// initialize input variables
const userInput = document.getElementById("userInput");
const page = document.getElementById("page");
const pageWidthInput = document.getElementById("pageWidthInput");
const pageHeightInput = document.getElementById("pageHeightInput");
const pageUnitsInput = document.getElementById("pageUnitsInput");
const marginLeftInput = document.getElementById("marginLeftInput");
const marginRightInput = document.getElementById("marginRightInput");
const marginTopInput = document.getElementById("marginTopInput");
const marginBottomInput = document.getElementById("marginBottomInput");
let pageWidth,
  pageHeight,
  pageUnits,
  marginLeft,
  marginRight,
  marginTop,
  marginBottom;

const rowsInput = document.getElementById("rowsInput");
const colsInput = document.getElementById("colsInput");
const linesPerFieldInput = document.getElementById("linesPerFieldInput");
const linesPerGutterInput = document.getElementById("linesPerGutterInput");
const typeSizeInput = document.getElementById("typeSizeInput");
const typeUnitsInput = document.getElementById("typeUnitsInput");
let textHeight,
  rows,
  cols,
  linesPerField,
  linesPerGutter,
  gutterH,
  gutterV,
  liveAreaWidth,
  liveAreaHeight,
  fieldHeight,
  fieldWidth,
  typeSize,
  typeUnits;

//// EVENT HANDLERS ////
// load initial values and render page on window load
window.onload = function () {
  updateValues(fontPicker.getActiveFont());
  renderPage();
};

// detect new inputs on the sidebar
userInput.addEventListener("input", () => {
  console.log("input change detected");
  updateValues();
  renderPage();
});

// since fontpicker is different from the other inputs, we also call updateValues() on a new font selection
fontPicker.setOnChange((newFont) => {
  console.log(`New font selected: ${newFont.family}`);
  updateValues(newFont);
  renderPage();
});

//// FUNCTIONS ////
// get new values from inputs and update calculated values
function updateValues(newFont = fontPicker.getActiveFont()) {
  console.log("updating values...");

  // inputs
  const currentFont = newFont.family;
  pageWidth = pageWidthInput.value;
  pageHeight = pageHeightInput.value;
  pageUnits = pageUnitsInput.value;
  marginLeft = marginLeftInput.value;
  marginRight = marginRightInput.value;
  marginTop = marginTopInput.value;
  marginBottom = marginBottomInput.value;
  rows = parseInt(rowsInput.value);
  cols = parseInt(colsInput.value);
  linesPerField = parseInt(linesPerFieldInput.value); // lines of text per grid field
  linesPerGutter = parseInt(linesPerGutterInput.value); // lines of text between grid fieldscurrentFont = newFont.family;
  typeSize = typeSizeInput.value;
  typeUnits = typeUnitsInput.value;

  // measure real body text size
  const c = document.getElementById("measuringStick"); // get canvas element
  const ctx = c.getContext("2d"); // classify it as a 2D space

  const testFontStyle = typeSize + typeUnits + " " + currentFont; // get type style string from inputs
  ctx.font = testFontStyle; // set canvas font
  console.log(testFontStyle);

  const fM = ctx.measureText("A"); // a character with the maximum height
  textHeight = fM.actualBoundingBoxAscent + fM.actualBoundingBoxDescent;
  console.log(textHeight);

  // calcs
  liveAreaHeight = pageHeight - (marginTop + marginBottom);
  liveAreaWidth = pageWidth - (marginLeft + marginRight);
  let lines = linesPerField * rows + linesPerGutter * (rows - 1); // total lines of text in live area
  let total_text = textHeight * lines; // total height of live area
  let perLineSpacing = (liveAreaHeight - total_text) / (lines - 1); // vertical whitespace between lines of text
  let leading = perLineSpacing + textHeight; // height of a single line of text, might need to change based on how css renders a line and its leading (aka line spacing)

  gutterH = 2 * perLineSpacing + textHeight; // horizontal gutter dimension
  fieldHeight = (liveAreaHeight - gutterH * (rows - 1)) / rows; // grid field height dimension
  gutterV = (liveAreaWidth - cols * fieldHeight) / (cols - 1); // vertical gutter dimension
  fieldWidth = (liveAreaWidth - gutterV * (cols - 1)) / cols; // grid field width dimension
}

// draw the preview page with grid and text inputs applied
function renderPage() {
  // page
  page.style.width = pageWidth + pageUnits;
  page.style.height = pageHeight + pageUnits;
  page.style.paddingLeft = marginLeft + pageUnits;
  page.style.paddingRight = marginRight + pageUnits;
  page.style.paddingTop = marginTop + pageUnits;
  page.style.paddingBottom = marginBottom + pageUnits;

  // font
  page.style.fontSize = typeSize + typeUnits;

  // grid
  const spacing = 5;

  page.style.setProperty("--spacing", spacing + "px");
  page.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
  page.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

  page.innerHTML = ""; // Clear previous grid

  // spawn grid field divs
  for (let i = 0; i < rows * cols; i++) {
    const gridItem = document.createElement("div");
    gridItem.classList.add("grid-item");
    gridItem.innerText = "Lorem ipsum";
    page.appendChild(gridItem);
  }

  // output numbers
  let textHeightEl = document.getElementById("textHeight");
  textHeightEl.innerText = textHeight;
}
