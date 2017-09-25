
const HoleSize = 14.30;
const PlateThickness = 4.0;
const endcapsize = 6.5;

CherryMX = function CherryMX(supports = false) {
    // datcyl seems to use 14.4 so I'm starting with that, but it seems
    // slightly large on my test print.


    var shape = linear_extrude(
        {height: 2.75},
        hull(
            circle(
                {r: 1, center: true}
            ),
            square(
                {size: [1.5, PlateThickness],
                center: true}
            ).translate([1.5 / 2, 1])
        )
    ).rotateX(90).translate([HoleSize / 2, 2.75 / 2, -1]);

    var complete = union(
        difference(
            cube(
                {size: [HoleSize + 3, HoleSize + 3, PlateThickness],
                center: true}
            ),
            cube(
                {size: [HoleSize, HoleSize, PlateThickness],
                center: true}
            )
        ),
        shape, 
        mirror([1, 0, 0], shape)
    );

    var ledgeremoval = cube(
        {size: [4.5, 1.8, PlateThickness],
        center: true}
    ).translate([0, HoleSize / 2, -1.3]);

    complete = difference(complete, ledgeremoval, mirror([0, 1, 0], ledgeremoval));

    if (!supports) {
        return complete;
    }

    var endcap = difference(
        cube(
            {size: [HoleSize +3, endcapsize, PlateThickness],
            center: true}
        ).rotateZ(90).translate([((HoleSize + 3) / 2) + (endcapsize / 2), 0, 0]),
        union(
            cube(
                {size: [14.2, 3.5, PlateThickness],
                center: true}
            ),
            cube(
                {size: [16, 3.5, PlateThickness],
                center: true}
            ).translate([0, 0, -1.3])
        ).rotateZ(90).translate([12, 0, 0])
    );

    result = union( complete, endcap, mirror([1, 0, 0], endcap));

    return result;
}