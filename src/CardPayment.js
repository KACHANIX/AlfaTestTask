import React from 'react';
import './CardPayment.css';
import Button from 'arui-feather/button';
import CardInput from 'arui-feather/card-input';
import Select from 'arui-feather/select';
import Input from 'arui-feather/input';
import Form from 'arui-feather/form';
import * as myLib from './myLib.js';
import MoneyInput from 'arui-feather/money-input';
import IconVisa from 'arui-feather/icon/brand/card-visa';
import IconMaster from 'arui-feather/icon/brand/card-mastercard';
import IconMir from 'arui-feather/icon/brand/card-mir';

var lookup = require('binlookup')();

class CardPayment extends React.Component {
    constructor(props) {
        super(props);

        // События-слушатели и state компонента
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCardNumberChange = this.handleCardNumberChange.bind(this);
        this.handleCardNumberBlur = this.handleCardNumberBlur.bind(this);

        this.handleCardholderKeyDown = this.handleCardholderKeyDown.bind(this);
        this.handleCardholderBlur = this.handleCardholderBlur.bind(this);
        this.handleCardholderChange = this.handleCardholderChange.bind(this);

        this.handleMonthBlur = this.handleMonthBlur.bind(this);
        this.handleYearBlur = this.handleYearBlur.bind(this);

        this.handleCVCChange = this.handleCVCChange.bind(this);
        this.handleCVCBlur = this.handleCVCBlur.bind(this);

        this.handleSumBlur = this.handleSumBlur.bind(this);
        this.handleSumChange = this.handleSumChange.bind(this);

        this.unblockPayButton = this.unblockPayButton.bind(this);

        this.state =
            {
                transferSum: "",
                cardNumber: "",
                cardholderName: "",
                expirationMonth: "",
                expirationYear: "",
                cvc: ""
            };
    }

    componentDidMount() {
        //задаем задний фон кнопки темнее основного, показывая, что кнопка заблокирована

        document.getElementById('pay-btn').style.backgroundColor = '\t#CFD5DC';
        document.getElementById('pay-btn').style.cursor = 'default';
    }

    handleSubmit(e) {
        // здесь заглушка; если нужно отправлять данные куда-либо, то подойдет кусок кода приведенный ниже


        // var xmlhttp = new XMLHttpRequest();
        // xmlhttp.open("POST", "/json-handler");
        // xmlhttp.setRequestHeader("Content-Type", "application/json");
        // xmlhttp.send(JSON.stringify(
        //     {
        //         transferSum: this.state.transferSum,
        //         cardNumber: parseInt(this.state.cardNumber),
        //         cardholderName: this.state.cardholderName,
        //         expirationDate: this.state.expirationMonth + '/' + this.state.expirationYear,
        //         cvc: this.state.cvc
        //     }));
        alert('Here the information must be send to backend');
    }


    // разница между onBlur и  onChange  в том , что в первом варианте к изменениям приходится обращаться
    // через e.target.value, а во втором просто через e (я чуть не вскрылся, пока пытался понять,
    // как обращаться к изменениям, т.к. e.target в onChange равен undefined, хотя в дефолтных полях ввода все не так)
    handleSumChange(e) {
        //проверяем, что сумма не ноль

        let sum = e.replace(',', '.');
        if (parseFloat(sum) > 0) {
            myLib.hideSumError();
        }
        this.state.transferSum = parseFloat(sum);
        this.unblockPayButton();
    }

    handleSumBlur(e) {
        // проверяем, что сумма не ноль

        if (parseFloat(e.target.value) === 0) {
            myLib.showSumError();
        }
        e.target.placeholder = 'Transfer amount'; // возвращаем плейсхолдер после того,
        this.unblockPayButton();                  // как он был убран на onFocus
    }

    handleCardNumberChange(e) {
        let cardNumberInput = e;
        // Захардкоженное определение платежной системы
        if (cardNumberInput[0] == 2) {
            document.getElementById('master').style.visibility = 'hidden';
            document.getElementById('visa').style.visibility = 'hidden';
            document.getElementById('mir').style.visibility = 'visible';
        } else if (cardNumberInput[0] == 4) {
            document.getElementById('master').style.visibility = 'hidden';
            document.getElementById('visa').style.visibility = 'visible';
            document.getElementById('mir').style.visibility = 'hidden';

        } else if (cardNumberInput[0] == 5) {
            document.getElementById('master').style.visibility = 'visible';
            document.getElementById('visa').style.visibility = 'hidden';
            document.getElementById('mir').style.visibility = 'hidden';

        } else {
            document.getElementById('master').style.visibility = 'hidden';
            document.getElementById('visa').style.visibility = 'hidden';
            document.getElementById('mir').style.visibility = 'hidden';
        }

        // Незахардкоженное определение банка
        if (cardNumberInput.length === 7) {
            lookup(cardNumberInput.replace(/\s/g, ''),
                function (err, data) {
                    if (err || data.bank.name == undefined) {
                        document.getElementById('bank').innerText = ' ';

                    } else {
                        document.getElementById('bank').innerText = data.bank.name;

                    }

                });
        } else if (cardNumberInput.length < 7) {
            document.getElementById('bank').innerText = ' ';
        }
        // минимальная длина 19 так как при введенных 16 символах присутствует три разделителя
        if (cardNumberInput.length < this.state.cardNumber.length
            && this.state.cardNumber.length === 19) {
            myLib.showNumberError();
        }
        if (cardNumberInput.length >= 19) {
            myLib.hideNumberError();
        }
        this.state.cardNumber = cardNumberInput;
        this.unblockPayButton();
    }

    handleCardNumberBlur(e) {
        let cardNumberInput = document.getElementById('card-number');
        if (cardNumberInput.value.length < 19) {
            myLib.showNumberError()
        } else {
            myLib.hideNumberError()
        }
        this.unblockPayButton();

    }

    handleCardholderKeyDown(e) {
        let keyCode = e.keyCode;
        let keyChar = e.key;
        let pattern = /[\u0400-\u04FF]/; // чтобы отсеять кириллицу

        // не пускаем спецсимволы, цифры, но пускаем стрелки, шифты контролы итд
        if (!(keyCode >= 65 && keyCode <= 90 || keyCode <= 46) || pattern.test(keyChar)) {
            e.preventDefault();
        }
    }

    handleCardholderBlur(e) {
        // проверяем наличие двух слов в имени владельца карты
        let values = e.target.value.split(' ').filter(function (v) {
            return v !== ''
        });
        if (values.length !== 2) {
            myLib.showHolderError()
        } else {
            myLib.hideHolderError()
        }
        this.unblockPayButton();

    }

    handleCardholderChange(e) {
        // проверяем наличие двух слов в имени владельца карты

        let cardholder = e.toUpperCase();
        let values = cardholder.split(' ').filter(function (v) {
            return v !== ''
        });
        if (values.length !== 2
            && this.state.cardholderName.split(' ').filter(function (v) {
                return v !== ''
            }).length === 2) {
            myLib.showHolderError()
        }
        if (values.length === 2) {
            myLib.hideHolderError();
        }
        this.state.cardholderName = cardholder;
        this.unblockPayButton();
    }

    handleMonthBlur(e) {
        // проверяем, не просрочена ли карта

        this.setState({expirationMonth: e.target.value});
        if (this.state.expirationMonth != '' && this.state.expirationYear != '') {
            myLib.checkDate();
        }
        this.unblockPayButton();
    }

    handleYearBlur(e) {
        // проверяем, не просрочена ли карта

        this.setState({expirationYear: e.target.value});
        if (this.state.expirationMonth != '' && this.state.expirationYear != '') {
            myLib.checkDate();
        }
        this.unblockPayButton();
    }

    handleCVCChange(e) {
        // проверяем наличие трех символов в CVC коде
        let cvc = e;
        console.log(document.getElementById('cvc').value);
        if (cvc.length < this.state.cvc
            && this.state.cvc.length === 3) {
            myLib.showCVCError();
        }
        if (cvc.length === 3) {
            myLib.hideCVCError();
        }
        this.state.cvc = cvc;
        this.unblockPayButton();
    }

    handleCVCBlur(e) {
        // проверяем наличие трех символов в CVC коде

        if (e.target.value.length < 3) {
            myLib.showCVCError();
        } else {
            myLib.hideCVCError();
        }
        this.unblockPayButton();
    }

    unblockPayButton() {
        // проверяем заполненность всех полей и разблокировываем кнопку, если это так; иначе - блокируем

        if (this.state.transferSum > 0 && this.state.cardNumber.length >= 19
            && this.state.cardholderName.split(' ').filter(function (v) {
                return v !== ''
            }).length === 2
            && myLib.checkDate()
            && this.state.cvc.length === 3) {
            document.getElementById('pay-btn').disabled = false;
            document.getElementById('pay-btn').style.backgroundColor = '\t#F3F4F5';
            document.getElementById('pay-btn').style.cursor = 'pointer';

        } else {
            document.getElementById('pay-btn').disabled = true;
            document.getElementById('pay-btn').style.backgroundColor = '\t#CFD5DC';
            document.getElementById('pay-btn').style.cursor = 'default';
        }
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
                    <div>
                        <MoneyInput id="sum" placeholder="Transfer amount" showCurrency={true}
                                    onChange={this.handleSumChange} onBlur={this.handleSumBlur}
                                    onFocus={(e) => e.target.placeholder = ''}/>
                        {/*            onFocus здесь используется, так как при наличии одновременно и плейсхолдера
                                       и валюты текст накладывается друг на друга
                         */}
                        <label htmlFor="sum">Transfer amount must be greater than 0!</label>
                    </div>
                    <h3>Input information provided on credit card</h3>
                    <div>
                        <CardInput id="card-number" placeholder="Card number"
                                   onBlur={this.handleCardNumberBlur}
                                   onChange={this.handleCardNumberChange}/>

                        <IconVisa className="icon" id="visa" colored={true}/>
                        <IconMaster className="icon" id="master" colored={true}/>
                        <IconMir className="icon" id="mir" colored={true}/>
                        <b id="bank"> </b>
                        <label htmlFor="card-number">Card number too short!</label>
                    </div>
                    <div>
                        <Input id="card-holder" placeholder="Card holder"
                               onKeyDown={this.handleCardholderKeyDown}
                               onBlur={this.handleCardholderBlur}
                               onChange={this.handleCardholderChange}/>
                        <label htmlFor="card-holder">Card holder name must contain 2 words!</label>
                    </div>
                    <div>
                        <div className="inline-block">
                            <div className="inline-block expiry">
                                <Select id="month" placeholder="MM"
                                        mode="radio-check" maxHeight={160}
                                        width="available" onBlur={this.handleMonthBlur}
                                        options={optionMonths} equalPopupWidth={true}/>
                            </div>
                            <div className="inline-block expiry year">
                                <Select id="year" placeholder="YY"
                                        mode="radio-check" maxHeight={160}
                                        width="available" onBlur={this.handleYearBlur}
                                        options={optionYears} equalPopupWidth={true}/>
                            </div>
                            <label htmlFor="month">Wrong expiration date!</label>
                        </div>
                        <div className="inline-block cvc">
                            <Input id="cvc" placeholder="CVC/CVV"
                                   type="password" maxLength={3}
                                   onBlur={this.handleCVCBlur}
                                   onChange={this.handleCVCChange}
                                   size="s" mask="111"/>
                            <label htmlFor="cvc">CVC must contain 3 digits</label>
                        </div>
                    </div>
                    <Button id="pay-btn" disabled="true"
                            theme="alfa-on-white" type="submit"
                            text="Pay"/>
                </Form>
            </div>
        );
    }
}

export default CardPayment;