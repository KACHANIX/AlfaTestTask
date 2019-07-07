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

export function showSumError() {
    let labels = Array.from(document.getElementsByTagName('label'));
    let cvcLabel;
    labels.forEach(function (label) {
        if (label.htmlFor === 'sum') {
            cvcLabel = label;
        }
    });
    cvcLabel.style.visibility = 'visible';
}

export function hideSumError() {
    let labels = Array.from(document.getElementsByTagName('label'));
    let cvcLabel;
    labels.forEach(function (label) {
        if (label.htmlFor === 'sum') {
            cvcLabel = label;
        }
    });
    cvcLabel.style.visibility = 'hidden';
}


export function checkDate() {
    let inputMonth = document.getElementById('month').value;
    let inputYear = document.getElementById('year').value;
    if (inputMonth =='' || inputYear == ''){
        return false;
    }
    let today = new Date();
    let todayMonth = today.getMonth() + 1;
    let todayYear = today.getFullYear() % 100;
    if (inputYear == todayYear) {
        if (inputMonth <= todayMonth) {
            showExpirationError();
            return false;
        } else {
            hideExpirationError();
            return true;
        }
    } else {
        hideExpirationError();
        return true;
    }
}

