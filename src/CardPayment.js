import React from 'react';
import './CardPayment.css';
import Button from 'arui-feather/button';
import Attach from 'arui-feather/attach';
import Calendar from 'arui-feather/calendar';
import CardInput from 'arui-feather/card-input';
import Select from 'arui-feather/select';
import Input from 'arui-feather/input';
import Form from 'arui-feather/form';
import * as myLib from './myLib.js';

class CardPayment extends React.Component {


    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
        this.handleCardNumberBlur = this.handleCardNumberBlur.bind(this);

        // this.handleCVCKeyDown = this.handleCVCKeyDown.bind(this);
        this.handleCardholderKeyDown = this.handleCardholderKeyDown.bind(this);
        this.handleCardholderBlur = this.handleCardholderBlur.bind(this);
        this.handleCardholderChange = this.handleCardholderChange.bind(this);

        this.handleMonthBlur = this.handleMonthBlur.bind(this);
        this.handleYearBlur = this.handleYearBlur.bind(this);

        this.handleCVCChange = this.handleCVCChange.bind(this);
        this.handleCVCBlur = this.handleCVCBlur.bind(this);

        this.state =
            {
                cardNumber: 0,
                cardholderName: "",
                expirationMonth: "",
                expirationYear: "",
                cvc: ""
            };
    }

    handleSubmit(e) {
        e.preventDefault();
        alert(this.state.cardNumber);
    }

    handleCardNumberChange(e) {
        // возможно, я тупой, но ловить новое значение через e.target.value для CardInput
        // у меня не вышло, при этом e.target.value для дефолтных полей ввода работает
        let cardNumberInput = document.getElementById('card-number');
        let labels = Array.from(document.getElementsByTagName('label'));
        let cardNumberLabel;
        labels.forEach(function (label) {
            if (label.htmlFor === 'card-number') {
                cardNumberLabel = label;
            }
        });

        // минимальная длина 19 так как при введенных 16 символах присутствует три разделителя
        if (cardNumberInput.value.length < this.state.cardNumber.length
            && this.state.cardNumber.length === 19) {
            // cardNumberLabel.style.visibility = 'visible';
            myLib.showNumberError();
        }
        if (cardNumberInput.value.length >= 19) {
            // cardNumberLabel.style.visibility = 'hidden';
            myLib.hideNumberError();

        }

        this.setState({cardNumber: cardNumberInput.value});
    }

    handleCardNumberBlur(e) {
        let cardNumberInput = document.getElementById('card-number');
        let labels = Array.from(document.getElementsByTagName('label'));

        if (cardNumberInput.value.length < 19) {
            // labels.forEach(function (label) {
            //     if (label.htmlFor === 'card-number') {
            //         label.style.visibility = 'visible';
            //     }
            // });
            myLib.showNumberError()
        } else {
            // labels.forEach(function (label) {
            //     if (label.htmlFor === 'card-number') {
            //         label.style.visibility = 'hidden';
            //     }
            // });
            myLib.hideNumberError()

        }
    }

    handleCardholderKeyDown(e) {
        let keyCode = e.keyCode;
        let keyChar = e.key;
        let pattern = /[\u0400-\u04FF]/; // чтобы отсеять кириллицу
        // не пускаем спецсимволы, цифры итд, но пускаем стрелки, шифты контролы итд
        if (!(keyCode >= 65 && keyCode <= 90 || keyCode <= 46) || pattern.test(keyChar)) {
            e.preventDefault();
        }
    }

    handleCardholderBlur(e) {
        let values = e.target.value.split(' ').filter(function (v) {
            return v !== ''
        });
        let labels = Array.from(document.getElementsByTagName('label'));
        let cardHolderLabel;
        labels.forEach(function (label) {
            if (label.htmlFor === 'card-holder') {
                cardHolderLabel = label;
            }
        });
        if (values.length !== 2) {
            cardHolderLabel.style.visibility = 'visible';
        } else {
            cardHolderLabel.style.visibility = 'hidden';
        }
    }

    handleCardholderChange() {
        let cardholder = document.getElementById('card-holder').value;
        let labels = Array.from(document.getElementsByTagName('label'));
        let values = cardholder.split(' ').filter(function (v) {
            return v !== ''
        });

        let cardHolderLabel;
        labels.forEach(function (label) {
            if (label.htmlFor === 'card-holder') {
                cardHolderLabel = label;
            }
        });
        if (values.length !== 2
            && this.state.cardholderName.split(' ').filter(function (v) {
                return v !== ''
            }).length === 2) {
            cardHolderLabel.style.visibility = 'visible';
        }
        if (values.length === 2) {
            cardHolderLabel.style.visibility = 'hidden';
        }


        this.setState({cardholderName: cardholder});
    }

    handleMonthBlur(e) {
        // alert(e.target.value == '');
        this.setState({expirationMonth: e.target.value});
    }

    handleYearBlur(e) {
        this.setState({expirationYear: e.target.value});
    }

    handleCVCChange(e) {

    }

    handleCVCBlur(e) {

    }


    render() {
        const currYear = (new Date().getFullYear()) % 100;
        const optionMonths = [
            {value: '01', text: '01'},
            {value: '02', text: '02'},
            {value: '03', text: '03'},
            {value: '04', text: '04'},
            {value: '05', text: '05'},
            {value: '06', text: '06'},
            {value: '07', text: '07'},
            {value: '08', text: '08'},
            {value: '09', text: '09'},
            {value: '10', text: '10'},
            {value: '11', text: '11'},
            {value: '12', text: '12'},
        ];
        const optionYears = [
            {value: currYear, text: currYear},
            {value: currYear + 1, text: currYear + 1},
            {value: currYear + 2, text: currYear + 2},
            {value: currYear + 3, text: currYear + 3},
            {value: currYear + 4, text: currYear + 4},
            {value: currYear + 5, text: currYear + 5},
            {value: currYear + 6, text: currYear + 6},
            {value: currYear + 7, text: currYear + 7},
            {value: currYear + 8, text: currYear + 8},
            {value: currYear + 9, text: currYear + 9},
            {value: currYear + 10, text: currYear + 10}
        ];
        return (
            <div className="payment_form">
                <Form onSubmit={this.handleSubmit} id="credit-card-form">
                    <h3>Input information provided on credit card</h3>
                    <div>
                        <CardInput id="card-number" placeholder="Card number"
                                   onBlur={this.handleCardNumberBlur} onChange={this.handleCardNumberChange}/>
                        <label htmlFor="card-number">Card number too short!</label>
                    </div>
                    <div>
                        <Input id="card-holder" placeholder="Card holder" onKeyDown={this.handleCardholderKeyDown}
                               onBlur={this.handleCardholderBlur}
                               onChange={this.handleCardholderChange}
                               pattern="[A-Za-z, ]{2,}"/>
                        <label htmlFor="card-holder">Card holder must contain 2 words!</label>
                    </div>
                    <br/>
                    <div>
                        <div className="inline-block">
                            <Select id="month" placeholder="MM" mode="radio-check" maxHeight={160}
                                    onBlur={this.handleMonthBlur} options={optionMonths}/>
                            <Select id="year" placeholder="YY" mode="radio-check" maxHeight={160}
                                    onBlur={this.handleMonthBlur} options={optionYears}/>
                            <label htmlFor="month">Wrong expiration date!</label>
                        </div>
                        <div className="inline-block">
                            <Input id="cvc" placeholder="CVC" type="password" maxLength={3} size="s" mask="111"/>
                            <label htmlFor="cvc">CVC must contain 3 digits</label>
                        </div>
                    </div>
                    <Button theme="alfa-on-white" type="submit" text="Pay"/>
                </Form>
            </div>
        );
    }


}

export default CardPayment;