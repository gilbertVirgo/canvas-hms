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
    constructor({canvas, defaults = null}) {
        this.canvas = canvas;
        this.context = canvas.getContext("2d");

        this.defaults = {maxSum: 765, curveWidth: 765 / 2};

        if(defaults !== null)
            Object.keys(defaults).forEach(key => this.defaults[key] = defaults[key]);
    }

    raise({peak, amount, options}) {
        const {context, canvas} = this;
        const {width, height} = canvas;
        const curveWidth = options.curveWidth || this.defaults.curveWidth;
        const image = context.getImageData(0, 0, width, height);
        const {data} = image;

        let r, g, b, sum, op, index = 0;

        for(index; index < data.length; index += 4) {
            r = data[index];
            g = data[index + 1];
            b = data[index + 2];

            sum = r + g + b;

            if((sum > (peak - (curveWidth / 2))) && (sum < (peak + (curveWidth / 2)))) {
                op = amount * curve(sum - peak, curveWidth);

                data[index] = clamp(r + op, 0, 255);
                data[index + 1] = clamp(g + op, 0, 255);
                data[index + 2] = clamp(b + op, 0, 255);
            }
        }

        context.putImageData(image, 0, 0);
    }

    setHighlights({amount, maxSum = this.defaults.maxSum}) {
        this.raise(maxSum / (4 / 3), amount); 
    }

    setMidtones({amount, maxSum = this.defaults.maxSum}) {
        this.raise(maxSum / 2, amount); 
    }
    
    setShadows({amount, maxSum = this.defaults.maxSum}) {
        this.raise(maxSum / 4, amount); 
    }
}

module.exports = HMS;