include("CherryMX.jscad"); 
include("Alps.jscad");
include("utils.jscad");

DactylKeyboard = function (switchType) {
    OpenJsCad.log("Starting DactylKeyboard.jscad::DactylKeyboard()");

    var sw = null;

    switch(switchType) {
        case 'CherryMX':
            sw = CherryMX();
            break;

        case 'Alps':
            sw = Alps();
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
                keys.push(keyPlace(column, row, sw));
            }
        });
    });
    
    connect = union( 
        createColumnConnections(keys),
        createRowConnections(keys),
        createDiagonalConnections(keys)
    );

    var result = union(union(keys), connect);

    result.properties.keyconnects = [
        keys[3].properties.corners[0],
        keys[3].properties.corners[1],
        keys[3].properties.corners[4],
        keys[3].properties.corners[5],
        keys[3].properties.corners[2],
        keys[3].properties.corners[3],
        keys[7].properties.corners[0],
        keys[7].properties.corners[1],
        keys[8].properties.corners[4],
        keys[8].properties.corners[5],
        keys[8].properties.corners[0],
        keys[8].properties.corners[1]
    ];

    return result;
}




function createRowConnections(keys) {
    var connections = [];

    connections.push(rowConnection(keys[0], keys[4]));
    connections.push(rowConnection(keys[1], keys[5]));
    connections.push(rowConnection(keys[2], keys[6]));
    connections.push(rowConnection(keys[3], keys[7]));

    connections.push(rowConnection(keys[4], keys[9]));
    connections.push(rowConnection(keys[5], keys[10]));
    connections.push(rowConnection(keys[6], keys[11]));
    connections.push(rowConnection(keys[7], keys[12]));
    connections.push(rowConnection(keys[8], keys[13]));

    connections.push(rowConnection(keys[9], keys[14]));
    connections.push(rowConnection(keys[10], keys[15]));
    connections.push(rowConnection(keys[11], keys[16]));
    connections.push(rowConnection(keys[12], keys[17]));
    connections.push(rowConnection(keys[13], keys[18]));

    connections.push(rowConnection(keys[14], keys[19]));
    connections.push(rowConnection(keys[15], keys[20]));
    connections.push(rowConnection(keys[16], keys[21]));
    connections.push(rowConnection(keys[17], keys[22]));
    connections.push(rowConnection(keys[18], keys[23]));

    connections.push(rowConnection(keys[19], keys[24]));
    connections.push(rowConnection(keys[20], keys[25]));
    connections.push(rowConnection(keys[21], keys[26]));
    connections.push(rowConnection(keys[22], keys[27]));
    connections.push(rowConnection(keys[23], keys[28]));
    
    
    return union(connections);
}

function createDiagonalConnections(keys) {
    var connections = [];

    connections.push(diagonalConnection(keys[0], keys[4], keys[1], keys[5]));
    connections.push(diagonalConnection(keys[1], keys[5], keys[2], keys[6]));
    connections.push(diagonalConnection(keys[2], keys[6], keys[3], keys[7]));

    connections.push(diagonalConnection(keys[4], keys[9], keys[5], keys[10]));
    connections.push(diagonalConnection(keys[5], keys[10], keys[6], keys[11]));
    connections.push(diagonalConnection(keys[6], keys[11], keys[7], keys[12]));
    connections.push(diagonalConnection(keys[7], keys[12], keys[8], keys[13]));

    connections.push(diagonalConnection(keys[9], keys[14], keys[10], keys[15]));
    connections.push(diagonalConnection(keys[10], keys[15], keys[11], keys[16]));
    connections.push(diagonalConnection(keys[11], keys[16], keys[12], keys[17]));
    connections.push(diagonalConnection(keys[12], keys[17], keys[13], keys[18])); 

    connections.push(diagonalConnection(keys[14], keys[19], keys[15], keys[20]));
    connections.push(diagonalConnection(keys[15], keys[20], keys[16], keys[21]));
    connections.push(diagonalConnection(keys[16], keys[21], keys[17], keys[22]));
    connections.push(diagonalConnection(keys[17], keys[22], keys[18], keys[23])); 

    connections.push(diagonalConnection(keys[19], keys[24], keys[20], keys[25]));
    connections.push(diagonalConnection(keys[20], keys[25], keys[21], keys[26]));
    connections.push(diagonalConnection(keys[21], keys[26], keys[22], keys[27]));
    connections.push(diagonalConnection(keys[22], keys[27], keys[23], keys[28]));
    
    
    return union(connections);
}

function createColumnConnections(keys) {
    var connections = [];

    connections.push(columnConnection(keys[0], keys[1]));
    connections.push(columnConnection(keys[1], keys[2]));
    connections.push(columnConnection(keys[2], keys[3]));
    connections.push(columnConnection(keys[4], keys[5]));
    connections.push(columnConnection(keys[5], keys[6]));
    connections.push(columnConnection(keys[6], keys[7]));
    connections.push(columnConnection(keys[7], keys[8]));
    connections.push(columnConnection(keys[9], keys[10]));
    connections.push(columnConnection(keys[10], keys[11]));
    connections.push(columnConnection(keys[11], keys[12]));
    connections.push(columnConnection(keys[12], keys[13]));
    connections.push(columnConnection(keys[14], keys[15]));
    connections.push(columnConnection(keys[15], keys[16]));
    connections.push(columnConnection(keys[16], keys[17]));
    connections.push(columnConnection(keys[17], keys[18]));
    connections.push(columnConnection(keys[19], keys[20]));
    connections.push(columnConnection(keys[20], keys[21]));
    connections.push(columnConnection(keys[21], keys[22]));
    connections.push(columnConnection(keys[22], keys[23]));
    connections.push(columnConnection(keys[24], keys[25]));
    connections.push(columnConnection(keys[25], keys[26]));
    connections.push(columnConnection(keys[26], keys[27]));
    connections.push(columnConnection(keys[27], keys[28]));


    return union(connections);
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

    return columnPlace(
        columnRadius,
        (column - 2) * beta,
        rowPlace(
            rowRadius,
            (row - 2) * alpha,
            shape
        )
    ).translate(
        columnOffset
    ).rotateY(
        rad2deg(-alpha)
    ).translate(
        [0, 0, 13]
    ); 
}