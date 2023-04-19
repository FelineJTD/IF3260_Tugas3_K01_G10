const HollowCube = (r, g, b) => {
    return new Model(
        "HOLLOW_CUBE",
        // VERTICES
        [
            -0.8, -0.8, -0.8,     
            0.8, -0.8, -0.8,      
            0.8,  0.8, -0.8,      
            -0.8,  0.8, -0.8,     
            -0.8, -0.8,  0.8,     
            0.8, -0.8,  0.8,      
            0.8,  0.8,  0.8,      
            -0.8,  0.8,  0.8,     

            -0.5, -0.5, -0.5,     
            0.5, -0.5, -0.5,      
            0.5,  0.5, -0.5,       
            -0.5,  0.5, -0.5,      
            -0.5, -0.5,  0.5,      
            0.5, -0.5,  0.5,       
            0.5,  0.5,  0.5,       
            -0.5,  0.5,  0.5       
        ],
        // INDICES
        [
            0, 1, 8,
            1, 9, 8,
            1, 2, 9,
            2, 10, 9,
            2, 3, 10,
            3, 11, 10,
            3, 0, 11,
            0, 8, 11,

            5, 4, 13,
            4, 12, 13,
            4, 7, 12,
            7, 15, 12,
            7, 6, 15,
            6, 14, 15,
            6, 5, 14,
            5, 13, 14,

            0, 4, 5,
            0, 5, 1,
            1, 5, 6,
            1, 6, 2,
            2, 6, 7,
            2, 7, 3,
            3, 7, 4,
            3, 4, 0,

            8, 9, 13,
            8, 13, 12,
            9, 10, 14,
            9, 14, 13,
            10, 11, 15,
            10, 15, 14,
            11, 8, 12,
            11, 12, 15
        ],
        //COLORS
        [r, g, b]
    );
};

const Cube = (r, g, b) => {
    return new Model(
        "CUBE",
        //VERTICES
        [
            -0.5, 0.5, -0.5,   
            -0.5, 0.5, 0.5,   
            0.5, 0.5, 0.5,   
            0.5, 0.5, -0.5,   

            -0.5, 0.5, 0.5,   
            -0.5, -0.5, 0.5,   
            -0.5, -0.5, -0.5,  
            -0.5, 0.5, -0.5,   
            
            0.5, 0.5, 0.5,    
            0.5, -0.5, 0.5,   
            0.5, -0.5, -0.5,  
            0.5, 0.5, -0.5,   
            
            0.5, 0.5, 0.5,    
            0.5, -0.5, 0.5,    
            -0.5, -0.5, 0.5,    
            -0.5, 0.5, 0.5,   
            
            0.5, 0.5, -0.5,    
            0.5, -0.5, -0.5,    
            -0.5, -0.5, -0.5,    
            -0.5, 0.5, -0.5,    
            
            -0.5, -0.5, -0.5,   
            -0.5, -0.5, 0.5,    
            0.5, -0.5, 0.5,     
            0.5, -0.5, -0.5,    
            
            -0.325, 0.325, -0.325,   
            -0.325, 0.325, 0.325,   
            0.325, 0.325, 0.325,   
            0.325, 0.325, -0.325,   
            
            -0.325, 0.325, 0.325,    
            -0.325, -0.325, 0.325,   
            -0.325, -0.325, -0.325,  
            -0.325, 0.325, -0.325,   
            
            0.325, 0.325, 0.325,    
            0.325, -0.325, 0.325,   
            0.325, -0.325, -0.325,  
            0.325, 0.325, -0.325,   
            
            0.325, 0.325, 0.325,    
            0.325, -0.325, 0.325,    
            -0.325, -0.325, 0.325,    
            -0.325, 0.325, 0.325,    
            
            0.325, 0.325, -0.325,    
            0.325, -0.325, -0.325,    
            -0.325, -0.325, -0.325,    
            -0.325, 0.325, -0.325,    
            
            -0.325, -0.325, -0.325,   
            -0.325, -0.325, 0.325,    
            0.325, -0.325, 0.325,     
            0.325, -0.325, -0.325,    
            
            -0.325, 0.5, -0.325,   
            -0.325, 0.5, 0.325,   
            0.325, 0.5, 0.325,   
            0.325, 0.5, -0.325,   
            
            -0.5, 0.325, 0.325,    
            -0.5, -0.325, 0.325,   
            -0.5, -0.325, -0.325,  
            -0.5, 0.325, -0.325,   
            
            0.5, 0.325, 0.325,    
            0.5, -0.325, 0.325,   
            0.5, -0.325, -0.325,  
            0.5, 0.325, -0.325,   
            
            0.325, 0.325, 0.5,    
            0.325, -0.325, 0.5,    
            -0.325, -0.325, 0.5,    
            -0.325, 0.325, 0.5,    
            
            0.325, 0.325, -0.5,    
            0.325, -0.325, -0.5,    
            -0.325, -0.325, -0.5,    
            -0.325, 0.325, -0.5,    
            
            -0.325, -0.5, -0.325,   
            -0.325, -0.5, 0.325,    
            0.325, -0.5, 0.325,     
            0.325, -0.5, -0.325,
        ],
        //INDICES
        [
            0, 1, 48, 
            1, 48, 49, 
            24, 25, 48, 
            25, 48, 49, 
            1, 2, 49, 
            2, 49, 50, 
            25, 26, 49, 
            26, 49, 50, 
            2, 3, 50, 
            3, 50, 51, 
            26, 27, 50, 
            27, 50, 51, 
            3, 0, 51, 
            0, 51, 48, 
            27, 24, 51, 
            24, 51, 48, 
            4, 5, 52, 
            5, 52, 53, 
            28, 29, 52, 
            29, 52, 53, 
            5, 6, 53, 
            6, 53, 54, 
            29, 30, 53, 
            30, 53, 54, 
            6, 7, 54, 
            7, 54, 55, 
            30, 31, 54, 
            31, 54, 55, 
            7, 4, 55, 
            4, 55, 52, 
            31, 28, 55, 
            28, 55, 52, 
            8, 9, 56, 
            9, 56, 57, 
            32, 33, 56, 
            33, 56, 57, 
            9, 10, 57, 
            10, 57, 58, 
            33, 34, 57, 
            34, 57, 58, 
            10, 11, 58, 
            11, 58, 59, 
            34, 35, 58, 
            35, 58, 59, 
            11, 8, 59, 
            8, 59, 56, 
            35, 32, 59, 
            32, 59, 56, 
            12, 13, 60, 
            13, 60, 61, 
            36, 37, 60, 
            37, 60, 61, 
            13, 14, 61, 
            14, 61, 62, 
            37, 38, 61, 
            38, 61, 62, 
            14, 15, 62, 
            15, 62, 63, 
            38, 39, 62, 
            39, 62, 63, 
            15, 12, 63, 
            12, 63, 60, 
            39, 36, 63, 
            36, 63, 60, 
            16, 17, 64, 
            17, 64, 65, 
            40, 41, 64, 
            41, 64, 65, 
            17, 18, 65, 
            18, 65, 66, 
            41, 42, 65, 
            42, 65, 66, 
            18, 19, 66, 
            19, 66, 67, 
            42, 43, 66, 
            43, 66, 67, 
            19, 16, 67, 
            16, 67, 64, 
            43, 40, 67, 
            40, 67, 64, 
            20, 21, 68, 
            21, 68, 69, 
            44, 45, 68, 
            45, 68, 69, 
            21, 22, 69, 
            22, 69, 70, 
            45, 46, 69, 
            46, 69, 70, 
            22, 23, 70, 
            23, 70, 71, 
            46, 47, 70, 
            47, 70, 71, 
            23, 20, 71, 
            20, 71, 68, 
            47, 44, 71, 
            44, 71, 68,
        ],
        //COLORS
        [r, g, b]
    )
}

const Cylinder = (r, g, b) => {
    let vertices = [];

    // Outer vertices
    let r1 = 0.5; // outer radius
    let r2 = 0.4; // inner radius
    let height = 1; // height of cylinder

    for (let i = 0; i <= 360; i += 10) {
        let angle = i * Math.PI / 180;
        vertices.push(r1 * Math.cos(angle), height / 2, r1 * Math.sin(angle)); // top outer vertex
        vertices.push(r1 * Math.cos(angle), -height / 2, r1 * Math.sin(angle)); // bottom outer vertex
        vertices.push(r2 * Math.cos(angle), height / 2, r2 * Math.sin(angle)); // top inner vertex
        vertices.push(r2 * Math.cos(angle), -height / 2, r2 * Math.sin(angle)); // bottom inner vertex
    }

    let indices = [];

    // Top and bottom faces
    for (let i = 0; i < 36; i++) {
        indices.push(i * 4 + 2, i * 4, (i + 1) * 4);
        indices.push(i * 4 + 2, (i + 1) * 4, (i + 1) * 4 + 2);
        indices.push(i * 4 + 3, i * 4 + 1, (i + 1) * 4 + 1);
        indices.push(i * 4 + 3, (i + 1) * 4 + 1, (i + 1) * 4 + 3);
        
        // Connect the inside vertices to create the inner face
        indices.push((i + 1) * 4, i * 4, i * 4 + 2);
        indices.push((i + 1) * 4, i * 4 + 2, (i + 1) * 4 + 2);
        indices.push((i + 1) * 4 + 1, i * 4 + 1, (i + 1) * 4 + 3);
        indices.push(i * 4 + 1, (i + 1) * 4 + 3, (i + 1) * 4);
    }

    // Sides
    for (let i = 0; i < 36; i++) {
        indices.push(i * 4, (i + 1) * 4, i * 4 + 1);
        indices.push((i + 1) * 4, (i + 1) * 4 + 1, i * 4 + 1);
        indices.push(i * 4 + 2, i * 4 + 3, (i + 1) * 4 + 2);
        indices.push((i + 1) * 4 + 3, (i + 1) * 4 + 2, i * 4 + 2);
    }

    return new Model(
        "CYLINDER",
        vertices,
        indices,
        [r, g, b]
    );

}

const side = 1.2;
const depth = 0.4;

const Triangles = (r, g, b) => {
    return new Model(
        "TRIANGLES",
        //VERTICES
        [
            // FIRST TRIANGLE
            // OUTER TRIANGLE FRONT
            -side/2, 0, depth/4,                                // 0
            side/2, 0, depth/4,                                 // 1
            0, side*0.866, depth/4,                             // 2

            // INNER TRIANGLE FRONT
            -((side/2)-(depth*3/4)), depth/2, depth/4,          // 3
            ((side/2)-(depth*3/4)), depth/2, depth/4,           // 4
            0, (side-depth)*0.866, depth/4,                     // 5

            // OUTER TRIANGLE BACK
            -side/2, 0, -depth/4,                               // 6
            side/2, 0, -depth/4,                                // 7
            0, side*0.866, -depth/4,                            // 8

            // INNER TRIANGLE BACK
            -((side/2)-(depth*3/4)), depth/2, -depth/4,         // 9
            ((side/2)-(depth*3/4)), depth/2, -depth/4,          // 10
            0, (side-depth)*0.866, -depth/4,                    // 11

            // SECOND TRIANGLE
            // OUTER TRIANGLE FRONT
            depth/4, side*0.866-depth, -side/2,                 // 12
            depth/4, side*0.866-depth, side/2,                  // 13
            depth/4, -depth, 0,                                 // 14

            // INNER TRIANGLE FRONT
            depth/4, (side-depth)-depth, -((side/2)-(depth*3/4)),// 15
            depth/4, (side-depth)-depth, ((side/2)-(depth*3/4)), // 16
            depth/4, depth*0.866-depth, 0,                      // 17

            // OUTER TRIANGLE BACK
            -depth/4, side*0.866-depth, -side/2,                 // 12
            -depth/4, side*0.866-depth, side/2,                  // 13
            -depth/4, -depth, 0,                                 // 14

            // INNER TRIANGLE BACK
            -depth/4, (side-depth)-depth, -((side/2)-(depth*3/4)),// 15
            -depth/4, (side-depth)-depth, ((side/2)-(depth*3/4)), // 16
            -depth/4, depth*0.866-depth, 0,                      // 17

        ],
        //INDICES
        [
            // FRONT
            0, 3, 1,
            1, 3, 4,
            0, 3, 2,
            2, 3, 5,
            1, 4, 2,
            2, 4, 5,

            // BACK
            6, 9, 7,
            7, 9, 10,
            6, 9, 8,
            8, 9, 11,
            7, 10, 8,
            8, 10, 11,

            // OUTER SIDE
            0, 1, 6,
            1, 6, 7,

            1, 2, 7,
            2, 7, 8,

            2, 0, 8,
            0, 8, 6,

            // INNER SIDE
            3, 4, 9,
            4, 9, 10,

            4, 5, 10,
            5, 10, 11,

            5, 3, 11,
            3, 11, 9,

            // SECOND TRIANGLE
            // FRONT
            12, 15, 13,
            13, 15, 16,
            12, 15, 14,
            14, 15, 17,
            13, 16, 14,
            14, 16, 17,
            
            // BACK
            18, 21, 19,
            19, 21, 22,
            18, 21, 20,
            20, 21, 23,
            19, 22, 20,
            20, 22, 23,

            // OUTER SIDE
            12, 13, 18,
            13, 18, 19,
            
            13, 14, 19,
            14, 19, 20,

            14, 12, 20,
            12, 20, 18,

            // INNER SIDE
            15, 16, 21,
            16, 21, 22,

            16, 17, 22,
            17, 22, 23,

            17, 15, 23,
            15, 23, 21,
        ],
        //COLORS
        [r, g, b]
    );
};