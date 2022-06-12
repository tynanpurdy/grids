/**
 * @param {type} name
 */

//params
const lines_per_field = 2
const lines_per_gutter = 0
const h_fields = 1
const v_fields = 1
const box_height = 21.897
const box_width = 678.858
const h_text = 7.084

//calcs
const lines = lines_per_field * h_fields + lines_per_gutter * (h_fields - 1)
const total_text = h_text * lines
const per_line_spacing = (box_height - total_text) / (lines - 1)

//output
const leading = per_line_spacing + h_text
const h_gutter = 2 * per_line_spacing + h_text
const h_field = (box_height - h_gutter * (h_fields - 1)) / h_fields
const v_gutter = (box_width - v_fields * h_field) / (v_fields - 1)