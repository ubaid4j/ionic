// const button = document.querySelector('button');
// button.addEventListener('click', () => {
//     console.log("Its worked");
// });
// Rx.Observable.fromEvent(button, 'click')
//     .throttleTime(1000)
//     .map((event) => {return event.clientX})
//     .subscribe(
//     (event) =>{
//         console.log(event);
//     }
// );

// var observer = {
//     next: function(value){
//         console.log(value);
//     },
//     error: function (value) {
//         console.log("Error");
//     },
//     complete: function () {
//         console.log('Completed');
//     }
// };

// Rx.Observable.fromEvent(button, 'click').subscribe(observer);

// var subscription = Rx.Observable.create(function(obs) {
    // obs.next("Hello, Jane");
    // obs.error("its error jane");
    // setTimeout(function() {
    //     obs.complete();
    // }, 2000);
    // obs.next("Wallah")

//     button.onclick = (event) => {
//         obs.next(event);
//     }
//
// }).subscribe(observer);

// setTimeout(()=> {
//     subscription.unsubscribe();
// }, 5000)

// var observable = Rx.Observable.interval(1000);
// var observer = {
//     next: (value)=>{
//         console.log(value);
//     }
// };
//
// var subcription = observable
//     .throttleTime(500)
//     .map((value)=>{
//         return 'Number: ' + value;
//     })
//     .subscribe(observer);
//
// setTimeout(()=>{
//     subcription.unsubscribe();
// }, 5000);

// var subject = new Rx.Subject();
//
// var observer = {
//     next : (value)=> {
//         console.log(value)
//     },
//     error: (value)=> {
//         console.log(value)
//     },
//     complete: ()=> {
//         console.log('Complete');
//     }
// };
//
// subject.subscribe(observer);
// subject.subscribe(observer);
//
// subject.next("Hello Jane");
// subject.error("Its error");
// subject.complete();

// var observable = Rx.Observable.interval(500);
// var observer = {
//     next: (value) => {
//         console.log(value);
//     },
//     error: (value) => {
//         console.log("Error -> " + value);
//     }
// };
//
// observable
//     .filter((value)=> {
//         return value % 2 === 0;
//     })
//     .subscribe(observer);

// var input = document.querySelector('input');
// var observable = Rx.Observable.fromEvent(input, 'input');
// var observer = {
//     next: (value) => {
//         console.log(value);
//     },
//     error: (value) => {
//         console.log(value);
//     },
//     complete: () => {
//         console.log('Complete');
//     }
// };
//
// observable
//     .map((value)=>{
//         return value.target.value;
//     })
//     .debounceTime(500)
//     .distinctUntilChanged()
//     .subscribe(observer);

// var obseravle = Rx.Observable.of(1, 2, 3, 4, 5);
// var observer = {
//     next: (value) => {
//         console.log(value);
//     }
// };
//
// obseravle
//     .scan((total, curValue) => {
//         return total + curValue;
//     }, 0)
//     .subscribe(observer);


//----------------------------------Pluck-----------------------------------//
var input = document.querySelector('input');
var observable = Rx.Observable.fromEvent(input, 'input');
var observer = {
    next: (value) => {
        console.log(value);
    }
};

observable
    .pluck('target', 'value')
    .debounceTime(500)
    .distinctUntilChanged()
    .subscribe(observer);
