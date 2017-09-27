include("ThumbCluster.jscad");
include("KeyColumn.jscad");
include("DactylSlantThumb.jscad");
include("DactylKeyboard.jscad");

function getParameterDefinitions() {
    return [
        {name: 'switchType', caption: 'Switch Type', type: 'choice', values: ['CherryMX'], initial: 'CherryMX'}
    ];
}


function main() {
    // var alpha = Math.PI / 12;
    // var beta = Math.PI / 36;

    // var saProfileKeyHeight = 12.7;
    // var plateThickness = 4.0;
    // var mountHeight = 17.4;
    // var mountWidth = 17.4

    // var capTopHeight = plateThickness + saProfileKeyHeight;

    // var rowRadius = ((((mountHeight + 1/2) / 2) / (Math.sin(alpha / 2))) + capTopHeight);
    // var columnRadius = ((((mountWidth + 2.0) / 2) / Math.sin(beta / 2)) + capTopHeight);

    // var keyholes = [];

    // for (column = 0; column < 6; column++) {
    //     for (row = 0; row < 5; row++) {
    //         if (column != 0 || row != 4) {
    //             keyholes.push(keyPlace(column, row, CherryMX(), rowRadius, columnRadius, alpha, beta));
    //         }
    //     }
    // }

    var keyboard = DactylKeyboard(params.switchType).rotateZ(-90);
    keyboard = union(keyboard, DactylSlantThumb(params.switchType)).rotateZ(90).translate([-80, 0, 0]);
 
    return union(keyboard, mirror([1, 0, 0], keyboard).translate([80, 0, 0]));
} 

// var keyPlace = function(column, row, shape, rowRadius, columnRadius, alpha, beta) {
//     var rowPlacedShape = shape.translate(
//         [0, 0, -rowRadius]
//     ).rotateX(rad2deg((row - 2) * alpha)).translate(
//         [0, 0, rowRadius]
//     );

//     var columnOffset = [0, 0, 0];

//     if (column == 2) {
//         columnOffset = [0, 2.82, -3.0];
//     }

//     if (column >= 4) {
//         columnOffset = [0, -5.8, 5.64];
//     }

//     var columnAngle = (column - 2) * beta;

//     var placedShape = rowPlacedShape.translate(
//         [0, 0, -columnRadius]
//     ).rotateY(rad2deg(columnAngle)).translate(
//         [0, 0, columnRadius]
//     ).translate(columnOffset);

//     return placedShape.rotateY(rad2deg(alpha)).translate([0, 0, 13]);
// };


// function rad2deg(radians) {
//     return radians * (180 / Math.PI);
// }

// var casePlace = function(column, row, shape, rowRadius, columnRadius, alpha, beta) {
    
//             var rowPlacedShape = shape.translate(
//                 [0, 0, -rowRadius]
//             ).rotateX((row - 2) * alpha).translate([0, 0, rowRadius]);
    
//             var columnOffset = [0, -4.35, 5.64];
    
//             var columnAngle = (column - 2) * beta;
    
//             var placedShape = rowPlacedShape.translate(
//                 [0, 0, -columnRadius]
//             ).rotateY(columnAngle).translate(
//                 [0, 0, columnRadius]
//             ).translate(columnOffset);
    
//             return placedShape.rotateY(alpha).translate([0, 0, 13]);
//         };