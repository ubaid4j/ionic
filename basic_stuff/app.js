const input_reason = document.querySelector("#input-reason");
const input_amount = document.querySelector("#input-amount");
const button_cancel = document.querySelector("#button-cancel");
const button_add = document.querySelector("#button-add");
const list = document.querySelector("#items-list");
const total_expense_field = document.querySelector("#total_expense");
let total_expenses = 0;

const clear = () => {
    input_reason.value = "";
    input_amount.value = "";
}

button_cancel.addEventListener('click', clear);

button_add.addEventListener('click', () => {

    reason_text = input_reason.value;
    amount_text = input_amount.value;

    if (reason_text.length <= 0 || amount_text.length <= 0 || amount_text <= 0) {
        presentAlert();
        return;
    }

    new_item = document.createElement('ion-item');
    new_item.textContent = reason_text + ": $" + amount_text;
    list.appendChild(new_item);
    clear();
    console.log(reason_text, amount_text);

    total_expenses += +amount_text;

    total_expense_field.textContent = total_expenses;

});

function presentAlert() {
    const alert = document.createElement('ion-alert');
    alert.header = 'Error';
    alert.subHeader = 'Invalid Input';
    alert.message = 'Please Enter valid input';
    alert.buttons = ['OK'];
  
    document.body.appendChild(alert);
    return alert.present();
  }