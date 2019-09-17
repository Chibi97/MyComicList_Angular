import { trigger, transition, style, sequence, animate } from '@angular/animations';

export const rowsAnimation =
    trigger('rowsAnimation', [
      transition(':enter', [
        style({ height: '*', opacity: '0', 'box-shadow': 'none' }),
        sequence([
          animate('{{delay}}ms ease', style({ height: '*', opacity: 1 }))
        ])
      ], {params: {delay: 0}})
    ]);
