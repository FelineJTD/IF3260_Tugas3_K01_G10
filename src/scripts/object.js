const Dog = () => {
    const body = Block("Body", hexToRGBColor("#B46F37"), {w: 0.5, h: 0.6, d: 0.4}, {x: 0, y: -0.2, z: 0});
    const leftFrontLeg = Block("Left Front Leg", hexToRGBColor("#76431B"), {w: 0.1, h: 0.3, d: 0.1}, {x: 0.15, y: -0.45, z: 0.05});
    const leftFrontPaw = Block("Left Front Paw", hexToRGBColor("#4F3B30"), {w: 0.1, h: 0.1, d: 0.12}, {x: 0.15, y: -0.65, z: 0.06});
    const rightFrontLeg = Block("Right Front Leg", hexToRGBColor("#76431B"), {w: 0.1, h: 0.3, d: 0.1}, {x: -0.15, y: -0.45, z: 0.05});
    const rightFrontPaw = Block("Right Front Paw", hexToRGBColor("#4F3B30"), {w: 0.1, h: 0.1, d: 0.12}, {x: -0.15, y: -0.65, z: 0.06});
    const leftBackLeg = Block("Left Back Leg", hexToRGBColor("#76431B"), {w: 0.1, h: 0.3, d: 0.1}, {x: 0.15, y: -0.45, z: -0.3});
    const leftBackPaw = Block("Left Back Paw", hexToRGBColor("#4F3B30"), {w: 0.1, h: 0.1, d: 0.12}, {x: 0.15, y: -0.65, z: -0.29});
    const rightBackLeg = Block("Right Back Leg", hexToRGBColor("#76431B"), {w: 0.1, h: 0.3, d: 0.1}, {x: -0.15, y: -0.45, z: -0.3});
    const rightBackPaw = Block("Right Back Paw", hexToRGBColor("#4F3B30"), {w: 0.1, h: 0.1, d: 0.12}, {x: -0.15, y: -0.65, z: -0.29});
    const butt = Block("Butt", hexToRGBColor("#B46F37"), {w: 0.45, h: 0.3, d: 0.4}, {x: 0, y: -0.35, z: -0.2});
    const tail = Block("Tail", hexToRGBColor("#76431B"), {w: 0.1, h: 0.1, d: 0.4}, {x: 0, y: -0.4, z: -0.4});
    const head = Block("Head", hexToRGBColor("#CF8C55"), {w: 0.6, h: 0.6, d: 0.6}, {x: 0, y: 0.2, z: 0});
    const nose = Block("Nose", hexToRGBColor("#000000"), {w: 0.1, h: 0.1, d: 0.1}, {x: 0, y: 0.1, z: 0.3});
    const noseShine = Block("Nose Shine", hexToRGBColor("#FFFFFF"), {w: 0.03, h: 0.03, d: 0.03}, {x: -0.02, y: 0.12, z: 0.35});
    const leftEar = Block("Left Ear", hexToRGBColor("#4F3B30"), {w: 0.1, h: 0.6, d: 0.4}, {x: 0.35, y: 0.1, z: 0});
    const rightEar = Block("Right Ear", hexToRGBColor("#4F3B30"), {w: 0.1, h: 0.6, d: 0.4}, {x: -0.35, y: 0.1, z: 0});

    // Head
    nose.appendChild(noseShine);
    head.appendChild(nose);
    head.appendChild(leftEar);
    head.appendChild(rightEar);
    body.appendChild(head);
    
    // Back Legs
    leftBackLeg.appendChild(leftBackPaw);
    butt.appendChild(leftBackLeg);
    rightBackLeg.appendChild(rightBackPaw);
    butt.appendChild(rightBackLeg);

    // Tail
    butt.appendChild(tail);
    body.appendChild(butt);

    // Front Legs
    leftFrontLeg.appendChild(leftFrontPaw);
    body.appendChild(leftFrontLeg);
    rightFrontLeg.appendChild(rightFrontPaw);
    body.appendChild(rightFrontLeg);
    
    return body;
}

const Duck = () => {
  const body = Block("Body",hexToRGBColor("#F6AC3D"),{ w: 0.5, h: 0.5, d: 0.5 },{ x: 0, y: -0.2, z: 0 });
  const head = Block("Head",hexToRGBColor("#FECC47"),{ w: 0.5, h: 0.4, d: 0.4 },{ x: 0, y: 0.25, z: 0.35 });
  const tail = Block("Tail",hexToRGBColor("#FECC47"),{ w: 0.1, h: 0.1, d: 0.1 },{ x: 0, y: 0.1, z: -0.3 });
  const muzzle = Block("Muzzle",hexToRGBColor("#EE6B2B"),{ w: 0.3, h: 0.075, d: 0.2 },{ x: 0, y: 0.15, z: 0.6 });
  const leftWing = Block("Left Wing",hexToRGBColor("#F8BE1D"),{ w: 0.1, h: 0.3, d: 0.4 },{ x: 0.3, y: -0.1, z: 0 });
  const rightWing = Block("Right Wing",hexToRGBColor("#F8BE1D"),{ w: 0.1, h: 0.3, d: 0.4 },{ x: -0.3, y: -0.1, z: 0 });
	const leftEye = Block("Left Eye",hexToRGBColor("#000000"),{ w: 0.05, h: 0.05, d: 0.05 },{ x: 0.1, y: 0.3, z: 0.55 });
	const rightEye = Block("Right Eye",hexToRGBColor("#000000"),{ w: 0.05, h: 0.05, d: 0.05 },{ x: -0.1, y: 0.3, z: 0.55 });
	const leftLeg = Block("Left Leg",hexToRGBColor("#EE6B2B"),{ w: 0.1, h: 0.2, d: 0.1 },{ x: 0.2, y: -0.55, z: 0.1 });
	const rightLeg = Block("Right Leg",hexToRGBColor("#EE6B2B"),{ w: 0.1, h: 0.2, d: 0.1 },{ x: -0.2, y: -0.55, z: 0.1 });
	const leftFeet = Block("Left Feet",hexToRGBColor("#EE6B2B"),{ w: 0.1, h: 0.1, d: 0.1 },{ x: 0.2, y: -0.6, z: 0.2 });
	const rightFeet = Block("Right Feet",hexToRGBColor("#EE6B2B"),{ w: 0.1, h: 0.1, d: 0.1 },{ x: -0.2, y: -0.6, z: 0.2 });

  body.appendChild(head);
  body.appendChild(tail);
  body.appendChild(leftWing);
	body.appendChild(rightWing);
	body.appendChild(leftLeg);
	body.appendChild(rightLeg);

  head.appendChild(muzzle);
	head.appendChild(leftEye);
	head.appendChild(rightEye);

	leftLeg.appendChild(leftFeet);
	rightLeg.appendChild(rightFeet);
  return body;
};
// const Block = (name, color, width, height, depth, offset) => {
//     return new Model(
//         name,
//         // Vertices
//         [
//             -width/2, -height/2, -depth/2,
//             width/2, -height/2, -depth/2,
//             width/2,  height/2, -depth/2,
//             -width/2,  height/2, -depth/2,
//             -width/2, -height/2,  depth/2,
//             width/2, -height/2,  depth/2,
//             width/2,  height/2,  depth/2,
//             -width/2,  height/2,  depth/2,
//         ],
//         //     -0.5, -0.5,  0.5,
//         //     0.5, -0.5,  0.5,
//         //     0.5,  0.5,  0.5,
//         //     -0.5,  0.5,  0.5,
//         //     -0.5, -0.5, -0.5,
//         //     0.5, -0.5, -0.5,
//         //     0.5,  0.5, -0.5,
//         //     -0.5,  0.5, -0.5,
//         // ],
//         // indices
//         [
//             0, 1, 2,  0, 2, 3,  
//             1, 5, 6,  1, 6, 2,  
//             4, 0, 3,  4, 3, 7,  
//             4, 5, 1,  4, 1, 0,  
//             3, 2, 6,  3, 6, 7, 
//             7, 6, 5,  7, 5, 4,  
//         ],
//         // color
//         [color.r, color.g, color.b],
//         // offset
//         offset
//     )
// }
