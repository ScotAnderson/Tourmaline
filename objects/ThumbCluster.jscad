include("CherryMX.jscad");

ThumbCluster = function ThumbCluster(switchType) {

    var switchFactory = null;
    switch(switchType) {
        case 'CherryMX':
            switchFactory = CherryMX;
            break;
    }

    var thumbButton1 = switchFactory(true);
    var thumbButton2 = switchFactory(true).translate([   0, 19, 0]);
    var thumbButton3 = switchFactory().translate(    [29, 19, 0]);
    var thumbButton4 = switchFactory().translate(    [29, 38, 0]);
    var thumbButton5 = switchFactory().translate(    [10, 38, 0]);
    var thumbButton6 = switchFactory().translate(    [-9, 38, 0]);

    var b1Bounds = thumbButton1.getBounds();
    var b2Bounds = thumbButton2.getBounds();
    var b3Bounds = thumbButton3.getBounds();
    var b4Bounds = thumbButton4.getBounds();
    var b5Bounds = thumbButton5.getBounds();
    var b6Bounds = thumbButton6.getBounds();

    var largeplate = CSG.cube({
        corner1: [b6Bounds[0].x - 3, b1Bounds[0].y - 3, b1Bounds[0].z],
        corner2: [b4Bounds[1].x + 3, b4Bounds[1].y + 3, b1Bounds[1].z]
    });
    
    largeplate = difference(
        largeplate,
        CSG.cube({
            corner1: [b1Bounds[0].x, b1Bounds[0].y, b1Bounds[0].z],
            corner2: [b1Bounds[1].x, b1Bounds[1].y, b1Bounds[1].z]
        }),
        CSG.cube({
            corner1: [b2Bounds[0].x, b2Bounds[0].y, b2Bounds[0].z],
            corner2: [b2Bounds[1].x, b2Bounds[1].y, b2Bounds[1].z]
        }),
        CSG.cube({
            corner1: [b3Bounds[0].x, b3Bounds[0].y, b3Bounds[0].z],
            corner2: [b3Bounds[1].x, b3Bounds[1].y, b3Bounds[1].z]
        }),
        CSG.cube({
            corner1: [b4Bounds[0].x, b4Bounds[0].y, b4Bounds[0].z],
            corner2: [b4Bounds[1].x, b4Bounds[1].y, b4Bounds[1].z]
        }),
        CSG.cube({
            corner1: [b5Bounds[0].x, b5Bounds[0].y, b5Bounds[0].z],
            corner2: [b5Bounds[1].x, b5Bounds[1].y, b5Bounds[1].z]
        }),
        CSG.cube({
            corner1: [b6Bounds[0].x, b6Bounds[0].y, b6Bounds[0].z],
            corner2: [b6Bounds[1].x, b6Bounds[1].y, b6Bounds[1].z]
        }),
        CSG.cube({
            corner1: [b2Bounds[1].x + 3, b3Bounds[0].y - 3, b6Bounds[0].z],
            corner2: [b3Bounds[1].x + 3, b1Bounds[0].y - 3, b6Bounds[1].z]
        })
    );

    var cluster = union(
        thumbButton1,
        thumbButton2,
        thumbButton3,
        thumbButton4,
        thumbButton5,
        thumbButton6,
        largeplate
    );
    
    return cluster;
}

function connection(objectA, objectB) {
    var points = []

}

function generatePoints(objectA) {
    var bounds = objectA.getBounds();
    return [
        [bounds[0].x, bounds[0].y, bounds[0].z],
        [bounds[0].x, bounds[0].y, bounds[1].z],
        [bounds[0].x, bounds[1].y, bounds[0].z],
        [bounds[0].x, bounds[1].y, bounds[1].z],
        [bounds[1].x, bounds[0].y, bounds[0].z],
        [bounds[1].x, bounds[0].y, bounds[1].z],
        [bounds[1].x, bounds[1].y, bounds[0].z],
        [bounds[1].x, bounds[1].y, bounds[1].z]
    ];
}