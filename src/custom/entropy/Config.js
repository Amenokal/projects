export const CVS = { id: document.getElementById('cvs'), x: 500, y: 500 }
export const INITPOINTS = 6;
export const SPEED = 1;
export const REFRESH = 25;

export const COLORS = [
    ["#E0BBE4", "#957DAD", "#D291BC", "#FEC8D8", "#FFDFD3"],
    ["#B6CCAB","#D3E0BA","#FFEEB5","#FFB38C","#E6A38E"],
    ["#E6A38E","#CED1C9","#A1A6C2","#B0C3D6","#BFD6E3"],
    ["#f0b9b6","#ffecd2","#b5caeb","#81aebb","#fbe7d2",]
];

const randomPalette = Math.floor(Math.random()*COLORS.length);
export const PALETTE = COLORS[randomPalette];


export function getColor(){
    return PALETTE[Math.floor(Math.random()*PALETTE.length)];
}