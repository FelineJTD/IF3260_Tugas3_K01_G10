function hexToRGBColor(hex: string) {
    let bigint = parseInt(hex.replace("#", ""), 16);
    let r = (bigint >> 16) & 255;
    let g = (bigint >> 8) & 255;
    let b = bigint & 255;
    return [r / 255, g / 255, b / 255];
}

function rgbToHexColor(rgb: number[]) {
    let r = Math.floor(rgb[0] * 255);
    let g = Math.floor(rgb[1] * 255);
    let b = Math.floor(rgb[2] * 255);
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

export { hexToRGBColor, rgbToHexColor };