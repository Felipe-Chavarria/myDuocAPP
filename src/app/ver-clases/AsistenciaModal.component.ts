import { Component, Input, input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ActionSheetController } from '@ionic/angular';

@Component({
    selector: 'app-asistencia-modal',
    template: `
    <ion-header>
        <ion-toolbar>
            <ion-title>Asistencia</ion-title>
            <ion-buttons slot="end">
            <ion-button (click)="canDimmiss()">Cerrar</ion-button>
            </ion-buttons>
        </ion-toolbar>
        </ion-header>
        <ion-content>
        <ion-grid [fixed]="true"> 
            <ion-row class="header-row">
                <ion-col class='text-center'><strong>Fecha</strong></ion-col>
                <ion-col class='text-center'><strong>ID Matrícula Espacio</strong></ion-col>
                <ion-col class='text-center'><strong>RUN</strong></ion-col>
            </ion-row>
             <ion-row class="data-row" *ngFor="let item of asistencia">
                <ion-col class='text-center'>{{ item.fecha }}</ion-col>
                <ion-col class='text-center'>{{ item.id_matricula_espacio }}</ion-col>
                <ion-col class='text-center'>{{ item.run }}</ion-col>
            </ion-row>
        </ion-grid>
    </ion-content>
    `,
    styles: [
    `
        ion-content {
        --background: var(--ion-background-color);
        ion-grid {
        text-align: center;
        }

        .header-row {
            background-color: var(--ion-color-light);
            border-bottom: 2px solid var(--ion-color-medium);
        }

        .data-row {
            border-bottom: 1px solid var(--ion-color-medium);
        }

        .data-row:last-child {
            border-bottom: none; /* Evita la línea en la última fila */
        }

        ion-col {
            padding: 10px;
        }
                }
    `,
    ],
})
export class AsistenciaModalComponent implements OnInit {
    presentingElement: Element | null = null;
    @Input () asistencia: any[] = [];

    constructor(private actionSheetCtrl: ActionSheetController, private modalController: ModalController) {}

    ngOnInit() {
        this.presentingElement = document.querySelector('.ion-page');
        console.log('Asistencia:', this.asistencia);
    }

    async canDimmiss() {
    const actionSheet = await this.actionSheetCtrl.create({
        header: '¿Está seguro?',
        buttons: [
        {
            text: 'Sí',
            role: 'confirm',
        },
        {
            text: 'No',
            role: 'cancel',
        },
        ],
    });

    await actionSheet.present();

    const { role } = await actionSheet.onWillDismiss();
    return role === 'confirm';
};
}