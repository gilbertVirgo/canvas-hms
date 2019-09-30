const defaults = {
    maxSum: 765,
    curveWidth: 765 / 2
}

/**
 * 
 * @param {number} number The number to clamp
 * @param {number} min 
 * @param {number} max 
 */
const clamp = (number, min, max) => {
    number = number <= max ? number : max;
    number = number >= min ? number : min;

    return n;
}

/**
 * 
 * @param {number} peak The peak of the parabolic curve 
 * @param {number} curveWidth The width of the parabolic curve
 */
const curve = (peak, curveWidth = defaults.curveWidth) => (
    (peak - (curveWidth / 2)) * 
    (peak + (curveWidth / 2))
) / -Math.pow(curveWidth / 2, 2);

/**
 * 
 * @param {object} context 
 * @param {number} peak The peak of the parabolic curve
 * @param {number} amount The amplitude (?) of the curve
 * @param {object} options Advanced options
 */
const raise = (context, peak, amount, options = {}) => {
    if(!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("Context is not of type CanvasRenderingContext2D");
    } else if(!(peak instanceof Number)) {
        throw new Error("Peak is not of type Number.");
    } else if(!(amount instanceof Number)) {
        throw new Error("Amount is not of type Number.");
    } else {
        const curveWidth = options.curveWidth || defaults.curveWidth;

        const {canvas: {width, height}} = context;
        const image = context.getImageData(0, 0, width, height);
        const {data} = image;

        let r, g, b, sum, op;

        for(let index = 0; index < data.length; index += 4) {
            r = data[index];
            g = data[index + 1];
            b = data[index + 2];

            sum = r + g + b;

            if((sum > (peak - (curveWidth / 2))) && (sum < (peak + (curveWidth / 2)))) {
                op = amount * curve(sum - peak, curveWidth);

                data[i] = clamp(r + op, 0, 255);
                data[i + 1] = clamp(g + op, 0, 255);
                data[i + 2] = clamp(b + op, 0, 255);
            }
        }

        context.putImageData(image, 0, 0);
    }
}

/**
 * 
 * @param {object} context 
 * @param {number} value The value
 * @param {number} maxSum The maximum value of the combined RGB channels (optional)
 */
const setHighlights = (context, value, maxSum = defaults.maxSum) => {
    if(!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("Context is not of type CanvasRenderingContext2D");
    } else if(!(value instanceof Number)) {
        throw new Error("Value is not of type Number")
    } else {
        context.raiseAtPeak({
            peak: maxSum / (4 / 3),
            amount: value
        });
    }
}

/**
 * 
 * @param {object} context 
 * @param {number} value A value between -1 and 1
 * @param {maxSum} value The maximum value of the combined RGB channels (optional)
 */
const setMidtones = (context, value, maxSum = defaults.maxSum) => {
    if(!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("Context is not of type CanvasRenderingContext2D");
    } else if(!(value instanceof Number)) {
        throw new Error("Value is not of type Number")
    } else {
        context.raiseAtPeak({
            peak: maxSum / 2,
            amount: value - 50
        });
    }
}

/**
 * 
 * @param {object} context 
 * @param {number} value A value between -1 and 1
 * @param {number} maxSum The maximum value of the combined RGB channels (optional)
 */
const setShadows = (context, value, maxSum = defaults.maxSum) => {
    if(!(context instanceof CanvasRenderingContext2D)) {
        throw new Error("Context is not of type CanvasRenderingContext2D");
    } else if(!(value instanceof Number)) {
        throw new Error("Value is not of type Number")
    } else {
        context.raiseAtPeak({
            peak: maxSum / 4,
            amount: value - 50
        });
    }   
}