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

    var plateThickness = 4.0;
    var mountWidth = 17.4;
    var mountHeight = 17.4;

    keys = [];

    columns.forEach(function(column) {
        rows.forEach(function(row) {
            if (column != 0 || row != 4) {
                keys.push(keyPlace(column, row, switchFactory()));
            }
        });
    });

    var webThickness = 3.5;
    var postSize = 0.1;
    var webPost = cube(
        {size: [webPost, webPost, webThickness],
        center: true}
    ).translate([0, 0, (webThickness / 2) + plateThickness]);

    var postAdj = postSize / 2;
    var webPostTR = webPost.translate([mountWidth / 2 - postAdj, mountHeight / 2 - postAdj, 0]);
    var webPostTL = webPost.translate([mountWidth / 2 + postAdj, mountHeight / 2 - postAdj, 0]);
    var webPostBL = webPost.translate([mountWidth / 2 + postAdj, mountHeight / 2 + postAdj, 0]);
    var webPostBR = webPost.translate([mountWidth / 2 - postAdj, mountHeight / 2 + postAdj, 0]);

    // var connect = polyhedron({
    //     points: [
    //         keys[0].properties.corners[4],
    //         keys[0].properties.corners[5],
    //         keys[0].properties.corners[6], 
    //         keys[0].properties.corners[7],
    //         keys[1].properties.corners[0],
    //         keys[1].properties.corners[1],
    //         keys[1].properties.corners[2], 
    //         keys[1].properties.corners[3],
    //     ],
    //     triangles: [
    //         [0, 1, 4], [4, 5, 1], [4, 5, 6], [6, 7, 5],
    //         [6, 7, 2], [2, 3, 7], [2, 3, 0], [0, 1, 3], 
    //         [0, 2, 4], [2, 4, 6], [1, 3, 5], [3, 5, 7]
    //     ]
    // });

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