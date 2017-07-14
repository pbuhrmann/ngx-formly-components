import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ActionEvent } from '../interfaces/actionEvent';
import { Observable, Observer, Subscription } from 'rxjs/Rx';

@Injectable()
export class ActionEventService {

    private eventSource = new Subject<ActionEvent>();
    private _history = {};
    eventObserver = this.eventSource.asObservable();
    arraySubscriptions: Subscription[] = [];
    ultimaAccionDe(name: string) {
        return this._history[name];
    }

    sendActionEvent(actionEvent: ActionEvent) {
        if (actionEvent != null) {
            this.eventSource.next(actionEvent);
        }
    }

    sendEvent(name: string, command?: string, value?: any, preventEncore?: boolean) {
        // tslint:disable-next-line:curly
        if (preventEncore === true && this._history[name] === command) return console.log(`[Not Repeatable Event] Command not sent.`);
        this.eventSource.next({ name: name, command: command, value: value });
        this._history[name] = command;
    }

    listenCommands(name: string, cmd?: string[] | string, fn?: (e) => void, survivePurge?: boolean) {
        if (typeof cmd == 'string') cmd = [cmd];
        let sub = this.eventSource.asObservable().filter(x => x.name == name && (!cmd.length || (<string[]>cmd).some(y => y == x.command))).subscribe(fn);
        if (!survivePurge) this.arraySubscriptions.push(sub);
        return sub;
    }

    idSequence = 0;
    // Envía un evento y devuelve un observable para esperar la respuesta. Se la atrapa con "respond".
    request(name: string, command?: string, value?: any): Observable<any> {
        let id = ++this.idSequence;
        return Observable.create((o: Observer<any>) => {
            this.eventSource.next({ name: name, command: command, value: value, observer: o });
        });
    }

    // Espera requests y los responde con una funcion que puede devolver un valor o un observable. (sync y async)
    respond(name: string, cmd?: string[] | string, queHacerAnteElRequest?: (e) => any) {
        if (typeof cmd == 'string') cmd = [cmd];
        this.eventObserver
            .filter(x =>
                x.observer
                && x.name == name
                && (!cmd.length || (<string[]>cmd).some(y => y == x.command))
            )
            .subscribe(e => {
                Observable.from(queHacerAnteElRequest(e)).subscribe(x => {
                    e.observer.next(x);
                    e.observer.complete();
                });
            });
    }

    clearsubscriptions() {
        this.arraySubscriptions.forEach(x => x.unsubscribe());
    }
}
