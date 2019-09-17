// import { Observable, throwError, of } from 'rxjs';
// import { map, filter, tap, catchError } from 'rxjs/operators';
// import { Comic } from 'src/app/types/responses';

// class HttpClient {
//     get(url: string) {
//         if (url === '/comics/100') {
//             return new Observable<Comic>(subscriber => {
//                 setTimeout(() => {
//                     subscriber.error(new Error('404'));
//                 }, 1000);
//             });
//         } else {
//             return new Observable<Comic>(subscriber => {
//                 setTimeout(() => {
//                     subscriber.next({
//                         id: 1,
//                         name: 'Foo',
//                         authors: [],
//                         description: 'Blaa',
//                         genres: [],
//                         issues: 10,
//                         pictures: [],
//                         publishedAt: new Date(),
//                         publisher: 'Baz'
//                     });
//                 }, 1000);
//             });
//         }
//     }
// }

// export default function run() {
//     const client = new HttpClient();
//     client.get('/comics/100')
//         .pipe(
//             catchError(_ => {
//                 return of(null);
//             })
//         )
//         .subscribe(comics => {
//             console.log(comics);
//         });
// }

// // const emitter = new Observable<number>(subscriber => {
// // });

// // const multiply = (amount: number) =>
// //     (num: number) => amount * num;

// // // function multiply(amount: number) {
// // //     return function(num: number) {
// // //         return amount * num;
// // //     }
// // // }

// // export default function run() {
// //     emitter
// //         .pipe(
// //             catchError(err => {
// //                 console.log('CALLED WITH ERROR!');
// //                 console.log(err);
// //                 // return throwError(err);
// //                 return of(5);
// //             }),
// //             map(multiply(1)),
// //             tap((n: number) => console.log('NUMBER: ', n)),
// //             filter((n: number) => n % 2 === 0 ),
// //         )
// //         .subscribe(
// //             (num) => { console.log(num); },
// //             (err) => { console.log(err); }
// //         );
// // }

// // const pipe = (...fns) => initial =>
// //     fns.reduce((g, f) => f(g), initial);

// // let result = pipe(
// //     multiply(2),
// //     multiply(3)
// // )(10);

// // console.log(result); 60
