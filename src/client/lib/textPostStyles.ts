const textPostStyles: Map<string, { foreground: string; background: string }> = new Map();

textPostStyles.set("default", { foreground: "#FFFFFF", background: "#1E90FF" }); // White on Dodger Blue
textPostStyles.set("style2", { foreground: "#000000", background: "#FFD700" }); // Black on Gold
textPostStyles.set("style3", { foreground: "#FFFFFF", background: "#32CD32" }); // White on Lime Green
textPostStyles.set("style4", { foreground: "#000000", background: "#FF4500" }); // Black on Orange Red
textPostStyles.set("style5", { foreground: "#FFFFFF", background: "#8A2BE2" }); // White on Blue Violet
textPostStyles.set("style7", { foreground: "#FFFFFF", background: "#FF69B4" }); // White on Hot Pink
textPostStyles.set("style8", { foreground: "#D3D3D3", background: "#000080" }); // Light Gray on Navy Blue
textPostStyles.set("style9", { foreground: "#FFFFE0", background: "#A52A2A" }); // Light Yellow on Brown

export default textPostStyles;
