import { AsyncPipe, NgIf, NgStyle } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { createGameObservablesFn, cssHoleImage, cssMoleImage } from '../helpers';
import { GameObservables } from '../interfaces/game.interface';
import { tiempoRestantePipe, tocarTopoMessagePipe } from '../pipes';

@Component({
  selector: 'app-topo',
  standalone: true,
  imports: [AsyncPipe, NgIf, NgStyle, tocarTopoMessagePipe, tiempoRestantePipe],
  template: `<h1 class="title">
  ¡¡Tocar el Topo!! </h1>
  
<br>
<div class="inputNameContainer">
  <input type="text" #inputName class="inputName" placeholder="Escribe tu nombre" />
  <button #createName class="createName" (click)="sendName(inputName)">Enviar</button>
  <span class="inputNameMessage"> {{nameMessage}}
  </span>
</div>
<h2 class="difficultyTitle">
<span>Dificultad <input class="difficulty" #difficulty type="tel" value="1" placeholder="1" (change)="setDif($event)"/>
</span>
<ol class="difficultyOptions">
  <li>1 = Bajo</li>
  <li>2 = Medio</li>
  <li>3 = Alto</li>
</ol>
</h2>
<h1 class="startButton"> <button #start class="start" [disabled]="isDisabled">Comenzar</button></h1>
<br>
<span class="duration">{{ observables.timeLeft$ | async | tiempoRestante }}</span>
<br>
<span class="message">{{ observables.delayGameMsg$ | async | tocarTopoMessage }}</span>
<br>
<h2>
<span class="score">Puntuación: {{ observables.score$ | async }}</span>
</h2>

<div class="gameContainer isShown" #gameContainer>
  <div class="game grid">
    
    <div class="hole grid-item" [ngStyle]="holeImage" #hole1>
        <div class="mole" [ngStyle]="topoImage" #topo1></div>
    </div>
    <div class="hole grid-item" [ngStyle]="holeImage" #hole2>
        <div class="mole" [ngStyle]="topoImage" #topo2></div>
    </div>
    <div class="hole grid-item" [ngStyle]="holeImage" #hole3>
        <div class="mole" [ngStyle]="topoImage" #topo3></div>
    </div>
    <div class="hole grid-item" [ngStyle]="holeImage" #hole4>
        <div class="mole" [ngStyle]="topoImage" #topo4></div>
    </div>
    <div class="hole grid-item" [ngStyle]="holeImage" #hole5>
        <div class="mole" [ngStyle]="topoImage" #topo5></div>
    </div>
    <div class="hole grid-item" [ngStyle]="holeImage" #hole6>
        <div class="mole" [ngStyle]="topoImage" #topo6></div>
    </div>
    <div class="hole grid-item" [ngStyle]="holeImage" #hole7>
      <div class="mole" [ngStyle]="topoImage" #topo7></div>
    </div>
    <div class="hole grid-item" [ngStyle]="holeImage" #hole8>
      <div class="mole" [ngStyle]="topoImage" #topo8></div>
    </div>
    <div class="hole grid-item" [ngStyle]="holeImage" #hole9>
      <div class="mole" [ngStyle]="topoImage" #topo9></div>
    </div>
  </div>
</div>`,
  styleUrls: ['topo.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopoComponent implements OnInit, OnDestroy {
  @ViewChild('start', { static: true, read: ElementRef })
  startButton!: ElementRef<HTMLButtonElement>;

  @ViewChild('difficulty', { static: true, read: ElementRef })
  difficulty!: ElementRef<HTMLButtonElement>;

  @ViewChild('gameContainer', { static: true, read: ElementRef })
  game!: ElementRef<HTMLDivElement>;

  @ViewChild('hole1', { static: true, read: ElementRef })
  hole1!: ElementRef<HTMLDivElement>;

  @ViewChild('hole2', { static: true, read: ElementRef })
  hole2!: ElementRef<HTMLDivElement>;

  @ViewChild('hole3', { static: true, read: ElementRef })
  hole3!: ElementRef<HTMLDivElement>;

  @ViewChild('hole4', { static: true, read: ElementRef })
  hole4!: ElementRef<HTMLDivElement>;

  @ViewChild('hole5', { static: true, read: ElementRef })
  hole5!: ElementRef<HTMLDivElement>;

  @ViewChild('hole6', { static: true, read: ElementRef })
  hole6!: ElementRef<HTMLDivElement>;

  @ViewChild('hole7', { static: true, read: ElementRef })
  hole7!: ElementRef<HTMLDivElement>;

  @ViewChild('hole8', { static: true, read: ElementRef })
  hole8!: ElementRef<HTMLDivElement>;

  @ViewChild('hole9', { static: true, read: ElementRef })
  hole9!: ElementRef<HTMLDivElement>;

  @ViewChild('topo1', { static: true, read: ElementRef })
  topo1!: ElementRef<HTMLDivElement>;

  @ViewChild('topo2', { static: true, read: ElementRef })
  topo2!: ElementRef<HTMLDivElement>;

  @ViewChild('topo3', { static: true, read: ElementRef })
  topo3!: ElementRef<HTMLDivElement>;

  @ViewChild('topo4', { static: true, read: ElementRef })
  topo4!: ElementRef<HTMLDivElement>;

  @ViewChild('topo5', { static: true, read: ElementRef })
  topo5!: ElementRef<HTMLDivElement>;

  @ViewChild('topo6', { static: true, read: ElementRef })
  topo6!: ElementRef<HTMLDivElement>;

  @ViewChild('topo7', { static: true, read: ElementRef })
  topo7!: ElementRef<HTMLDivElement>;

  @ViewChild('topo8', { static: true, read: ElementRef })
  topo8!: ElementRef<HTMLDivElement>;

  @ViewChild('topo9', { static: true, read: ElementRef })
  topo9!: ElementRef<HTMLDivElement>;

  observables!: GameObservables | any;
  subscription!: Subscription;
  holeImage = cssHoleImage();
  topoImage = cssMoleImage();

  createDelayGameObservables = createGameObservablesFn();

  topos: ElementRef<HTMLDivElement>[] = []
  holes: ElementRef<HTMLDivElement>[] = []
  selectedDif: string | number = this.difficulty?.nativeElement.value ? this.difficulty?.nativeElement.value : '1';
  nameMessage: string = 'Para comenzar debes introducir tu nombre';

  playerName: string = '';
  isDisabled = true;

  ngOnInit(): void {
    this.topos = [this.topo1, this.topo2, this.topo3, this.topo4, this.topo5, this.topo6, this.topo7, this.topo8, this.topo9];
    this.holes = [this.hole1, this.hole2, this.hole3, this.hole4, this.hole5, this.hole6, this.hole7, this.hole8, this.hole9];

    this.observables = this.createDelayGameObservables(this.startButton.nativeElement, this.topos, this.holes, this.selectedDif);
    this.subscription = this.observables.createGame$.subscribe();

  }

  sendName(inputName: any) :void {
    this.playerName = inputName.value;
    if (this.playerName.trim() !== '') {
      this.isDisabled = false;
      this.game.nativeElement.classList.remove('isShown');
    }
    this.nameMessage = 'Pulsa Comenzar para iniciar el juego';
  }

  setDif(event: any): void {
    this.selectedDif = event.target.value
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
