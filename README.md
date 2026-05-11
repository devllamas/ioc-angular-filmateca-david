# Filmoteca IOC - Catàleg Universal de Pel·lícules

## 1. Descripció del projecte
**Nom de l'aplicació:** ioc-angular-filmateca-david

Aquesta és una aplicació de gestió de catàleg cinematogràfic desenvolupada amb **Angular 17+**. El projecte s'ha dissenyat posant un focus especial en el rendiment i l'eficiència de renderitzat. 

L'aplicació permet navegar per un llistat extens de pel·lícules de manera fluida gràcies a la implementació de **Virtual Scrolling** i una arquitectura de components basada en l'estratègia **OnPush**. Aquestes optimitzacions redueixen dràsticament el consum de memòria i el nombre de cicles de detecció de canvis que el navegador ha de processar.

## 2. Mapa de rutes
L'aplicació utilitza el sistema de rutes d'Angular per separar la vista principal del detall de cada pel·lícula:

| Path | Component | Accés |
| :--- | :--- | :--- |
| `''` (buit) | `HomeComponent` | Públic |
| `'/home'` | `HomeComponent` | Públic |
| `'/pelicula/:id'` | `DetailComponent` | Públic |
| `'**'` (comodí) | `HomeComponent` | Públic |

## 3. Instruccions d'execució en local
Segueix aquests passos per configurar i executar el projecte en el teu ordinador:

1. **Clonar el repositori:**
   ```bash
   git clone [url-repositori]

2. Entrar al directori del projecte
cd ioc-angular-filmateca-david

3. Instal·lar les dependències
npm install

4. Executar el servidor de desenvolupament
ng serve

5. Accedir a l'aplicació
Obrir http://localhost:4200 al navegador.

## 4. Build de producció
Per generar una versió optimitzada per a ser desplegada en un servidor real segueix aquests pasos:

1. Executar la comanda del build
ng build

2. Els fitxers es generaran a la carpeta /dist

3. La mida aproximada del bundle és d'apoximadament 374,44kB.

## 5. Credencials de prova

El sistema d'autenticació està configurat per acceptar qualsevol usuari i contrasenya amb un mínim de 4 caràcters per a propòsits de demostració.

Desenvolupat com a part de la pràctica d'Angular de l'IOC.