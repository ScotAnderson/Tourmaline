include("CherryMX.jscad");
var plateThickness = 4.0;
var saProfileKeyHeight = 12.7;
var mountHeight = 17.4;
var mountWidth = 17.4;

DactylSlantThumb = function (switchType) {

    var switchFactory = null;
    switch(switchType) {
        case 'CherryMX':
            switchFactory = CherryMX;
            break;
    }

    var thumb = thumbLayout(switchFactory).rotateZ(rad2deg(Math.PI / 2));

    return thumb;
};





function rad2deg(radians) {
    return radians * (180 / Math.PI);
}

function thumbPlace(column, row, shape) {
    var alpha = Math.PI / 12;
    var beta = Math.PI / 36;

    var saProfileKeyHeight = 12.7;
    var plateThickness = 4.0;
    var mountHeight = 17.4;
    var mountWidth = 17.4

    var capTopHeight = plateThickness + saProfileKeyHeight;

    var rowRadius = ((((mountHeight + 1) / 2) / (Math.sin(alpha / 2))) + capTopHeight);
    var columnRadius = ((((mountWidth + 2) / 2) / (Math.sin(beta / 2))) + capTopHeight);


    return shape.rotateZ(
        90
    ).translate(
        [0, 0, -rowRadius]
    ).rotateX(
        rad2deg(alpha * row)
    ).translate(
        [0, 0, rowRadius]
    ).translate(
        [0, 0, -columnRadius]
    ).rotateY(
        rad2deg(beta * column)
    ).translate(
        [0, 0, columnRadius]
    ).translate(
        [mountWidth, 0, 0]
    ).rotateZ(
        rad2deg(Math.PI * (0.0625))
    ).rotateX(
        rad2deg(alpha)
    ).rotateY(
        rad2deg(alpha)
    ).translate(
        [-52, -45, 40]
    );
}

function thumb2xcolumn(switchFactory) {
    return thumbPlace(0, -1/2, switchFactory(true));
}

function thumb2x1column(switchFactory) {
    return union (
        thumbPlace(1, -1/2, switchFactory(true)),
        thumbPlace(1, 1, switchFactory())
    );
}

function thumb1xcolumn(switchFactory) {
    return union(
        thumbPlace(2, -1, switchFactory()),
        thumbPlace(2, 0, switchFactory()),
        thumbPlace(2, 1, switchFactory())
    );
}

function thumbLayout(switchFactory) {
    return union(
        thumb2xcolumn(switchFactory),
        thumb2x1column(switchFactory),
        thumb1xcolumn(switchFactory)
    );
}