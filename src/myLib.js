export function showNumberError() {
    let labels = Array.from(document.getElementsByTagName('label'));
    let cardNumberLabel;
    labels.forEach(function (label) {
        if (label.htmlFor === 'card-number') {
            cardNumberLabel = label;
        }
    });
    cardNumberLabel.style.visibility = 'visible';
}

export function hideNumberError() {
    let labels = Array.from(document.getElementsByTagName('label'));
    let cardNumberLabel;
    labels.forEach(function (label) {
        if (label.htmlFor === 'card-number') {
            cardNumberLabel = label;
        }
    });
    cardNumberLabel.style.visibility = 'hidden';

}

export function showHolderError() {
    let labels = Array.from(document.getElementsByTagName('label'));
    let cardHolderLabel;
    labels.forEach(function (label) {
        if (label.htmlFor === 'card-holder') {
            cardHolderLabel = label;
        }
    });
    cardHolderLabel.style.visibility = 'visible';

}

export function hideHolderError() {
    let labels = Array.from(document.getElementsByTagName('label'));
    let cardHolderLabel;
    labels.forEach(function (label) {
        if (label.htmlFor === 'card-holder') {
            cardHolderLabel = label;
        }
    });
    cardHolderLabel.style.visibility = 'hidden';

}


export function showExpirationError() {
    let labels = Array.from(document.getElementsByTagName('label'));
    let expirationLabel;
    labels.forEach(function (label) {
        if (label.htmlFor === 'month') {
            expirationLabel = label;
        }
    });
    expirationLabel.style.visibility = 'visible';

}

export function hideExpirationError() {
    let labels = Array.from(document.getElementsByTagName('label'));
    let expirationLabel;
    labels.forEach(function (label) {
        if (label.htmlFor === 'month') {
            expirationLabel = label;
        }
    });
    expirationLabel.style.visibility = 'hidden';

}


export function showCVCError() {
    let labels = Array.from(document.getElementsByTagName('label'));
    let cvcLabel;
    labels.forEach(function (label) {
        if (label.htmlFor === 'cvc') {
            cvcLabel = label;
        }
    });
    cvcLabel.style.visibility = 'visible';
}

export function hideCVCError() {
    let labels = Array.from(document.getElementsByTagName('label'));
    let cvcLabel;
    labels.forEach(function (label) {
        if (label.htmlFor === 'cvc') {
            cvcLabel = label;
        }
    });
    cvcLabel.style.visibility = 'hidden';
}

