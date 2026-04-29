import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'apply/:loanType',
    renderMode: RenderMode.Server
  },
  {
    path: 'loan/:loanType',
    renderMode: RenderMode.Server
  },
  {
    path: 'application/:referenceNumber',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
