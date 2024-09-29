document.addEventListener("DOMContentLoaded", () => {
    const loanAmountInput = document.getElementById('loan-amount');
    const loanAmountSlider = document.getElementById('loan-amount-slider');
    const repaymentPeriodInput = document.getElementById('repayment-period');
    const repaymentPeriodSlider = document.getElementById('repayment-period-slider');
    const calculateButton = document.getElementById('calculate-button');
    const dailyRepaymentSpan = document.getElementById('daily-repayment');
    const totalRepaymentSpan = document.getElementById('total-repayment');
    const errorMessage = document.getElementById('error-message');

    const interestRate = 2.2;

    function validateInputs() {
        const loanAmount = parseFloat(loanAmountInput.value);
        const repaymentPeriod = parseInt(repaymentPeriodInput.value);

        if(isNaN(loanAmount) || loanAmount < 1000 || loanAmount > 50000 ||
        isNaN(repaymentPeriod) || repaymentPeriod < 7 || repaymentPeriod > 60) {
            calculateButton.disabled = true;
            errorMessage.textContent = 'Невірні значення полів! Сума кредиту має бути від 1000 до 50000 грн, а період погашення від 7 до 60 днів.';
        } else {
            calculateButton.disabled = false;
            errorMessage.textContent = '';
        }
    }

    function calculateLoan() {
        const loanAmount = parseFloat(loanAmountInput.value);
        const repaymentPeriod = parseInt(repaymentPeriodInput.value);

        const dailyRepayment = (loanAmount + (loanAmount * (interestRate / 100) * repaymentPeriod)) / repaymentPeriod;
        const totalRepayment = dailyRepayment * repaymentPeriod;

        dailyRepaymentSpan.textContent = dailyRepayment.toFixed(2);
        totalRepaymentSpan.textContent = totalRepayment.toFixed(2);
    }

    function validateAndCalculate() {
        validateInputs();
        calculateLoan();
    }

    loanAmountInput.addEventListener('input', () => {
        loanAmountSlider.value = loanAmountInput.value;
        validateAndCalculate();
    });

    loanAmountSlider.addEventListener('input', () => {
        loanAmountInput.value = loanAmountSlider.value;
        validateAndCalculate();
    });

    repaymentPeriodInput.addEventListener('input', () => {
        repaymentPeriodSlider.value = repaymentPeriodInput.value;
        validateAndCalculate();
    });

    repaymentPeriodSlider.addEventListener('input', () => {
        repaymentPeriodInput.value = repaymentPeriodSlider.value;
        validateAndCalculate();
    });

    calculateButton.addEventListener('click', () => {
        calculateLoan();
    });

    validateAndCalculate();
})