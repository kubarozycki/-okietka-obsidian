---
tags: [wykończenie, łazienka-parter, stal-nierdzewna, diy, koncepcja]
---

# 🚰 Umywalka wolnostojąca ze stali nierdzewnej – łazienka parter

> [!warning] Status: koncepcja do samodzielnego wykonania
> Wymiary to założenia. Jedyny stały wymiar to **wysokość baterii ściennej**, która już jest i się nie zmieni. Od niej liczymy wysokość umywalki (patrz [[#Wysokość – liczona od baterii]]).

**Wzór:** Steinberg seria 442, umywalka stojąca ze szczotkowanej stali ([Reuter](https://www.reuter.com/pl-pl/p/steinberg-442-umywalka-stojaca/1579540214894550/1326024), [Megabad](https://www.megabad.com/en/steinberg-serie-442-standwaschtisch-aus-edelstahl-a-2387634.htm)). To jeden walec **Ø 38,2 cm, wys. 83,5 cm**, z misą w górnej części, **bez otworu na baterię i bez przelewu** (bateria jest ścienna).

**Model 3D z kartą wykonawczą:** `umywalka-inox.html` (otwórz w przeglądarce). Wpisujesz wymiary baterii i odpływu zmierzone na miejscu, a model przelicza długość rury, dennicę do zamówienia, głębokość misy, miejsce, w które trafia strumień, i długość rurek odpływu. Przycisk *„Karta wykonawcza”* generuje arkusz do druku: zamówienie, rozwinięcie walca z trasowaniem (szew, linia dennicy, otwory), profil dennicy, kolejność szczepin i odcinków spoiny, wymiary odpływu, listę zakupów i kolejność prac.

---

## Idea

Kopia Steinberga z dwóch gotowych elementów przemysłowych, które do siebie pasują wymiarem:

1. **Walec:** odcinek **rury nierdzewnej Ø 406,4 × 2 mm** (DN 400, AISI 304). Rury o tej średnicy sprzedają hurtownie stali nierdzewnej i zakłady robiące instalacje spożywcze. Średnica 40,6 cm zamiast 38,2 to różnica niewidoczna na oko.
2. **Misa:** **dennica tłoczona Ø 400 × 2 mm** (dno zbiornika, wypukłe, np. DIN 28011), odwrócona wypukłością w dół i wsunięta w górny koniec rury. Średnica wewnętrzna rury wynosi 402,4 mm, więc dennica Ø 400 wchodzi z luzem ok. 1 mm na stronę, w sam raz pod spoinę. Wypukłe dno samo spływa do środka, gdzie jest odpływ.
3. **Spawasz tylko jedną spoinę**: obwodową, między krawędzią dennicy a ścianką rury, od góry, wewnątrz misy. Ma ok. 1,26 m długości przy grubości 2 mm, więc przy cierpliwości da się ją zrobić spawarką z marketu.

Wszystko inne (odpływ, mocowanie, stopa) jest skręcane lub klejone.

```
            ←──────── Ø 406,4 ────────→
        ┌─┐                           ┌─┐ ← krawędź rury = rant misy (fazka, poler)
        │ │                           │ │
        │ │╲_                       _╱│ │ ← spoina obwodowa (od góry, zeszlifowana)
        │ │  ╲___                ___╱  │ │   dennica Ø 400, wypukłość w dół
        │ │      ╲______▄▄______╱      │ │   głębokość misy w środku ≈ 14–16 cm
        │ │             ││             │ │ ← korek bez przelewu
        │ │             ││             │ │
        │ │             ╰╮  syfon      │ │
   ŚCIANA │             ╭╯             │ │
   ║    ╞═╪═════════════╯              │ │ ← rura Ø 32/40 do odpływu w ścianie
   ║    │ │  otwór Ø 60 z tyłu          │ │   (otwór w tylnej ściance walca)
   ║    │ │                             │ │
   ║    │ │                             │ │
   ║    │ └─╥─────────────────────────╥─┘ │
   ║   ▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔▔  ← stopa centrująca Ø 400, przyklejona do płytek
```

---

## Wysokość – liczona od baterii

Bateria jest ścienna i ma stałą wysokość, więc **wysokość walca wynika z niej**:

| Wymiar | Wzór / zalecenie | Przykład |
|---|---|---|
| **H_w** – wysokość wylotu wylewki nad gotową podłogą | **zmierzyć** (do wylotu, nie do osi korpusu) | 100 cm |
| **Odstęp wylewka → rant** | **12–18 cm**: mniej to uderzanie rękami o wylewkę, więcej to chlapanie | 15 cm |
| **H_r – wysokość rantu = długość rury** | **H_r = H_w − 15 cm** (± 3 cm) | **85 cm** |
| Kontrola ergonomii | rant umywalki **80–90 cm** (Steinberg: 83,5) | ✅ |

Jeśli z wyliczenia wychodzi poza 78–92 cm, warto wrócić do tematu: przy niskim rancie umywalka jest za niska, przy wysokim strumień spada z dużej wysokości i chlapie.

**Długość wylewki (zasięg od ściany).** Strumień powinien trafiać mniej więcej w połowę drogi między tylną krawędzią a środkiem misy, nie prosto w korek (mniej chlapania):

- odległość ściana → środek misy = szczelina (2–3 cm) + promień (20,3 cm) ≈ **22–23 cm**
- wylewka powinna mieć wylot w odległości **ok. 15–20 cm od lica płytek**

Jeśli wylewki jeszcze nie kupiłeś, dobierz ją do tego wymiaru. Jeśli już jest, ustaw szczelinę walca od ściany tak, żeby strumień trafił w misę.

---

## Materiały

| Element | Specyfikacja | Uwagi |
|---|---|---|
| Walec | **rura spawana Ø 406,4 × 2,0**, AISI 304 (1.4301), dł. = H_r | poproś hurtownię o **cięcie na pile taśmowej z prostopadłymi końcami**. Ręczne cięcie rury Ø 400 kątówką równo jest bardzo trudne. Wystarczy odcinek lub resztka. Rura może być trawiona (matowa) albo szlifowana; i tak będzie szczotkowana |
| Misa | **dennica tłoczona Ø 400 × 2,0**, AISI 304 | **przed zakupem dopasuj do rury**: zmierz faktyczną średnicę wewnętrzną rury suwmiarką w 3 miejscach. Luz ma wynosić 0,5–1,5 mm na stronę. Część cylindryczna (kołnierz) dennicy zostaje i wchodzi w rurę |
| Stopa centrująca | **krążek ze sklejki wodoodpornej 18 mm** lub stali 4–6 mm, Ø = średnica wewn. rury − 2 mm | wycięty laserem lub wyrzynarką. Przyklejony do płytek. Walec nasuwa się na niego i nie przesunie się w bok |
| Wsporniki dennicy (montażowe) | 3 kawałki płaskownika 20×3 dł. 60 mm | trzymają dennicę na właściwej głębokości podczas szczepiania, potem do wycięcia albo zostają |
| Odpływ | **korek umywalkowy 1¼" BEZ przelewu**: sitko otwarte lub click-clack z blokadą w pozycji otwartej | dennica nie ma przelewu, więc korek zamykany = ryzyko zalania |
| Syfon | butelkowy 1¼", wylot Ø 32, z rurą do ściany i rozetą | albo **syfon podtynkowy**, jeśli ściana nie jest jeszcze wykończona (patrz [[#Odpływ]]) |
| Klej | **MS polimer** (np. Soudal Fix All, Bostik) – 2 kartusze | stopa do płytek i walec do stopy |

**Waga:** rura ok. 17 kg (przy 85 cm) + dennica ok. 3 kg ≈ **20 kg**. Walec stoi stabilnie, ale **łatwo go przewrócić, opierając się o rant** (wystarczy pchnięcie w bok siłą ok. 5 kg na wysokości rantu), więc mocowanie jest obowiązkowe.

Wariant cięższy i sztywniejszy: rura **× 3 mm** (ok. 26 kg) i dennica × 3. Łatwiej się ją spawa elektrodą (mniej przepaleń), tylko dennica 400 × 3 może już nie wejść w rurę: średnica wewnętrzna 400,4 mm daje luz 0,2 mm. Wtedy kup dennicę mniejszą lub dotoczoną (np. Ø 396).

**Jeśli nie ma rury Ø 406,4:** ślusarnia zwinie blachę 2 mm w walec na zwijarce i zespawa szew wzdłużny. Średnicę wybierasz wtedy dowolnie (np. 382 jak Steinberg), ale **dennicę dopasuj do gotowego walca**.

---

## Gotowe kształtki, które się przydadzą

| Co | Zastosowanie |
|---|---|
| **Dennice tłoczone** (DIN 28011 „koszowe”, DIN 28013 „elipsoidalne” – głębsze) | misa. Elipsoidalna daje głębszą misę i mniej chlapania. Szukaj „dennica nierdzewna 400” u producentów zbiorników i w hurtowniach dla browarów i mleczarni |
| **Rury procesowe / konstrukcyjne** Ø 323,9 / 355,6 / 406,4 | walec w innym rozmiarze; dennica zawsze pod średnicę wewnętrzną |
| **Rozeta inox Ø 32/40** do rur | maskowanie wyjścia rury odpływowej do ściany |
| **Kołnierz / mufa nierdzewna 1¼" do wspawania** | zamiast samego otworu pod korek: można wspawać mufę w dennicę, wtedy korek przykręca się na gwint |
| **Wkład kominowy Ø 400 (0,6–0,8 mm)** | tańsza alternatywa na walec, ale cienka blacha łatwo się wgniata i nie da się jej spawać elektrodą. Raczej nie |

---

## Spawanie

### Czym

| Spawarka | Czy się nada | Ustawienia |
|---|---|---|
| **Inwerter MMA z funkcją „Lift TIG”** | ✅ **najlepiej** | palnik TIG z zaworem (WP-17V, ok. 150–250 zł), reduktor, **argon 100%**, wolfram **WL20 Ø 1,6**, pręt **ER308LSi Ø 1,6**, **50–70 A** przy 2 mm, DC− na palniku |
| **Inwerter MMA (elektroda)** | ⚠️ da się | **E308L-16 Ø 2,0** przy 45–60 A (Ø 2,5 przy 3 mm ściance, 60–80 A). Elektrody suche (piekarnik 150 °C, 1 h). Krótkie ściegi 2–3 cm |
| **MIG bez gazu** | ⚠️ tylko z drutem proszkowym do nierdzewki (308LFC-O / E308LT-O) | zwykły drut do czarnej stali spowoduje rdzewienie spoiny |
| **MIG z gazem** | ✅ | ER308LSi Ø 0,8, gaz Ar + 2% CO₂ |

Jeśli próbki wyglądają źle, ślusarnia z TIG-iem zrobi tę jedną spoinę w 30–60 min. Przyniesiesz im gotowy, zaszczepiony walec.

### Jak

1. **Próby:** zespawaj 3–4 próbki z odpadu rury i kawałka blachy (zapytaj w hurtowni o ścinki). Na nich ustaw prąd i przećwicz szlifowanie spoiny w narożniku.
2. **Głębokość misy:** zaznacz na wewnętrznej ściance rury linię **60 mm poniżej rantu** (na niej leży krawędź dennicy). Głębokość misy w środku = 60 mm + wysokość wypukłości dennicy (ok. 80–100 mm) ≈ **14–16 cm**. Steinberg ma płytszą misę; płytsza = więcej chlapania.
3. **Wsporniki:** przyszczep od wewnątrz 3 płaskowniki co 120° tak, żeby dennica oparła się na nich na zaznaczonej linii. Albo: zrób z deski krążek dystansowy i oprzyj dennicę na nim od dołu.
4. **Otwór pod korek wywierć w dennicy PRZED wspawaniem** (otwornica do stali nierdzewnej HSS-Co, niskie obroty, olej, docisk). Średnicę dobierz do korka, zwykle **Ø 40–45 mm**. Otwór idealnie w środku, gdzie dno jest najniżej.
5. **Ustawienie:** rura na płaskiej podłodze, dennica wypukłością w dół, kołnierzem w górę. Sprawdź poziomicą, czy krawędź dennicy jest pozioma. Woda zawsze spłynie do środka, ale krzywą krawędź widać.
6. **Szczepiny:** 8 punktów co 45°, **na krzyż** (0°, 180°, 90°, 270°, potem pośrednie). Luz rozłóż równo dookoła.
7. **Spoina obwodowa:** odcinki po 3–5 cm, **przeskakując na przeciwną stronę**, z przerwami na ostygnięcie. Spoina musi być **ciągła i szczelna**, bez dziur. Rura o średnicy 400 przy 2 mm ściance łatwo owalizuje się od ciepła; spawanie na przemian temu zapobiega.
8. **Kontrola szczelności:** po ostygnięciu zalej misę wodą (otwór korka zaklej taśmą) i postaw walec na suchym papierze lub ręczniku na kilka godzin. Każda kropla oznacza poprawkę.
9. **Nie przegrzewaj.** Przebarwienia słomkowe, złote i niebieskie da się wytrawić. Szare i czarne oznaczają wypalony chrom i rdzewienie mimo trawienia.

Wsporniki z punktu 3: po spawaniu odetnij je i zeszlifuj ślady, albo zostaw (są pod misą i ich nie widać).

---

## Rant, szlif i zabezpieczenie

**Zasada nr 1:** tylko tarcze, szczotki i pady **do inoxu**, niczego używanego na czarnej stali. Pracuj na drewnie lub kartonie, z dala od miejsc, gdzie ktoś tnie zwykłą stal. Opiłki zwykłej stali wbite w nierdzewkę rdzewieją po tygodniu.

1. **Rant:** zaokrąglij lub sfazuj krawędź rury (pilnik, tarcza listkowa 120, potem papier 240–400). Rant musi być **przyjemny w dotyku** i bez zadziorów, bo będziesz się o niego opierał.
2. **Spoina w misie:** zbierz nadlew tarczą listkową INOX 80 → 120 na kątówce trzymanej pod kątem. Wewnątrz misy Ø 40 przejdzie tarcza 125, ale **szlifierka prosta lub Dremel z listkiem** dają większą kontrolę przy krawędzi. Spoina ma przejść w łagodny narożnik bez szczeliny (szczelina = osad, brud).
3. **Szczotkowanie:** włóknina (tarcza Scotch-Brite medium lub fine, potem ręczny pad). **Na walcu na zewnątrz pionowo** (jak Steinberg) albo **obwodowo** (łatwiej: walec leży, kręcisz nim). W misie najlepiej koncentrycznie albo promieniście. Jedno i drugie wygląda dobrze, byle konsekwentnie.
4. **Trawienie spoiny:** pasta trawiąca do spoin nierdzewnych (Avesta, Lincoln, Kemppi, ok. 60–120 zł/kg), pędzlem tylko na spoinę i przebarwienia, na 20–60 min. Potem obfite płukanie wodą i neutralizacja ścieków.
   - ⚠️ pasta zawiera **kwas azotowy i fluorowodorowy**: rękawice nitrylowe lub neoprenowe, okulary, praca na zewnątrz.
   - Łagodniejsza alternatywa: wyszlifować przebarwienia do czystego metalu, potem **żel pasywujący z kwasem cytrynowym**.
5. **Pasywacja:** 24–48 h na powietrzu, w suchym miejscu.
6. **Test rdzy:** spryskaj spoinę i rant wodą z kranu i zostaw na noc. Rude kropki oznaczają: szlif + trawienie od nowa.
7. **Wnętrze walca:** wystarczy, że jest czyste. Nikt go nie zobaczy, ale woda z ewentualnego przecieku nie powinna stać na zwykłej stali (nie wkładaj do środka niczego stalowego).

**Konserwacja:** woda z płynem, wycieranie do sucha w kierunku szlifu. **Bez chloru** (Domestos, ACE) i bez stalowych druciaków. Kamień: ocet lub kwasek cytrynowy.

**Spawanie i szlifowanie nierdzewki:** dym zawiera chrom VI, więc spawaj na zewnątrz lub z wyciągiem, w masce FFP3.

---

## Odpływ

Odpływ wychodzi **ze ściany** (projekt zakładał umywalkę wiszącą). Rysunek [[PT_IS-01.7.pdf|IS-01.7]]: **wysokość i średnicę (Ø 40 / 50) sprawdzić na miejscu.**

**Wariant 1 – syfon w walcu (standard):**
- korek 1¼" bez przelewu → syfon butelkowy wewnątrz walca → **rura Ø 32 poziomo do ściany** przez **otwór Ø 60 w tylnej ściance walca**, na wysokości odpływu w ścianie. Otwór wycinasz otwornicą po zespawaniu i szlifie, przed trawieniem.
- w ścianie **uszczelka redukcyjna** (np. 40×32 lub 50×32), na rurze rozeta.
- **Serwis:** syfon jest w zamkniętym walcu. Żeby go wyczyścić, trzeba odsunąć walec, więc **złącze rury w uszczelce ściennej jest nasuwane, nie klejone**, a walec przyklejony elastycznie (patrz [[#Mocowanie]]). Korek z **sitkiem na włosy** ogranicza potrzebę czyszczenia do minimum.

**Wariant 2 – syfon podtynkowy (lepszy, jeśli ściana nie jest jeszcze wykończona):**
- podtynkowy syfon umywalkowy w ścianie z rewizją przez maskownicę. W walcu jest tylko prosta rura od korka do ściany, a syfon czyści się od strony ściany. Do zrobienia razem z hydraulikiem przed glazurą.

**Wariant 3 – odpływ w podłodze pod walcem:** wygląda najczyściej (jak w katalogu Steinberga), ale wymaga kucia wylewki. W łazience na parterze najpewniej leży ogrzewanie podłogowe (sprawdzić na [[PT_IS-02.4.pdf|IS-02.4]]), więc **raczej nie**.

---

## Mocowanie

Walec o wadze 20 kg i średnicy 40 cm przewraca pchnięcie w bok na wysokości rantu siłą ok. 5 kg (dokładną wartość pokazuje model), więc musi być przytwierdzony. **Nie wiercić w podłodze**: może tam być ogrzewanie podłogowe.

1. **Stopa centrująca:** krążek o średnicy wewnętrznej rury minus 2 mm (sklejka wodoodporna 18 mm lub stal 4–6 mm), **przyklejony do płytek MS polimerem** na całej powierzchni. Ustawiasz go w miejscu, gdzie ma stać walec.
2. **Walec:** nasuwasz go na stopę. Pod dolną krawędzią rury cienka spoina **silikonu sanitarnego** (bezbarwnego lub w kolorze fugi): uszczelnia przed wodą z mycia podłogi i trzyma, a da się go przeciąć nożem przy serwisie.
3. **Zabezpieczenie przed przewróceniem:** **3 wkręty inox 4 × 30** przez ściankę walca w krawędź stopy, na 90°, 180° i 270° (bok, tył, bok; z przodu ich nie widać), 9 mm nad posadzką. Otwory Ø 4,5 wiercisz po nasunięciu walca, razem ze stopą. Stopa jest przyklejona do płytek całą powierzchnią, więc walec nie przesunie się ani nie przewróci.
4. **Serwis syfonu:** wykręcasz 3 wkręty, przecinasz silikon, unosisz walec o 2 cm ponad stopę i odsuwasz od ściany. Syfon i rura Ø 32 jadą razem z walcem, bo rura jest tylko wsunięta w uszczelkę w ścianie, nie klejona.

---

## Lista zakupów (orientacyjnie – ceny do sprawdzenia)

| Pozycja | Ilość | Szac. koszt |
|---|---|---|
| Rura Ø 406,4 × 2 AISI 304, cięta na wymiar (H_r) | 1 odcinek ~0,85 m | 600–1500 zł (tańsza resztka) |
| Dennica Ø 400 × 2 AISI 304 (dopasowana do rury) | 1 | 200–500 zł |
| Korek 1¼" bez przelewu (sitko lub click-clack) inox | 1 | 50–200 zł |
| Syfon butelkowy 1¼" + rura Ø 32 + rozeta + uszczelka redukcyjna | 1 kpl. | 60–200 zł |
| Płaskownik inox 20×3 (wsporniki), 3 wkręty inox A2 4 × 30 | – | 20–50 zł |
| Sklejka wodoodporna 18 mm (krążek) lub krążek stalowy z lasera | 1 | 20–100 zł |
| MS polimer, silikon sanitarny | 2 + 1 | 60–100 zł |
| Tarcze INOX (cięcie, listkowe 80/120, włóknina), pady, szczotka nierdzewna | – | 120–200 zł |
| Otwornice HSS-Co Ø 40–45 i Ø 60 | 2 | 60–150 zł |
| Pasta trawiąca lub żel pasywujący | 1 | 60–120 zł |
| Do TIG (jeśli spawarka ma Lift TIG): palnik, reduktor, argon, wolfram, pręt | – | 400–900 zł |
| **Razem** | | **ok. 1,3–3,2 tys. zł** (bez TIG ok. 1,3–2,3 tys.) |

Dla porównania: oryginalny Steinberg 442 kosztuje kilka tysięcy złotych.

---

## Plan wykonania

1. **Pomiary:** wysokość wylotu wylewki H_w, jej odległość od ściany, wysokość i średnica odpływu w ścianie, położenie osi baterii w poziomie (walec stoi pod nią).
2. **Wyliczenie** H_r = H_w − 15 cm, sprawdzenie ergonomii i zasięgu wylewki.
3. **Zakup rury** (cięta prostopadle na wymiar) i **dennicy**. Dennicę przymierzyć do rury w hurtowni albo przed zamówieniem podać faktyczną średnicę wewnętrzną rury.
4. **Próby spawania** na ścinkach.
5. **Otwór pod korek w dennicy**, wsporniki, szczepienie, spoina obwodowa, **test szczelności**.
6. **Rant, szlif spoiny, szczotkowanie** całości.
7. **Otwór z tyłu:** Ø 60 na odpływ, na 180° (szew rury obok, na 155°; pozycje z karty wykonawczej).
8. **Trawienie lub pasywacja**, 48 h schnięcia, test wodą na noc.
9. **Montaż:** stopa przyklejona do płytek w osi wylewki (dzień schnięcia), korek z uszczelką, syfon, rura do ściany.
10. **Ustawienie walca** na stopę, rura Ø 32 w uszczelkę w ścianie, 3 wkręty w stopę, próba wodą (pełna misa, spuszczenie, sprawdzenie złączy ręcznikiem papierowym), silikon przy podłodze.

---

## Pytania do sprawdzenia

- [ ] Wysokość wylotu wylewki baterii H_w = ____ cm (→ długość rury H_r = H_w − 15)
- [ ] Odległość wylotu wylewki od lica ściany = ____ cm (cel: 15–20 cm)
- [ ] Odpływ w ścianie: wysokość ____ cm, Ø 40 / 50, położenie względem osi baterii
- [ ] Czy ściana jest jeszcze przed glazurą? (→ syfon podtynkowy)
- [ ] Ogrzewanie podłogowe w łazience parter? [[PT_IS-02.4.pdf|IS-02.4]] (→ nie wiercić w podłodze)
- [ ] Czy moja spawarka ma Lift TIG? Model: ____
- [ ] Hurtownia z rurą Ø 406,4 × 2 i dennicą Ø 400 × 2 – dostępność, przymiarka
