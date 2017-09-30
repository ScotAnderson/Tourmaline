include("CherryMX.jscad");
include("utils.jscad");


var plateThickness = 4.0;
var saProfileKeyHeight = 12.7;
var mountHeight = 17.4;
var mountWidth = 17.4;

DactylSlantThumb = function (switchType) {

    var sw = null;
    var sw2 = null;

    switch(switchType) {
        case 'CherryMX':
            sw = CherryMX();
            sw2 = CherryMX(true);
            break;

        case 'Alps':
            sw = Alps();
            sw2 = Alps(true);
            break;
    }

    var thumbKeys = [];

    thumbLayout(sw, sw2).forEach(function(item) { thumbKeys.push(item)});

    var result = union(thumbKeys);
    result = union(result, createConnections(thumbKeys));
    result.properties.thumbconnects = [
        thumbKeys[0].properties.corners[6],
        thumbKeys[0].properties.corners[7],
        thumbKeys[0].properties.corners[4],
        thumbKeys[0].properties.corners[5],
        thumbKeys[0].properties.corners[6],
        thumbKeys[0].properties.corners[7],
        thumbKeys[1].properties.corners[4],
        thumbKeys[1].properties.corners[5],
        thumbKeys[2].properties.corners[4],
        thumbKeys[2].properties.corners[5],
        thumbKeys[2].properties.corners[6],
        thumbKeys[2].properties.corners[7]
    ];
    

    return result.rotateZ(rad2deg(Math.PI / 2));
};

function createConnections(thumbKeys) {
    var connections = [];

    connections.push(columnConnection(thumbKeys[4], thumbKeys[3]));
    connections.push(columnConnection(thumbKeys[5], thumbKeys[4]));
    connections.push(columnConnection(thumbKeys[2], thumbKeys[1]));
    connections.push(rowConnection(thumbKeys[0], thumbKeys[1]));
    connections.push(rowConnection(thumbKeys[2], thumbKeys[5]));
    connections.push(squareConnection(
        vec2list(thumbKeys[5].properties.corners[6]),
        vec2list(thumbKeys[5].properties.corners[7]),
        vec2list(thumbKeys[2].properties.corners[2]),
        vec2list(thumbKeys[2].properties.corners[3]),
        vec2list(thumbKeys[4].properties.corners[4]),
        vec2list(thumbKeys[4].properties.corners[5]),
        vec2list(thumbKeys[1].properties.corners[0]),
        vec2list(thumbKeys[1].properties.corners[1])
    ));

    connections.push(triangleConnection(
        vec2list(thumbKeys[4].properties.corners[4]),
        vec2list(thumbKeys[4].properties.corners[5]),
        vec2list(thumbKeys[4].properties.corners[6]),
        vec2list(thumbKeys[4].properties.corners[7]),
        vec2list(thumbKeys[1].properties.corners[0]),
        vec2list(thumbKeys[1].properties.corners[1])
    ));

    connections.push(triangleConnection(
        vec2list(thumbKeys[1].properties.corners[0]),
        vec2list(thumbKeys[1].properties.corners[1]),
        vec2list(thumbKeys[4].properties.corners[6]),
        vec2list(thumbKeys[4].properties.corners[7]),
        centerPoint(thumbKeys[1].properties.corners[0], thumbKeys[1].properties.corners[2]),
        centerPoint(thumbKeys[1].properties.corners[1], thumbKeys[1].properties.corners[3])
    ));

    connections.push(triangleConnection(
        centerPoint(thumbKeys[1].properties.corners[0], thumbKeys[1].properties.corners[2]),
        centerPoint(thumbKeys[1].properties.corners[1], thumbKeys[1].properties.corners[3]),
        vec2list(thumbKeys[4].properties.corners[6]),
        vec2list(thumbKeys[4].properties.corners[7]),
        vec2list(thumbKeys[3].properties.corners[4]),
        vec2list(thumbKeys[3].properties.corners[5])
    ));

    connections.push(triangleConnection(
        vec2list(thumbKeys[3].properties.corners[4]),
        vec2list(thumbKeys[3].properties.corners[5]),
        vec2list(thumbKeys[1].properties.corners[2]),
        vec2list(thumbKeys[1].properties.corners[3]),
        centerPoint(thumbKeys[1].properties.corners[0], thumbKeys[1].properties.corners[2]),
        centerPoint(thumbKeys[1].properties.corners[1], thumbKeys[1].properties.corners[3])     
    ));

    connections.push(triangleConnection(
        vec2list(thumbKeys[3].properties.corners[4]),
        vec2list(thumbKeys[3].properties.corners[5]),
        vec2list(thumbKeys[3].properties.corners[6]),
        vec2list(thumbKeys[3].properties.corners[7]),
        vec2list(thumbKeys[1].properties.corners[2]),
        vec2list(thumbKeys[1].properties.corners[3])
    ));

    return union(connections);
}

function squareConnection(
    topleftupper, topleftlower, toprightupper, toprightlower,
    bottomleftupper, bottomleftlower, bottomrightupper, bottomrightlower
) {
    return polyhedron({
        points: [
            topleftupper,
            topleftlower,
            toprightupper,
            toprightlower,
            bottomleftupper,
            bottomleftlower,
            bottomrightupper,
            bottomrightlower
        ],
        triangles: [
            [0, 2, 6], [6, 4, 0],
            [0, 1, 3], [3, 2, 0],
            [2, 3, 7], [7, 6, 2],
            [5, 4, 6], [6, 7, 5],
            [1, 0, 4], [4, 5, 1],
            [7, 3, 1], [7, 1, 5]
        ] 
    })

}

function triangleConnection(
    topupper, toplower, 
    bottomleftupper, bottomleftlower, 
    bottomrightupper, bottomrightlower
) {
    return polyhedron({
        points: [
            topupper,
            toplower,
            bottomleftupper,
            bottomleftlower,
            bottomrightupper,
            bottomrightlower
        ],
        triangles: [
            [0, 4, 2], [2, 4, 5], [5, 3, 2],
            [0, 2, 3], [3, 1, 0], [4, 0, 1],
            [1, 5, 4], [1, 3, 5]
        ]
    });
}

function diagonalConnection(key1, key2, key3, key4) {
    return polyhedron({
        points: [
            vec2list(key1.properties.corners[6]),
            vec2list(key1.properties.corners[7]),
            vec2list(key2.properties.corners[2]), 
            vec2list(key2.properties.corners[3]),
            vec2list(key3.properties.corners[4]),
            vec2list(key3.properties.corners[5]),
            vec2list(key4.properties.corners[0]), 
            vec2list(key4.properties.corners[1])
        ],
        triangles: [
            [1, 0, 4], [4, 5, 1], [5, 4, 6], [6, 7, 5],
            [7, 6, 2], [2, 3, 7], [3, 2, 0], [0, 1, 3], 
            [0, 2, 4], [4, 2, 6], [3, 1, 5], [3, 5, 7]
        ]
    });
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



function thumb2xcolumn(sw2) {
    return thumbPlace(0, -1/2, sw2);
}

function thumb2x1column(sw, sw2) {
    return [
        thumbPlace(1, -1/2, sw2),
        thumbPlace(1, 1, sw)
    ];
}

function thumb1xcolumn(sw) {
    return [
        thumbPlace(2, -1, sw),
        thumbPlace(2, 0, sw),
        thumbPlace(2, 1, sw)
    ];
}

function thumbLayout(sw, sw2) {
    var result = [thumb2xcolumn(sw2)];

    thumb2x1column(sw, sw2).forEach(function(item) {result.push(item)});
    thumb1xcolumn(sw).forEach(function(item) {result.push(item)});
    
    return result;
}

function columnConnection(key1, key2) {
    return polyhedron({
        points: [
            vec2list(key1.properties.corners[2]),
            vec2list(key1.properties.corners[3]),
            vec2list(key1.properties.corners[6]), 
            vec2list(key1.properties.corners[7]),
            vec2list(key2.properties.corners[0]),
            vec2list(key2.properties.corners[1]),
            vec2list(key2.properties.corners[4]), 
            vec2list(key2.properties.corners[5])
        ],
        triangles: [
             [1, 0, 4], [4, 5, 1], [5, 4, 6], [6, 7, 5],
             [7, 6, 2], [2, 3, 7], [3, 2, 0], [0, 1, 3], 
             [0, 2, 4], [4, 2, 6], [3, 1, 5], [3, 5, 7]
        ]
    });
}

function rowConnection(key1, key2) {
    return polyhedron({
        points: [
            vec2list(key1.properties.corners[0]),
            vec2list(key1.properties.corners[1]),
            vec2list(key1.properties.corners[2]), 
            vec2list(key1.properties.corners[3]),
            vec2list(key2.properties.corners[4]),
            vec2list(key2.properties.corners[5]),
            vec2list(key2.properties.corners[6]), 
            vec2list(key2.properties.corners[7])
        ],
        triangles: [
            [1, 0, 4], [4, 5, 1], [5, 4, 6], [6, 7, 5],
            [7, 6, 2], [2, 3, 7], [2, 3, 0], [0, 1, 3], 
            [0, 2, 4], [4, 2, 6], [3, 1, 5], [3, 5, 7]
        ]
    });
}