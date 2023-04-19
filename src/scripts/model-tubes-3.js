const Dog = () => {
    const body = Block("Body", hexToRGBColor("#B46F37"), {w: 0.5, h: 0.7, d: 0.4}, {x: 0, y: -0.2, z: 0});
    const butt = Block("Butt", hexToRGBColor("#B46F37"), {w: 0.45, h: 0.4, d: 0.4}, {x: 0, y: -0.35, z: -0.2});
    const tail = Block("Tail", hexToRGBColor("#76431B"), {w: 0.1, h: 0.1, d: 0.4}, {x: 0, y: -0.4, z: -0.4});
    const head = Block("Head", hexToRGBColor("#CF8C55"), {w: 0.6, h: 0.6, d: 0.6}, {x: 0, y: 0.2, z: 0});
    const nose = Block("Nose", hexToRGBColor("#000000"), {w: 0.1, h: 0.1, d: 0.1}, {x: 0, y: 0.1, z: 0.3});
    const noseShine = Block("Nose Shine", hexToRGBColor("#FFFFFF"), {w: 0.03, h: 0.03, d: 0.03}, {x: -0.02, y: 0.12, z: 0.35});
    const leftEar = Block("Left Ear", hexToRGBColor("#3A312C"), {w: 0.1, h: 0.6, d: 0.4}, {x: 0.35, y: 0.1, z: 0});const rightEar = Block("Right Ear", hexToRGBColor("#3A312C"), {w: 0.1, h: 0.6, d: 0.4}, {x: -0.35, y: 0.1, z: 0});

    butt.appendChild(tail);
    body.appendChild(butt);

    nose.appendChild(noseShine);
    head.appendChild(nose);
    head.appendChild(leftEar);
    head.appendChild(rightEar);

    body.appendChild(head);
    
    // body.appendChild(tail);
    // body.appendChild(leftEar);
    
    return body;
}