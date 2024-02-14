// initialize input variables
let userInput = document.getElementById("userInput")

let page = document.getElementById("page")
let pageWidthInput = document.getElementById("pageWidthInput")
let pageHeightInput = document.getElementById("pageHeightInput")
let pageUnitsInput = document.getElementById("pageUnitsInput")

// let liveAreaWidthInput = document.getElementById("width")
// let liveAreaWidth = liveAreaWidthInput.value
// let liveAreaHeightInput = document.getElementById("height")
// let liveAreaHeight = liveAreaHeightInput.value

let rowsInput = document.getElementById("rowsInput")
let colsInput = document.getElementById("colsInput")
// let linesPerFieldInput = document.getElementById("linesPerField")
// let linesPerGutterInput = document.getElementById("linesPerGutter")

// let fontInput = getActiveFont()
// let typeSizeInput = document.getElementById("typeSizeInput")
let typeUnitsInput = document.getElementById("typeUnitsInput")
// let textHeight = typeSizeInput.value

// measure type
window.onload = function() {
    let c = document.getElementById("measuringStick")
    let ctx = c.getContext("2d")

    ctx.font = "18px Futura"

    let fM = ctx.measureText("A") // a character with the maximum height
    textHeight = fM.actualBoundingBoxAscent + fM.actualBoundingBoxDescent
    console.log(textHeight)

    updateValues()
}

userInput.addEventListener('input', () => {
    console.log("input change detected")
    updateValues()
});

function updateValues() {
    console.log("updating values...")

    // params

    // let liveAreaHeight = liveAreaHeightInput.value + "px" // live area height dimension
    // console.log("liveAreaHeight: " + liveAreaHeight)
    // let liveAreaWidth = liveAreaWidthInput.value + "px" // live area width dimension
    // let rows = rowsInput.value // grid rows
    // let columns = colsInput.value // grid columns
    // let linesPerField = linesPerFieldInput.value // lines of text per grid field
    // let linesPerGutter = linesPerGutterInput.value // lines of text between grid fields

    // // calcs
    // let lines = linesPerField * rows + linesPerGutter * (rows - 1) // total lines of text in live area
    // let total_text = textHeight * lines // total height of live area
    // let perLineSpacing = (liveAreaHeight - total_text) / (lines - 1) // vertical whitespace between lines of text
    // let leading = perLineSpacing + textHeight // height of a single line of text, might need to change based on how css renders a line and its leading (aka line spacing)

    // let horizontalGutter = 2 * perLineSpacing + textHeight // horizontal gutter dimension
    // let fieldHeight = (liveAreaHeight - horizontalGutter * (rows - 1)) / rows // grid field height dimension
    // let verticalGutter = (liveAreaWidth - columns * fieldHeight) / (columns - 1) // vertical gutter dimension
    // let fieldWidth = (liveAreaWidth - verticalGutter * (columns - 1)) / columns // grid field width dimension

    // render
    renderPage()
}

async function renderPage() {
    // page
    page.style.width = pageWidthInput.value + pageUnitsInput.value
    page.style.height = pageHeightInput.value + pageUnitsInput.value

    // font
    page.style.fontSize = typeSizeInput.value + typeUnitsInput.value

    // grid
    const rows = parseInt(rowsInput.value);
    const cols = parseInt(colsInput.value);
    const spacing = 5

    page.style.setProperty('--spacing', spacing + 'px')
    page.style.gridTemplateColumns = `repeat(${cols}, 1fr)`
    page.style.gridTemplateRows = `repeat(${rows}, 1fr)`

    page.innerHTML = ''; // Clear previous grid

    for (let i = 0; i < rows * cols; i++) {
        const gridItem = document.createElement('div')
        gridItem.classList.add('grid-item')
        gridItem.innerText = "Lorem ipsum"
        page.appendChild(gridItem)
    }
}

async function measureType() {
    let c = document.getElementById("measuringStick")
    let ctx = c.getContext("2d")

    ctx.font = "18px Futura"

    let fM = ctx.measureText("A") // a character with the maximum height
    textHeight = fM.actualBoundingBoxAscent + fM.actualBoundingBoxDescent
    console.log(textHeight)
}