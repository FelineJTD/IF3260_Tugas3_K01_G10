const Block = (name, color, size, offset) => {
    return new Model(
        name,
        // Vertices
        [
            -size.w/2, -size.h/2, -size.d/2, // 0
            size.w/2, -size.h/2, -size.d/2, // 1
            size.w/2,  size.h/2, -size.d/2, // 2
            -size.w/2, -size.h/2, -size.d/2, // 0
            size.w/2,  size.h/2, -size.d/2, // 2
            -size.w/2,  size.h/2, -size.d/2, // 3
            
            size.w/2, -size.h/2, -size.d/2, // 1
            size.w/2, -size.h/2,  size.d/2, // 5
            size.w/2,  size.h/2,  size.d/2, // 6
            size.w/2, -size.h/2, -size.d/2, // 1
            size.w/2,  size.h/2,  size.d/2, // 6
            size.w/2,  size.h/2, -size.d/2, // 2
            
            -size.w/2, -size.h/2,  size.d/2, // 4
            -size.w/2, -size.h/2, -size.d/2, // 0
            -size.w/2,  size.h/2, -size.d/2, // 3
            -size.w/2, -size.h/2,  size.d/2, // 4
            -size.w/2,  size.h/2, -size.d/2, // 3
            -size.w/2,  size.h/2,  size.d/2, // 7
            
            -size.w/2, -size.h/2,  size.d/2, // 4
            size.w/2, -size.h/2,  size.d/2, // 5
            size.w/2, -size.h/2, -size.d/2, // 1
            -size.w/2, -size.h/2,  size.d/2, // 4
            size.w/2, -size.h/2, -size.d/2, // 1
            -size.w/2, -size.h/2, -size.d/2, // 0
            
            -size.w/2,  size.h/2, -size.d/2, // 3
            size.w/2,  size.h/2, -size.d/2, // 2
            size.w/2,  size.h/2,  size.d/2, // 6
            -size.w/2,  size.h/2, -size.d/2, // 3
            size.w/2,  size.h/2,  size.d/2, // 6
            -size.w/2,  size.h/2,  size.d/2, // 7
            
            -size.w/2,  size.h/2,  size.d/2, // 7
            size.w/2,  size.h/2,  size.d/2, // 6
            size.w/2, -size.h/2,  size.d/2, // 5
            -size.w/2,  size.h/2,  size.d/2, // 7
            size.w/2, -size.h/2,  size.d/2, // 5
            -size.w/2, -size.h/2,  size.d/2, // 4
        ],
        // Indices
        [
            0, 1, 2,  0, 2, 3,  
            1, 5, 6,  1, 6, 2,  
            4, 0, 3,  4, 3, 7,  
            4, 5, 1,  4, 1, 0,  
            3, 2, 6,  3, 6, 7, 
            7, 6, 5,  7, 5, 4,  
        ],
        // color
        color,
        // offset
        offset
    )
}