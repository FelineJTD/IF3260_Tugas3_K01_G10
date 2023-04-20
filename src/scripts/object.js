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

	leftLeg.appendChild(leftFeet);
	rightLeg.appendChild(rightFeet);
  return body;
};

const Person = () => {
    // Create a person
    const body = Block("Body", hexToRGBColor("#2339de"), {w: 0.5, h: 0.5, d: 0.5}, {x: 0, y: 0, z: 0});
    const head = Block("Head", hexToRGBColor("#f2f2f2"), {w: 0.2, h: 0.2, d: 0.2}, {x: 0, y: 0.35, z: 0});
    const leftArm = Block("Left Arm", hexToRGBColor("#f2f2f2"), {w: 0.1, h: 0.4, d: 0.1}, {x: 0.3, y: 0, z: 0});
    const rightArm = Block("Right Arm", hexToRGBColor("#f2f2f2"), {w: 0.1, h: 0.4, d: 0.1}, {x: -0.3, y: 0, z: 0});
    const leftLeg = Block("Left Leg", hexToRGBColor("#f2f2f2"), {w: 0.15, h: 0.4, d: 0.1}, {x: 0.1, y: -0.45, z: 0});
    const rightLeg = Block("Right Leg", hexToRGBColor("#f2f2f2"), {w: 0.15, h: 0.4, d: 0.1}, {x: -0.1, y: -0.45, z: 0});
    
    body.appendChild(head);
    body.appendChild(leftArm);
    body.appendChild(rightArm);
    body.appendChild(leftLeg);
    body.appendChild(rightLeg);
    
    return body;
}

const Platypus = () => {
  const body = Block("Body", hexToRGBColor("#189090"), { w: 0.6, h: 0.5, d: 0.8 }, { x: 0, y: -0.2, z: 0 });
  const head = Block("Head", hexToRGBColor("#189090"), { w: 0.3, h: 0.3, d: 0.3 }, { x: 0, y: 0.15, z: 0.3 });
  const tail = Block("Tail", hexToRGBColor("#D86000"), { w: 0.3, h: 0.2, d: 0.8 }, { x: 0, y: 0.1, z: -0.4 });
  const billUp = Block("Bill", hexToRGBColor("#F09048"), { w: 0.2, h: 0.05, d: 0.3 }, { x: 0, y: 0.15, z: 0.5 });
  const billDown = Block("Bill", hexToRGBColor("#F09048"), { w: 0.2, h: 0.05, d: 0.3 }, { x: 0, y: 0.09, z: 0.5 });
  
  const leftForeLeg = Block("Left Fore Leg", hexToRGBColor("#006060"), { w: 0.1, h: 0.2, d: 0.1 }, { x: 0.15, y: -0.5, z: 0.1 });
  const leftForePaw = Block("Left Fore Paw", hexToRGBColor("#F09048"), { w: 0.1, h: 0.1, d: 0.2 }, { x: 0.15, y: -0.65, z: 0.15 });
  const rightForeLeg = Block("Right Fore Leg", hexToRGBColor("#006060"), { w: 0.1, h: 0.2, d: 0.1 }, { x: -0.15, y: -0.5, z: 0.1 });
  const rightForePaw = Block("Right Fore Paw", hexToRGBColor("#F09048"), { w: 0.1, h: 0.1, d: 0.2 }, { x: -0.15, y: -0.65, z: 0.15 });
  const leftHindPaw = Block("Left Hind Paw", hexToRGBColor("#F09048"), { w: 0.1, h: 0.4, d: 0.1 }, { x: 0.15, y: -0.5, z: -0.2 });
  const rightHindPaw = Block("Right Hind Paw", hexToRGBColor("#F09048"), { w: 0.1, h: 0.4, d: 0.1 }, { x: -0.15, y: -0.5, z: -0.2 });

  body.appendChild(head);
  body.appendChild(tail);
  head.appendChild(billUp);
  head.appendChild(billDown);
  body.appendChild(leftForeLeg);
  body.appendChild(rightForeLeg);
  body.appendChild(leftHindPaw);
  body.appendChild(rightHindPaw);

  leftForeLeg.appendChild(leftForePaw);
  rightForeLeg.appendChild(rightForePaw);

  return body;
};

const Cube = () => {
  const cube = Block("Cube", hexToRGBColor("#FF0000"), { w: 0.5, h: 0.5, d: 0.5 }, { x: 0, y: 0, z: 0 });
  return cube;
}