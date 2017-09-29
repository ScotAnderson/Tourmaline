
const endcapsize = 6.5;

CherryMX = function (supports = false, holeSize = 14.30, plateThickness = 4.0) {
    OpenJsCad.log("Starting CherryMX.jscad::CherryMX");

    var halfHoleSize = (holeSize) / 2;



    var shape = linear_extrude(
        {height: 2.75},
        hull(
            circle(
                {r: 1, center: true}
            ),
            square(
                {size: [1.5, plateThickness],
                center: true}
            ).translate([1.5 / 2, 1])
        )
    ).rotateX(90).translate([holeSize / 2, 2.75 / 2, -1]);

    var complete = union(
        difference(
            cube(
                {size: [holeSize + 3, holeSize + 3, plateThickness],
                center: true}
            ),
            cube(
                {size: [holeSize, holeSize, plateThickness],
                center: true}
            )
        ),
        shape, 
        mirror([1, 0, 0], shape)
    );

    var ledgeremoval = cube(
        {size: [4.5, 1.8, plateThickness],
        center: true}
    ).translate([0, holeSize / 2, -1.3]);

    complete = difference(complete, ledgeremoval, mirror([0, 1, 0], ledgeremoval));

    if (!supports) {

        complete.properties.corners = [
            new CSG.Vector3D([ (halfHoleSize + 1.5),  (halfHoleSize + 1.5),  (plateThickness / 2)]),
            new CSG.Vector3D([ (halfHoleSize + 1.5),  (halfHoleSize + 1.5), -(plateThickness / 2)]),
            new CSG.Vector3D([-(halfHoleSize + 1.5),  (halfHoleSize + 1.5),  (plateThickness / 2)]),
            new CSG.Vector3D([-(halfHoleSize + 1.5),  (halfHoleSize + 1.5), -(plateThickness / 2)]),
            new CSG.Vector3D([ (halfHoleSize + 1.5), -(halfHoleSize + 1.5),  (plateThickness / 2)]),
            new CSG.Vector3D([ (halfHoleSize + 1.5), -(halfHoleSize + 1.5), -(plateThickness / 2)]),
            new CSG.Vector3D([-(halfHoleSize + 1.5), -(halfHoleSize + 1.5),  (plateThickness / 2)]),
            new CSG.Vector3D([-(halfHoleSize + 1.5), -(halfHoleSize + 1.5), -(plateThickness / 2)])
        ];
        return complete;
    }

    var endcap = difference(
        cube(
            {size: [holeSize +3, endcapsize, plateThickness],
            center: true}
        ).rotateZ(90).translate([((holeSize + 3) / 2) + (endcapsize / 2), 0, 0]),
        union(
            cube(
                {size: [14.2, 3.5, plateThickness],
                center: true}
            ),
            cube(
                {size: [16, 3.5, plateThickness],
                center: true}
            ).translate([0, 0, -1.3])
        ).rotateZ(90).translate([12, 0, 0])
    );

    complete = union( complete, endcap, mirror([1, 0, 0], endcap));
    complete.properties.corners = [
        new CSG.Vector3D([ (halfHoleSize + 1.5 + (endcapsize)),  (halfHoleSize + 1.5),  (plateThickness / 2)]),
        new CSG.Vector3D([ (halfHoleSize + 1.5 + (endcapsize)),  (halfHoleSize + 1.5), -(plateThickness / 2)]),
        new CSG.Vector3D([-(halfHoleSize + 1.5 + (endcapsize)),  (halfHoleSize + 1.5),  (plateThickness / 2)]),
        new CSG.Vector3D([-(halfHoleSize + 1.5 + (endcapsize)),  (halfHoleSize + 1.5), -(plateThickness / 2)]),
        new CSG.Vector3D([ (halfHoleSize + 1.5 + (endcapsize)), -(halfHoleSize + 1.5),  (plateThickness / 2)]),
        new CSG.Vector3D([ (halfHoleSize + 1.5 + (endcapsize)), -(halfHoleSize + 1.5), -(plateThickness / 2)]),
        new CSG.Vector3D([-(halfHoleSize + 1.5 + (endcapsize)), -(halfHoleSize + 1.5),  (plateThickness / 2)]),
        new CSG.Vector3D([-(halfHoleSize + 1.5 + (endcapsize)), -(halfHoleSize + 1.5), -(plateThickness / 2)])
    ];

    return complete;
}