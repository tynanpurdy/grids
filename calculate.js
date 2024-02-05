/**
 * @param {type} name
 */

//params
const lines_per_field = 2
// const lines_per_gutter = 0
const rows = document.getElementById('rows').value
const columns = document.getElementById('columns').value
const box_height = 21.897 // calculate
const box_width = 678.858 // calculate
const h_text = 7.084 // measure??

//calcs
const lines = lines_per_field * rows + lines_per_gutter * (rows - 1)
const total_text = h_text * lines
const per_line_spacing = (box_height - total_text) / (lines - 1)

//output
function getLeading() {
    return per_line_spacing + h_text
}
const leading = getLeading()
const h_gutter = 2 * per_line_spacing + h_text
const h_field = (box_height - h_gutter * (rows - 1)) / rows
const v_gutter = (box_width - columns * h_field) / (columns - 1)

window.onload = function() {
    let c = document.getElementById("textDatum");
    let ctx = c.getContext("2d");

    ctx.font = "18px Futura";

    let fM = ctx.measureText("A"); // a character with the maximum height
    let txtH = fM.actualBoundingBoxAscent + fM.actualBoundingBoxDescent;

    ctx.fillText("Height: " + txtH, 5, 80);
}
