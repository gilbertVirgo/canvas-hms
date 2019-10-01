const clamp = (number, min, max) => {
    number = number <= max ? number : max;
    number = number >= min ? number : min;

    return number;
}

const curve = (peak, curveWidth) => (
    (peak - (curveWidth / 2)) * 
    (peak + (curveWidth / 2))
) / -Math.pow(curveWidth / 2, 2);

class HMS {
    constructor({canvas, options = null}) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.options = {maxSum: 765, curveWidth: 765 / 2};

        if(options !== null)
            Object.keys(options).forEach(key => this.options[key] = options[key]);
    }

    write(cb, {x = 0, y = 0, width = this.canvas.width, height = this.canvas.height}) {
        const imageData = this.context.getImageData(x, y, width, height);
        const pixels = imageData.data;

        let i, r, g, b, a, R, G, B, A;
        for(i = 0; i < pixels.length; i += 4) {
            r = pixels[i];
            g = pixels[i + 1];
            b = pixels[i + 2];
            a = pixels[i + 3];

            // Passively get result
            [R = r, G = g, B = b, A = a] = cb({r, g, b, a});

            // Set result
            pixels[i] = R;
            pixels[i + 1] = G;
            pixels[i + 2] = B;
            pixels[i + 3] = A;
        }

        this.context.putImageData(imageData, x, y);
    }

    // -50 to 50 color slope
    slope({low, high, amount}) {
        let deltaR = high.r - low.r,
            deltaG = high.g - low.g,
            deltaB = high.b - low.b;

        this.write(({r, g, b}) => {
            return [
                r + (deltaR * (amount / 100)),
                g + (deltaG * (amount / 100)),
                b + (deltaB * (amount / 100))
            ];
        }, {});
    }

    distort({peak, amount}) {
        const {options: {curveWidth}} = this;

        let sum, increase;

        this.write(({r, g, b}) => {
            sum = r + g + b;

            if((sum > (peak - (curveWidth / 2))) && (sum < (peak + (curveWidth / 2)))) {
                increase = amount * curve(sum - peak, curveWidth);

                r = clamp(r + increase, 0, 255);
                g = clamp(g + increase, 0, 255);
                b = clamp(b + increase, 0, 255);
            }

            return [r, g, b];
        }, {});
    }

    setHighlights(amount, maxSum = this.options.maxSum) {
        this.distort({peak: maxSum / (4 / 3), amount}); 
    }

    setMidtones(amount, maxSum = this.options.maxSum) {
        this.distort({peak: maxSum / 2, amount}); 
    }
    
    setShadows(amount, maxSum = this.options.maxSum) {
        this.distort({peak: maxSum / 4, amount}); 
    }

    setTemperature(amount) {
        this.slope({
            low:  {r: 0, g: 50, b: 255},
            high: {r: 255, g: 50, b: 0},
            amount
        });
    }
}

module.exports = HMS;