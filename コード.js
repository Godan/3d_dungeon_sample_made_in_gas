function onOpen() {
    SpreadsheetApp
        .getActiveSpreadsheet()
        .addMenu('sample', [
            { name: 'sample', functionName: 'sample' },
            { name: 'draw', functionName: 'draw' },
        ]);
}

function sample() {
    const spreadSheet = SpreadsheetApp.getActive()
    const sheet = spreadSheet.getSheetByName("main")
    for (y in [...Array(10)]) {
        for (x in [...Array(10)]) {
            cell = sheet.getRange(parseInt(y) + 1, parseInt(x) + 1)
            cell.setValue(x).setBackground("#008000");
            Utilities.sleep(100);
        }
    }
}
function go_forward() {
    const spreadSheet = SpreadsheetApp.getActive()
    const conf_sheet = spreadSheet.getSheetByName("conf_sheet")
    let direction_cell = conf_sheet.getRange(3, 2)

    let direction = parseInt(direction_cell.getValue())
    let current_location_x = parseInt(conf_sheet.getRange(1, 2).getValue())
    let current_location_y = parseInt(conf_sheet.getRange(2, 2).getValue())

    if (direction == 1) {
        conf_sheet.getRange(2, 2).setValue(current_location_y - 1)
    } else if (direction == 2) {
        conf_sheet.getRange(1, 2).setValue(current_location_x + 1)
    } else if (direction == 3) {
        conf_sheet.getRange(2, 2).setValue(current_location_y + 1)
    } else if (direction == 4) {
        conf_sheet.getRange(1, 2).setValue(current_location_x - 1)

    }
    draw()
}

function turning_left() {
    const spreadSheet = SpreadsheetApp.getActive()
    const conf_sheet = spreadSheet.getSheetByName("conf_sheet")
    let direction_cell = conf_sheet.getRange(3, 2)

    let direction = parseInt(direction_cell.getValue())
    if (direction > 1) {
        direction--;
    } else {
        direction = 4;
    }
    direction_cell.setValue(direction)
    draw()
}

function turning_right() {
    const spreadSheet = SpreadsheetApp.getActive()
    const conf_sheet = spreadSheet.getSheetByName("conf_sheet")
    let direction_cell = conf_sheet.getRange(3, 2)

    let direction = parseInt(direction_cell.getValue())
    if (direction < 4) {
        direction++;
    } else {
        direction = 1;
    }
    direction_cell.setValue(direction)
    draw()

}
function draw() {
    const spreadSheet = SpreadsheetApp.getActive()
    const sheet = spreadSheet.getSheetByName("main")
    const conf_sheet = spreadSheet.getSheetByName("conf_sheet")
    const map_sheet = spreadSheet.getSheetByName("map")
    const map = map_sheet.getRange(1, 1, 21, 25).getValues()
    let current_location = conf_sheet.getRange(1, 2, 2, 1).getValues()
    let current_location_x = parseInt(conf_sheet.getRange(1, 2).getValue())
    let current_location_y = parseInt(conf_sheet.getRange(2, 2).getValue())
    let direction = parseInt(conf_sheet.getRange(3, 2).getValue())
    Logger.log(direction)

    let first_grid = ["", ".", "#"]
    let second_grid = ["#", ".", "#"]


    Logger.log(map)
    Logger.log(current_location)
    if (direction == 1) {
        first_grid = []
        try {
            first_grid.push(map[current_location_y][current_location_x - 1])
        } catch (err) {
            first_grid.push("#")
        }
        try {
            first_grid.push(map[current_location_y - 1][current_location_x])
        } catch (err) {
            first_grid.push("#")
        }
        try {
            first_grid.push(map[current_location_y][current_location_x + 1])
        } catch (err) {
            first_grid.push("#")
        }
        second_grid = []
        try {
            second_grid.push(map[current_location_y - 1][current_location_x - 1])
        } catch (err) {
            second_grid.push("#")
        }
        try {
            second_grid.push(map[current_location_y - 2][current_location_x])
        } catch (err) {
            second_grid.push("#")
        }
        try {
            second_grid.push(map[current_location_y - 1][current_location_x + 1])
        } catch (err) {
            second_grid.push("#")
        }
    } else if (direction == 2) {
        first_grid = []
        try {
            first_grid.push(map[current_location_y - 1][current_location_x])
        } catch (err) {
            first_grid.push("#")
        }
        try {
            first_grid.push(map[current_location_y][current_location_x + 1])
            Logger.log(current_location_x + 1)
        } catch (err) {
            first_grid.push("#")
        }
        try {
            first_grid.push(map[current_location_y + 1][current_location_x])
        } catch (err) {
            first_grid.push("#")
        }
        second_grid = []
        try {
            second_grid.push(map[current_location_y - 1][current_location_x + 1])
        } catch (err) {
            second_grid.push("#")
        }
        try {
            second_grid.push(map[current_location_y][current_location_x + 2])
        } catch (err) {
            second_grid.push("#")
        }

        try {
            second_grid.push(map[current_location_y + 1][current_location_x + 1])
        } catch (err) {
            second_grid.push("#")
        }
    } else if (direction == 3) {
        first_grid = []
        try {
            first_grid.push(map[current_location_y][current_location_x + 1])
        } catch (err) {
            first_grid.push("#")
        }
        try {
            first_grid.push(map[current_location_y + 1][current_location_x])
            Logger.log(current_location_x + 1)
        } catch (err) {
            first_grid.push("#")
        }
        try {
            first_grid.push(map[current_location_y][current_location_x - 1])
        } catch (err) {
            first_grid.push("#")
        }
        second_grid = []
        try {
            second_grid.push(map[current_location_y + 1][current_location_x + 1])
        } catch (err) {
            second_grid.push("#")
        }
        try {
            second_grid.push(map[current_location_y + 2][current_location_x])
        } catch (err) {
            second_grid.push("#")
        }

        try {
            second_grid.push(map[current_location_y + 1][current_location_x - 1])
        } catch (err) {
            second_grid.push("#")
        }
    } else if (direction == 4) {
        first_grid = []
        try {
            first_grid.push(map[current_location_y + 1][current_location_x])
        } catch (err) {
            first_grid.push("#")
        }
        try {
            first_grid.push(map[current_location_y][current_location_x - 1])
            Logger.log(current_location_x + 1)
        } catch (err) {
            first_grid.push("#")
        }
        try {
            first_grid.push(map[current_location_y - 1][current_location_x])
        } catch (err) {
            first_grid.push("#")
        }
        second_grid = []
        try {
            second_grid.push(map[current_location_y + 1][current_location_x - 1])
        } catch (err) {
            second_grid.push("#")
        }
        try {
            second_grid.push(map[current_location_y][current_location_x - 2])
        } catch (err) {
            second_grid.push("#")
        }

        try {
            second_grid.push(map[current_location_y - 1][current_location_x - 1])
        } catch (err) {
            second_grid.push("#")
        }
    }
    Logger.log(first_grid)
    Logger.log(second_grid)


    cell = sheet.getRange(1, 1, 25, 30)
    cell.setBackground("#008000");
    const far = 9
    const wall = 5
    let i = 0
    for (y in [...Array(25)]) {
        cell = sheet.getRange(parseInt(y) + 1, 1, 1, i + 1)
        cell.setBackground("#000000");
        cell = sheet.getRange(parseInt(y) + 1, 30 - i, 1, i + 1)
        cell.setBackground("#000000");
        if (y <= far) {
            i++;
        }
        else if (y >= far + wall) {
            i--;
        }
    }
    // // 手前の処理
    i = 0
    let wall_color = "#008000"
    const wall_01 = 17;
    const far_01 = 3

    for (y in [...Array(25)]) {
        cell = sheet.getRange(parseInt(y) + 1, 1, 1, i + 1)
        if (first_grid[0] != "#") {
            cell.setBackground(wall_color);

        }
        cell = sheet.getRange(parseInt(y) + 1, 30 - i, 1, i + 1)
        if (first_grid[2] != "#") {
            cell.setBackground(wall_color);
        }
        if (y <= far_01) {
            i++;
        }
        else if (y >= far_01 + wall_01) {
            i--;
        }
        if (y > far_01 && y < far_01 + wall_01) {
            wall_color = "#696969";
        } else {
            wall_color = "#008000"
        }
    }

    // 2マス目の処理
    wall_color = "#008000"
    const wall_02 = 11;
    const far_02 = 2
    i = 0

    for (y in [...Array(25)]) {
        cell = sheet.getRange(parseInt(y) + 1, 6, 1, i + 1)

        if (second_grid[0] != "#") {
            cell.setBackground(wall_color);
        }

        cell = sheet.getRange(parseInt(y) + 1, 25 - i, 1, i + 1)
        if (second_grid[2] != "#") {
            cell.setBackground(wall_color);
        }

        if (y <= far_02) {
            i++;
        }
        else if (y >= far_02 + far_01 + wall_02) {
            if (i > 0) {
                i--;
            }
        }
        if (y > far_01 + far_02 && (y <= far_02 + far_01 + wall_02)) {
            wall_color = "#696969";
        } else {
            wall_color = "#008000"
        }
    }

    // ２つ目が壁
    cell = sheet.getRange(8, 9, 11, 14)
    if (second_grid[1] == "#") {
        cell.setBackground("#696969");
    }

    // 1つ目が壁
    cell = sheet.getRange(6, 6, 16, 20)
    if (first_grid[1] == "#") {
        cell.setBackground("#696969");
    }

}
