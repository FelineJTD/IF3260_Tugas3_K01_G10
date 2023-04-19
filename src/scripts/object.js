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