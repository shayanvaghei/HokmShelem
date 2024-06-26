import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { GameService } from '../game.service';
import { AccountService } from 'src/app/account/account.service';
import { Observable, take } from 'rxjs';
import { GameInfo } from '../../shared/models/engine/game';
import { environment } from 'src/environments/environment';
import { SharedService } from 'src/app/shared/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hokm',
  templateUrl: './hokm.component.html',
  styleUrls: ['./hokm.component.scss']
})
export class HokmComponent implements AfterViewInit, OnDestroy {
  blobImageUrl = environment.azureContainerUrl + 'game';
  game$?: Observable<GameInfo | null>;
  @ViewChild('divgamebox') divgamebox: ElementRef | undefined;
  @ViewChild('playerCardsDiv', { static: false }) playerCardsDiv: ElementRef | undefined;
  divHeight: number | undefined;
  private resizeObserver: ResizeObserver | undefined;

  constructor(public gameService: GameService,
    private accountService: AccountService,
    private sharedService: SharedService,
    private router: Router
  ) { }

  ngAfterViewInit(): void {
    this.gameService.getGameInfo().subscribe({
      next: _ => {
        this.game$ = this.gameService.gameInfo$;
        this.gameService.canExit = false;
        this.connectToGame();
        setTimeout(() => {
          this.scrollToGameBox();
          if (this.playerCardsDiv) {
            this.initializeResizeObserver();
          }
        }, 500);

      },
      error: error => {
        this.sharedService.showNotification(false, error.title, error.message);
        this.router.navigateByUrl('/');
      }
    })
  }

  private initializeResizeObserver(): void {
    this.resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        this.gameService.setPlayerCardsDivHeight(entry.contentRect.height);
      }
    });

    if (this.playerCardsDiv) {
      this.resizeObserver.observe(this.playerCardsDiv.nativeElement);
    }
  }

  connectToGame() {
    this.accountService.applicationUser$.pipe(take(1)).subscribe({
      next: user => {
        if (user) {
          this.gameService.connectGame(user, 'hokm');
        }
      }
    })
  }

  ngOnDestroy(): void {
    this.gameService.leaveTheGame().then(_ => {
      this.gameService.closeTheGame('/lobby');
    }).catch();

    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
  }

  sendMessage(message: string) {
    this.gameService.sendMessage(message);
  }

  chooseHokm(suit: string | null) {
    if (suit) {
      this.gameService.hakemChoseHokmSuit(suit);
    }
  }

  playerPlayedTheCard(card: string) {
    this.gameService.playerPlayedTheCard(card);
  }

  playerDroppedTheCard(event: any) {
    if (event.target.tagName === 'IMG') {
      const imgElement = event.target;
      const imgSrc = imgElement.src;
      const myArray = imgSrc.split("/").pop();
      const val = myArray.slice(0, myArray.indexOf('.'));
      this.gameService.playerPlayedTheCard(val);
    }
  }

  private scrollToGameBox(): void {
    if (this.divgamebox) {
      this.divgamebox.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
