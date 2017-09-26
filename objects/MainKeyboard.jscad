include("ThumbCluster.jscad");
include("KeyColumn.jscad");

function getParameterDefinitions() {
    return [
        {name: 'switchType', caption: 'Switch Type', type: 'choice', values: ['CherryMX'], initial: 'CherryMX'}
    ];
}


function main() {
    var alpha = Math.PI / 12;
    var beta = Math.PI / 36;

    var saProfileKeyHeight = 12.7;
    var plateThickness = 4.0;
    var mountHeight = 17.4;
    var mountWidth = 17.4

    var capTopHeight = plateThickness + saProfileKeyHeight;

    var rowRadius = ((((mountHeight + 1/2) / 2) / (Math.sin(alpha / 2))) + capTopHeight);
    var columnRadius = ((((mountWidth + 2.0) / 2) / Math.sin(beta / 2)) + capTopHeight);

    var keyholes = [];

    for (column = 0; column < 6; column++) {
        for (row = 0; row < 5; row++) {
            if (column != 0 || row != 4) {
                keyholes.push(keyPlace(column, row, CherryMX(), rowRadius, columnRadius, alpha, beta));
            }
        }
    }

    return union(keyholes);
}

var keyPlace = function(column, row, shape, rowRadius, columnRadius, alpha, beta) {
    var rowPlacedShape = shape.translate(
        [0, 0, -rowRadius]
    ).rotateX(((row - 2) * alpha) * (180 / Math.PI)).translate(
        [0, 0, rowRadius]
    );

    var columnOffset = [0, 0, 0];

    if (column == 2) {
        columnOffset = [0, 2.82, -3.0];
    }

    if (column >= 4) {
        columnOffset = [0, -5.8, 5.64];
    }

    var columnAngle = (column - 2) * beta;

    var placedShape = rowPlacedShape.translate(
        [0, 0, -columnRadius]
    ).rotateY(columnAngle * (180 / Math.PI)).translate(
        [0, 0, columnRadius]
    ).translate(columnOffset);

    return placedShape.rotateY(alpha * (180 / Math.PI)).translate([0, 0, 13]);
};




var casePlace = function(column, row, shape) {
    
            var rowPlacedShape = shape.translate(
                [0, 0, -rowRadius]
            ).rotateX((row - 2) * alpha).translate([0, 0, rowRadius]);
    
            var columnOffset = [0, -4.35, 5.64];
    
            var columnAngle = (column - 2) * beta;
    
            var placedShape = rowPlacedShape.translate(
                [0, 0, -columnRadius]
            ).rotateY(columnAngle).translate(
                [0, 0, columnRadius]
            ).translate(columnOffset);
    
            return placedShape.rotateY(alpha).translate([0, 0, 13]);
        };