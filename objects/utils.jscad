


vec2list = function(vector) {
    return [vector.x, vector.y, vector.z];
}

rad2deg = function(radians) {
    return radians * (180 / Math.PI);
}

vec2list = function(vector) {
    return [vector.x, vector.y, vector.z];
}

centerPoint = function(point1, point2) {
    return [
        ((point1.x - point2.x) / 2) + point2.x,
        ((point1.y - point2.y) / 2) + point2.y,
        ((point1.z - point2.z) / 2) + point2.z
    ];
}

triangleConnection = function(
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

rowConnection = function (key1, key2) {
    return squareConnection(
        vec2list(key1.properties.corners[2]),
        vec2list(key1.properties.corners[3]),
        vec2list(key1.properties.corners[6]), 
        vec2list(key1.properties.corners[7]),
        vec2list(key2.properties.corners[0]),
        vec2list(key2.properties.corners[1]),
        vec2list(key2.properties.corners[4]), 
        vec2list(key2.properties.corners[5])
    );
}

columnConnection = function (key1, key2) {
    return squareConnection(
        vec2list(key1.properties.corners[0]),
        vec2list(key1.properties.corners[1]),
        vec2list(key1.properties.corners[2]), 
        vec2list(key1.properties.corners[3]),
        vec2list(key2.properties.corners[4]),
        vec2list(key2.properties.corners[5]),
        vec2list(key2.properties.corners[6]), 
        vec2list(key2.properties.corners[7])
    );
}

diagonalConnection = function (key1, key2, key3, key4) {
    return squareConnection(
        vec2list(key1.properties.corners[2]),
        vec2list(key1.properties.corners[3]),
        vec2list(key2.properties.corners[0]), 
        vec2list(key2.properties.corners[1]),
        vec2list(key3.properties.corners[6]),
        vec2list(key3.properties.corners[7]),
        vec2list(key4.properties.corners[4]), 
        vec2list(key4.properties.corners[5])  
    );
}

squareConnection = function(
    topleftupper, topleftlower, toprightupper, toprightlower,
    bottomleftupper, bottomleftlower, bottomrightupper, bottomrightlower
) {
    return union(
        triangleConnection(
            topleftupper, topleftlower,
            bottomleftupper, bottomleftlower,
            bottomrightupper, bottomrightlower
        ),
        triangleConnection(
            topleftupper, topleftlower,
            bottomrightupper, bottomrightlower,
            toprightupper, toprightlower
        )
    );
}

rowPlace = function (rowRadius, angle, shape) {
    return shape.translate(
        [0, 0, -rowRadius]
    ).rotateX(
        rad2deg(angle)
    ).translate(
        [0, 0, rowRadius]
    );
}

columnPlace = function (columnRadius, angle, shape) {
    return shape.translate(
        [0, 0, -columnRadius]
    ).rotateY(
        rad2deg(angle)
    ).translate(
        [0, 0, columnRadius]
    );
}

