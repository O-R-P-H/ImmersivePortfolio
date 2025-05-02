export function drawTextOnCanvas(canvas, lines, showCursor = false) {
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = 'black'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.fillStyle = '#e6e6e6'
    ctx.font = '22px "Anonymous Pro-Regular", monospace'
    ctx.textBaseline = 'top'

    const left = 20
    const top = 20
    const lineHeight = 32

    for (let i = 0; i < lines.length; i++) {
        ctx.fillText(lines[i], left, top + i * lineHeight)
    }
}
