
const button = document.querySelector('button');
// button.addEventListener('click', () => {
//     console.log("Clicked");
// });

Rx.Observable.fromEvent(button, 'click')
    .throttleTime(500)
    .map((event) => {
        return event.clientX
    })
    .subscribe(
    (x) => {
        console.log(x);
    }
);
