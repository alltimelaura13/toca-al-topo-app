import { ElementRef } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  concatMap,
  delay,
  fromEvent,
  map,
  merge,
  scan,
  shareReplay,
  startWith,
  take,
  takeUntil,
  timer,
} from 'rxjs';
import { salto, tiempoJuego, tocarAlTopo } from '../custom-operators';
import { SCORE_ACTION } from '../topo/topo.enum';

const createStartButtonObservable = (btnNativeElement: HTMLButtonElement) =>
  fromEvent(btnNativeElement, 'click').pipe(
    map(() => SCORE_ACTION.RESET),
    shareReplay(1),
  );

const createScoreObservable = (startButtonClicked$: Observable<SCORE_ACTION>, moles: ElementRef<HTMLDivElement>[]) => {
  const molesClickedArray$ = moles.map(({ nativeElement }) =>
    fromEvent(nativeElement, 'click').pipe(tocarAlTopo(nativeElement)),
  );

  return merge(...molesClickedArray$, startButtonClicked$).pipe(
    scan((score, action) => (action === SCORE_ACTION.RESET ? 0 : score + 1), 0),
    startWith(0),
  );
};

export const createGameObservablesFn = () => {
  const delayTime = 3;
  const gameDuration = 10;
  const MILLISECOND = 1000;

  return (
    btnNativeElement: HTMLButtonElement,
    moles: ElementRef<HTMLDivElement>[],
    holes: ElementRef<HTMLDivElement>[],
    dificultad?:any,
    gameVisibility?:any

  ) => {
    let tiempoEntrada: number = 750;
    let tiempoSalida: number = 1000;
    switch (dificultad) {
      case '1':
        tiempoEntrada = 1000;
       tiempoSalida = 2000;
        break;
        case '2':
          tiempoEntrada = 750;
          tiempoSalida = 1000;
        break;
        case '3':
          tiempoEntrada = 500;
          tiempoSalida = 5;
        break;
      default:
        tiempoEntrada = 750;
        tiempoSalida = 1000;
        break;
    }
    
    const startButtonClicked$ = createStartButtonObservable(btnNativeElement);
    const score$ = createScoreObservable(startButtonClicked$, moles);
    const delayGameMsg$ = startButtonClicked$.pipe(
      concatMap(() =>
        timer(0, MILLISECOND).pipe(
          take(delayTime + 1),
          map((value) => delayTime - value),
        ),
      ),
    );

    const resetTime$ = startButtonClicked$.pipe(map(() => gameDuration));
    const delayGameStart$ = startButtonClicked$.pipe(delay(delayTime * MILLISECOND), shareReplay(1));
    const timeLeft$ = merge(resetTime$, delayGameStart$.pipe(tiempoJuego(gameDuration)));
    const lastHoleUpdated = new BehaviorSubject<number>(-1);
    const createGame$ = delayGameStart$.pipe(
      concatMap(() => lastHoleUpdated.pipe(salto(holes, tiempoEntrada, tiempoSalida), takeUntil(timer(gameDuration * MILLISECOND)))),
    );

    return {
      delayGameMsg$,
      timeLeft$,
      score$,
      createGame$,
    };
  };
};
