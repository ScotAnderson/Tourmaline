include("CherryMX.jscad");

DactylKeyboard = function (switchType) {

    var switchFactory = null;
    switch(switchType) {
        case 'CherryMX':
            switchFactory = CherryMX;
            break;
    }

    var columns = [0, 1, 2, 3, 4, 5];
    var rows = [0, 1, 2, 3, 4];

    keys = [];

    columns.forEach(function(column) {
        rows.forEach(function(row) {
            if (column != 0 || row != 4) {
                keys.push(keyPlace(column, row, switchFactory()));
            }
        });
    });

    return union(keys);
}


function keyPlace(column, row, shape) {

    var plateThickness = 4.0;
    var saProfileKeyHeight = 12.7;
    var mountWidth = 17.4;
    var mountHeight = 17.4;

    var alpha = Math.PI / 12;
    var beta = Math.PI / 36;
    var capTopHeight = plateThickness + saProfileKeyHeight;

    var rowRadius = ((((mountHeight + 1/2) / 2) / (Math.sin(alpha / 2))) + capTopHeight);
    var columnRadius = ((((mountWidth + 2.0) / 2) / (Math.sin(beta / 2))) + capTopHeight);

    var columnOffset = [0, 0, 0];

    if (column == 2) {
        columnOffset = [0, 2.82, -3.0];
    }

    if (column >= 4) {
        columnOffset = [0, -5.8, 5.64];
    }

    return shape.translate(
        [0, 0, -rowRadius]
    ).rotateX(
        rad2deg((row - 2) * alpha)
    ).translate(
        [0, 0, rowRadius]
    ).translate(
        [0, 0, -columnRadius]
    ).rotateY(
        rad2deg((column - 2) * beta)
    ).translate(
        [0, 0, columnRadius]
    ).translate(
        columnOffset
    ).rotateY(
        rad2deg(-alpha)
    ).translate(
        [0, 0, 13]
    ); 
}


function rad2deg(radians) {
    return radians * (180 / Math.PI);
}