
// this is just a clone of the dactyl code. Untested (might be completely wrong).
// I don't have any alps switches.
Alps = function() {

    var keyswitchWidth = 14.4;
    var keyswitchHeight = 14.4;
    var plateThickness = 4;
    var alpsHeight = 13;
    var alpsNotchHeight = 1;
    var alpsNotchWidth = 15.5;

    var topwall = cube({
        size: [keyswitchWidth + 3, 2.2, plateThickness],
        center: true
    }).translate(
        [0, (2.2 / 2) + (alpsHeight / 2), plateThickness / 2]
    );

    var leftwall = union(
        cube({
            size: [1.5, keyswitchHeight + 3, plateThickness],
            center: true
        }).translate([(1.5 / 2) + (15.6 / 2), 0, plateThickness / 2]),
        cube({
            size: [1.5, keyswitchHeight + 3, 1.0],
            center: true
        }).translate([(1.5 / 2) + (alpsNotchWidth / 2), 0, plateThickness - (alpsNotchHeight / 2)])
    );

    var result = union(topwall, leftwall);
    result = union(result, mirror([1, 0, 0], result), mirror([0, 1, 0], result));

    return result;
};