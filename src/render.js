// initialize input variables
let page = document.getElementById("page")
let liveAreaWidthInput = document.getElementById("width")
let liveAreaWidth = liveAreaWidthInput.value
let liveAreaHeightInput = document.getElementById("height")
let liveAreaHeight = liveAreaHeightInput.value

let userInput = document.getElementById("userInput")
let rowsInput = document.getElementById("rows")
let columnsInput = document.getElementById("columns")
let linesPerFieldInput = document.getElementById("linesPerField")
let linesPerGutterInput = document.getElementById("linesPerGutter")

// let fontInput = getActiveFont()
let typeSizeInput = document.getElementById("size")
let textHeight = typeSizeInput.value

//measure type
window.onload = function() {
    let c = document.getElementById("measuringStick")
    let ctx = c.getContext("2d")

    ctx.font = "18px Futura"

    let fM = ctx.measureText("A") // a character with the maximum height
    textHeight = fM.actualBoundingBoxAscent + fM.actualBoundingBoxDescent
    console.log(textHeight)

    ctx.fillText("Height: " + textHeight, 5, 80)

    updateValues()
}

userInput.addEventListener('change', () => {
    console.log("input change detected")
    updateValues()
});

function updateValues() {
    // params
    let liveAreaHeight = liveAreaHeightInput.value // live area height dimension
    let liveAreaWidth = liveAreaWidthInput.value // live area width dimension
    let rows = rowsInput.value // grid rows
    let columns = columnsInput.value // grid columns
    let linesPerField = linesPerFieldInput.value // lines of text per grid field
    let linesPerGutter = linesPerGutterInput.value // lines of text between grid fields

    // calcs
    let lines = linesPerField * rows + linesPerGutter * (rows - 1) // total lines of text in live area
    let total_text = textHeight * lines // total height of live area
    let perLineSpacing = (liveAreaHeight - total_text) / (lines - 1) // vertical whitespace between lines of text
    let leading = perLineSpacing + textHeight // height of a single line of text, might need to change based on how css renders a line and its leading (aka line spacing)

    let horizontalGutter = 2 * perLineSpacing + textHeight // horizontal gutter dimension
    let fieldHeight = (liveAreaHeight - horizontalGutter * (rows - 1)) / rows // grid field height dimension
    let verticalGutter = (liveAreaWidth - columns * fieldHeight) / (columns - 1) // vertical gutter dimension
    let fieldWidth = (liveAreaWidth - verticalGutter * (columns - 1)) / columns // grid field width dimension

    // render
    renderPage()
}

function renderPage() {
    // live area
    page.style.width = liveAreaWidth
    page.style.height = liveAreaHeight
    console.log("page set to " + page.style.width + " by " + page.style.height)

    // font
    page.style.fontSize = typeSizeInput.value
    console.log("page font size set to " + page.style.fontSize)

    // grid
}