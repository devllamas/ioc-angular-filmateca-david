1. Implementació de ChangeDetectionStrategy.OnPush

S'ha aplicat l'estratègia de detecció de canvis OnPush en els següents components:

    PeliculaCardComponent: S'ha triat per ser el component presentacional principal que rep dades mitjançant @Input(). Amb OnPush, Angular només comprova aquest component quan la referència de la pel·lícula canvia, millorant el rendiment durant l'scroll.

    DetailComponent: S'ha triat com a component de detall per optimitzar la visualització d'elements individuals. S'utilitza ChangeDetectorRef.markForCheck() per gestionar manualment l'actualització quan les dades asíncrones arriben del servei.

    FooterComponent: S'ha triat per ser un component estàtic que no requereix comprovacions constants en el cicle de detecció de canvis.

2. Virtualització de llistes amb Angular CDK

Per a la gestió eficient de la memòria i el renderitzat del DOM, s'ha implementat el ScrollingModule:

    Nombre d'elements de la llista: L'aplicació està configurada per gestionar un mínim de 50 elements en el catàleg principal.

    Valor d'itemSize usat: S'ha definit un itemSize de 250.

    Motiu de la configuració: Aquest valor coincideix exactament amb l'alçada total definida al CSS per a cada fila (.item-wrapper), incloent el padding i les vores. Aquesta sincronització és indispensable per garantir un desplaçament suau i evitar salts bruscos en el Virtual Scroll.