


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