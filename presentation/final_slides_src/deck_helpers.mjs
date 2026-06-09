const C = {
  ink: "#18202a",
  muted: "#5f6876",
  paper: "#fbfaf7",
  panel: "#ffffff",
  line: "#d8d2c8",
  blue: "#246b8f",
  green: "#2f7d57",
  red: "#b95745",
  gold: "#c0923a",
  dark: "#111827",
  paleBlue: "#eaf4f8",
  paleGreen: "#edf7f0",
  paleGold: "#fff6df",
  paleRed: "#faece8",
};

export function slideBase(presentation, ctx, kicker, title, subtitle = "") {
  const slide = presentation.slides.add();
  ctx.addShape(slide, { x: 0, y: 0, w: ctx.W, h: ctx.H, fill: C.paper });
  ctx.addShape(slide, { x: 0, y: 0, w: 14, h: ctx.H, fill: C.blue });
  ctx.addText(slide, {
    text: kicker.toUpperCase(),
    x: 62,
    y: 38,
    w: 360,
    h: 24,
    size: 12,
    color: C.blue,
    bold: true,
  });
  ctx.addText(slide, {
    text: title,
    x: 62,
    y: 76,
    w: 1060,
    h: subtitle ? 72 : 94,
    size: title.length > 76 ? 31 : 36,
    color: C.ink,
    bold: true,
    face: ctx.fonts.title,
  });
  if (subtitle) {
    ctx.addText(slide, {
      text: subtitle,
      x: 64,
      y: 157,
      w: 1010,
      h: 46,
      size: 18,
      color: C.muted,
    });
  }
  footer(slide, ctx);
  return slide;
}

export function footer(slide, ctx) {
  ctx.addShape(slide, { x: 62, y: 664, w: 1090, h: 1, fill: C.line });
  ctx.addText(slide, {
    text: "Finite-class learning in Lean 4 | MA-LoT-inspired proof repair",
    x: 64,
    y: 674,
    w: 650,
    h: 18,
    size: 10,
    color: "#7a8190",
  });
  ctx.addText(slide, {
    text: String(ctx.slideNumber).padStart(2, "0"),
    x: 1120,
    y: 672,
    w: 42,
    h: 20,
    size: 11,
    color: "#7a8190",
    align: "right",
    bold: true,
  });
}

export function body(slide, ctx, text, x, y, w, h, opts = {}) {
  return ctx.addText(slide, {
    text,
    x,
    y,
    w,
    h,
    size: opts.size ?? 20,
    color: opts.color ?? C.ink,
    bold: opts.bold ?? false,
    face: opts.face,
    fill: opts.fill ?? "#00000000",
    line: opts.line ?? { style: "solid", fill: "#00000000", width: 0 },
    insets: opts.insets ?? { left: 0, right: 0, top: 0, bottom: 0 },
  });
}

export function card(slide, ctx, x, y, w, h, title, text, opts = {}) {
  ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    fill: opts.fill ?? C.panel,
    line: { style: "solid", fill: opts.line ?? C.line, width: 1 },
  });
  body(slide, ctx, title, x + 22, y + 18, w - 44, 28, {
    size: opts.titleSize ?? 17,
    color: opts.accent ?? C.blue,
    bold: true,
  });
  body(slide, ctx, text, x + 22, y + 56, w - 44, h - 76, {
    size: opts.size ?? 16,
    color: opts.textColor ?? C.ink,
  });
}

export function codeBox(slide, ctx, x, y, w, h, text, opts = {}) {
  ctx.addShape(slide, {
    x,
    y,
    w,
    h,
    fill: opts.fill ?? "#17202b",
    line: { style: "solid", fill: "#263241", width: 1 },
  });
  body(slide, ctx, text, x + 20, y + 18, w - 40, h - 32, {
    size: opts.size ?? 16,
    color: opts.color ?? "#f6f4ee",
    face: ctx.fonts.mono,
  });
}

export function pill(slide, ctx, text, x, y, w, fill, color = C.ink) {
  ctx.addShape(slide, { x, y, w, h: 34, fill, line: { style: "solid", fill, width: 0 } });
  body(slide, ctx, text, x + 14, y + 8, w - 28, 18, { size: 13, color, bold: true });
}

export function thinArrow(slide, ctx, x1, y1, x2, y2, color = C.blue) {
  if (Math.abs(y2 - y1) < 2) {
    ctx.addShape(slide, { x: x1, y: y1, w: x2 - x1, h: 2, fill: color });
    ctx.addShape(slide, { x: x2 - 8, y: y1 - 5, w: 10, h: 10, fill: color });
  } else {
    ctx.addShape(slide, { x: x1, y: y1, w: 2, h: y2 - y1, fill: color });
    ctx.addShape(slide, { x: x1 - 4, y: y2 - 8, w: 10, h: 10, fill: color });
  }
}

export function twoColumnTable(slide, ctx, x, y, w, rows, leftTitle, rightTitle) {
  const rowH = 54;
  ctx.addShape(slide, { x, y, w, h: 42, fill: C.dark });
  body(slide, ctx, leftTitle, x + 18, y + 11, w * 0.43, 20, { size: 14, color: "#ffffff", bold: true });
  body(slide, ctx, rightTitle, x + w * 0.45, y + 11, w * 0.51, 20, { size: 14, color: "#ffffff", bold: true });
  rows.forEach((row, i) => {
    const yy = y + 42 + i * rowH;
    ctx.addShape(slide, { x, y: yy, w, h: rowH, fill: i % 2 ? "#f3f0eb" : "#ffffff", line: { style: "solid", fill: C.line, width: 1 } });
    body(slide, ctx, row[0], x + 18, yy + 13, w * 0.42, 28, { size: 14, color: C.ink, bold: true });
    body(slide, ctx, row[1], x + w * 0.45, yy + 13, w * 0.51, 32, { size: 14, color: C.ink });
  });
}

export function colors() {
  return C;
}
