const button = document.querySelector('button');
// button.addEventListener('click', () => {
//     console.log("Its worked");
// });
Rx.Observable.fromEvent(button, 'click')
    .throttleTime(1000)
    .map((event) => {return event.clientX})
    .subscribe(
    (event) =>{
        console.log(event);
    }
);
