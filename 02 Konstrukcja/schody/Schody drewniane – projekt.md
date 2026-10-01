---
tags: [konstrukcja, schody, drewno, koncepcja]
---

# 🪵 Schody EKR – wariant drewniany (do samodzielnego wykonania)

> [!warning] Status: koncepcja wykonawcza, nie projekt konstrukcyjny
> Przekroje i łączniki to założenia do weryfikacji. Przed zakupem drewna konstruktor powinien sprawdzić ten układ, a zwłaszcza strop pod biegiem i kotwienie listwy L1 (patrz [Pytania do konstruktora](#pytania-do-konstruktora)).

**Model 3D z listą cięć:** `schody-drewno.html` (otwórz w przeglądarce). Przycisk *„Lista elementów i stopnic”* generuje arkusz do druku z drewnem wg przekroju, listą cięć, ściankami, sklejką, kształtami stopnic, podstopnicami i łącznikami. Parametry (grubość stopnicy, nosek, wysokość policzka, odsunięcie od ściany) przeliczają wszystko na bieżąco.

Wariant stalowy dla porównania: `schody.html` · Rysunki architektki: [[EKR schody (2).pdf]], [[EKR schody przekroj.pdf]]

---

## Założenia (z projektu EKR, A. Krzak)

| | |
|---|---|
| Różnica poziomów | 382 cm (±0,00 → +3,82) |
| Podniesienia | 21 × 18,19 cm |
| Stopień | 24 cm konstrukcyjnie + nosek 2–2,5 cm |
| Szerokość biegu | 90 cm (od ściany zewn. do lica g-k) |
| Układ | 5 prostych + 3 zabiegowe na dole, 10 prostych, 2 zabiegowe + wejście (21) na górze |
| Nisza dla psa | 100 × 120 cm pod biegiem, wejście od pokoju |
| Warunek | **schody nie mogą być mocowane ani podwieszane do ściany zewnętrznej** |

## Idea konstrukcji

Przestrzeń pod biegiem jest **zamknięta** z trzech stron: ścianą zewnętrzną, ścianą g-k i samymi schodami. Dzięki temu konstrukcja nie musi „lewitować”. Wszystko można podeprzeć od dołu słupami i ściankami schowanymi w zabudowie. Dlatego zamiast smukłej stali wystarczy zwykła ciesielka.

Całość składa się z pięciu części:

1. **Płyta OSB na wylewce:** dwie warstwy OSB/3 22 mm na krzyż (44 mm), klejone i skręcone, leżą luzem na wylewce pod całymi schodami (ok. 5,2 m²). Na płycie stoją wszystkie ścianki, ściana szkieletowa i słupy, które opierają się na podwalinach 6×10. Płyta rozkłada nacisk na całą powierzchnię i mostkuje dylatacje. Nie wymaga też żadnych kotew w wylewce, w której są rury ogrzewania podłogowego.
2. **Stopnie 1–8 (dół, kubiki meblowe):** ścianki szkieletowe z kantówki 45×45, obłożone obustronnie sklejką 18 mm. Stoją na płycie OSB pod każdą krawędzią stopnia. Na nich leży sklejka 22 mm i dębowa stopnica. Między ściankami zostaje pusta przestrzeń na schowki z frontami od strony pokoju.
3. **Stopnie 9–18 (bieg prosty):** dwa **policzki zębate BSH 8×28**. Zewnętrzny stoi 1,5 cm od ściany zewnętrznej na wolnostojących słupach O1–O3. Wewnętrzny jest przykręcony do słupków ściany szkieletowej i podparty słupami J1–J3 i N1. Stopy obu policzków leżą na ściance S9. Stopnice dębowe leżą bezpośrednio na zębach, a podstopnice są za linią czoła, pod noskiem.
4. **Stopnie 19–21 (zabiegowe na górze):** legary KVH 6×16 pod każdą linią czoła, piętrzone jeden na drugim. **16 cm legaru + 22 mm sklejki = dokładnie jedno podniesienie (18,2 cm)**, więc każdy poziom stoi na sklejce poprzedniego. Podparcie dają słupy O4 i P3 przy ścianie, belka B1 przy oknie (na P3 i P2) oraz listwa L1 przy krawędzi stropu antresoli.
5. **Ściana wewnętrzna:** szkielet z KVH 6×10 co ≤ 60 cm od płyty OSB do spodu stropu, z nadprożem 10×20 nad niszą i g-k z obu stron. Zastępuje 5-centymetrową zabudowę g-k z projektu. Ściana jest jednocześnie podporą policzka wewnętrznego i stężeniem całości.

Do ściany zewnętrznej i okiennej nie jest kotwione nic. W wylewkę nic nie jest kotwione. Jedyny element mocowany do konstrukcji budynku to **L1** (kotwy w czoło stropu antresoli) oraz oczep ściany przykręcony do spodu stropu.

## Elementy i przekroje

| Ozn. | Element | Przekrój | Uwagi |
|---|---|---|---|
| — | płyta pod całymi schodami | **OSB/3 2 × 22 mm** na krzyż, ok. 5,2 m² (4 arkusze) | luzem na wylewce, 1 cm od ściany zewn., klejona PU + wkręty co 20 cm |
| — | podwaliny pod słupami | KVH 6×10 na płask | zewn. wzdłuż ściany (przez tył niszy), wewn. przerwana w wejściu do niszy |
| S1–S8 | ścianki pod stopniami 1–8 | kantówka 45×45 + sklejka 18 obustronnie (gr. ~8 cm) | na płycie OSB |
| S9 | ścianka pod podstopnicą 9 | jw., gr. 10 cm, h ≈ 139 cm | dźwiga tył stopnia 8 i stopy policzków |
| PZ, PW | policzki zębate | **BSH GL24h 8×28**, dł. ~3,35 m | przekrój pod zębem 13,5 cm |
| O1–O4, P3 | słupy zewnętrzne | KVH C24 10×10 | wolnostojące, 1,5 cm od ściany |
| J1–J3, N1, P2 | słupy wewnętrzne | KVH 10×10 | skręcone ze słupkami ściany |
| R | rygle stężające słup ↔ słup/ściana | KVH 6×10 | na wys. ~1,22 m (nad niszą) i 2,4 m |
| J19…J21, J19h, J20h, Lz, Lw | legary zabiegowe | KVH 6×16 | wieszaki / kątowniki ciesielskie |
| B1 | belka przy oknie | KVH 10×16 | na P3 i P2, 1 cm od ściany okiennej |
| L1 | listwa przy krawędzi stropu | KVH 6×14 | **kotwy mechaniczne w czoło stropu** |
| — | ściana wewn.: podwalina, oczep, słupki | KVH 6×10 | słupki: y = 90, 109, 227, 270, 324, 375, 413 |
| — | nadproże nad niszą | KVH 10×20, dł. 112 | na krótkich słupkach |
| — | płyta pod stopnicami 1–8, 19–21 | sklejka 22 mm | klejona PU + wkręcana co 15 cm |
| — | stopnice | dąb lity 40 mm, nosek 25 mm | klejone elastycznie |
| — | podstopnice | dąb / MDF lakierowany 20 mm | wpuszczone pod nosek |

**Ilości z modelu:** KVH/BSH ok. 0,78 m³, kantówka ok. 77 mb, sklejka 18 mm ok. 21 m² (w ściankach można użyć OSB 18), sklejka 22 mm ok. 3 m², OSB 22 mm na płytę 10,5 m², dąb 5,4 m² (21 stopnic), g-k ok. 25 m².
**Ciężar:** drewno, sklejka, OSB i dąb ok. **1,07 t**, z g-k ok. **1,3 t**. Sama płyta OSB to ok. 145 kg, a podwaliny ok. 15 kg (słupy są o tyle krótsze). Na wylewkę daje to średnio **ok. 2,4 kPa stale i ok. 4,7 kPa z ludźmi na schodach**, czyli tyle co pełna szafa z książkami. Bieg żelbetowy ważyłby ok. 3× więcej.

## Obliczenia wstępne (szacunkowe – do sprawdzenia)

Przyjęto obciążenie użytkowe 3,0 kN/m² (bezpiecznie dla schodów w budynku mieszkalnym), siłę skupioną 2,0 kN i ciężar własny ok. 0,6 kN/m². Kombinacja ULS daje ok. 5,3 kN/m², a na jeden policzek przy szerokości zbierania 0,45 m ok. 2,4 kN/m.

| Element | Sprawdzenie | Wynik |
|---|---|---|
| Stopnica dąb 40 mm, rozpiętość ~83 cm, 2 kN w środku | σ ≈ 6 MPa (dąb D30: f_m,k = 30 MPa), ugięcie ≈ 1,5 mm | ✅ duży zapas (3 cm też by przeszło) |
| Policzek BSH 8×28, przekrój pod zębem 8×13,5, rozpiętość między podporami ≤ 1,1 m | M ≈ 0,4 kNm → σ ≈ 1,5 MPa (f_m,d ≈ 15 MPa), ugięcie < 0,5 mm | ✅ |
| Ten sam policzek **bez** słupów O1/O2 (2,4 m w rzucie) | nośność OK (σ ≈ 7 MPa), ale ugięcie ≈ 9 mm ≈ L/330 | ⚠️ odczuwalne drgania, więc słupy przy niszy są potrzebne dla sztywności |
| Słup 10×10 C24, h ≈ 3,3 m, bez rygli | nośność na wyboczenie ~30 kN, reakcja ~2–5 kN | ✅ rygle dla sztywności |
| Legary 6×16, rozpiętość ≤ 1,05 m | — | ✅ bardzo duży zapas |
| Pojedynczy słup (3 kN) bezpośrednio na wylewce: anhydryt 60 mm (nad rurami ~45 mm) na EPS akustycznym, model płyty na podłożu sprężystym (Westergaard) | nacisk na styropian ~2,5–4 kPa, osiadanie ~0,1–0,3 mm; naprężenie w anhydrycie ~1,2–1,9 MPa w polu i **~2–3 MPa przy krawędzi / dylatacji** (F4 ≈ 4 MPa) | ⚠️ styropian OK, ryzyko pęknięcia wylewki przy krawędziach |
| Ten sam układ na płycie OSB 2×22 + podwalinach | nacisk liniowy / powierzchniowy, płyta mostkuje dylatacje; średnio ~2,4 kPa stale, ~4,7 kPa z ludźmi | ✅ |

**Wniosek:** drewno nie jest tu problemem. O sztywności decydują gęste podpory, a nie przekroje. Posadowienie rozwiązuje płyta OSB na wylewce. Otwarte zostaje pytanie o **strop pod spodem**.

## Detale, na które trzeba uważać

- **Akustyka i sąsiad pod spodem:** schody stoją na posadzce pływającej, która jest oddzielona od stropu styropianem akustycznym, więc elastomer pod płytą nie jest potrzebny. Taśma elastomerowa przydaje się w szczelinie przy ścianie zewnętrznej i pod oczepem przy stropie. Do tego wełna w przestrzeni pod biegiem.
- **Płyta OSB:** obie warstwy na krzyż, styki przesunięte o min. 60 cm, klej PU na całej powierzchni. Płyta ma w całości mostkować dylatacje wylewki, a żaden słup nie może wypaść nad dylatacją. Pod schodami ogrzewanie podłogowe będzie słabo grzało, co tam nie przeszkadza.
- **Skrzypienie:** sklejka klejona PU i wkręcana, stopnice klejone elastycznie (MS/PU), podstopnice wpuszczone pod nosek i klejone. Nic nie może pracować na samych gwoździach.
- **Drewno suche:** KVH/BSH suszone komorowo (≤ 15 %), dąb aklimatyzowany ok. 2 tygodnie na miejscu. Montaż dopiero po tynkach i wylewkach.
- **Szablon policzka:** zęby 18,19 / 24 cm rysowane kątownikiem ciesielskim z przykładnicami. Najpierw jeden policzek próbny z tańszej deski albo przymiarka na sucho.
- **Równe podniesienia:** poziomy wszystkich 21 stopnic warto narysować laserem na ścianie przed cięciem. Pierwsze i ostatnie podniesienie zależą od gotowej posadzki dołu i antresoli.
- **Ściana wewnętrzna ma ~14 cm** (g-k 1,25 + szkielet 10 + 2 × g-k 1,25) zamiast 5 cm z projektu EKR. Zabiera ok. 9 cm pokojowi pod antresolą.

## Kolejność wykonania

1. **Pomiary:** gotowe poziomy posadzek (dół i antresola), rzeczywista krawędź stropu antresoli, przebieg dylatacji w wylewce pod schodami, odległość od ściany okiennej.
2. **Konstruktor:** zatwierdzenie układu, kotwienia L1 i obciążenia stropu pod spodem.
3. Zakup i aklimatyzacja drewna.
4. Trasowanie: linia ściany, pozycje słupów, poziomy stopni (laser).
5. **Płyta OSB:** dwie warstwy na krzyż, klej PU i wkręty, potem podwaliny pod słupami.
6. **Ściana szkieletowa:** podwalina przykręcona do płyty, słupki, oczep do stropu (taśma elastomerowa), nadproże nad niszą.
7. **Ścianki S1–S9** ze sklejką (dół schodów, kubiki).
8. **Słupy** O/J/N/P i rygle.
9. **Policzki:** szablon, cięcie, przymiarka, montaż (stopa na S9, koniec na O3/N1).
10. **Zabiegowe 19–21:** J19, J19h, Lz19, B1 na P3/P2, sklejka 19, potem J20, Lz20, Lw20, sklejka 20, potem J21, Lw21, L1 (kotwy), sklejka 21.
11. **Próba:** chodzenie po sklejce i poprawki skrzypienia, zanim cokolwiek zostanie zakryte.
12. Instalacje (LED w pochwycie), wełna, g-k, szpachlowanie, malowanie.
13. Na końcu podstopnice, stopnice, pochwyt i fronty kubików.

**Narzędzia:** ukośnica + pilarka ręczna, zagłębiarka z szyną (sklejka, zęby policzków), wkrętarka udarowa (wkręty 8×200), młotowiertarka (kotwy), laser krzyżowy, kątownik ciesielski z przykładnicami, ściski. Frezarka górnowrzecionowa przyda się do stopnic.

## Koszt materiałów (ceny z 10.2026, brutto, orientacyjnie)

Ilości pochodzą z modelu, a ceny z ofert sklepów i składów drewna w Polsce.

| Pozycja | Ilość | Cena jedn. | Razem zł |
|---|---|---|---|
| BSH GL24h 8×28 (policzki) | 2 × 3,5 m ≈ 0,16 m³ | 4 500–6 250 zł/m³ | 700–1 000 |
| KVH C24 (słupy, legary, ściana, rygle) | ≈ 0,6 m³ | 2 300–3 400 zł/m³ | 1 400–2 000 |
| Kantówka 45×45 strugana (ścianki 1–9) | ≈ 85 mb | 5–8 zł/mb | 450–700 |
| **OSB/3 22 mm – płyta pod schodami** (2 warstwy) | 10,5 m² (4 arkusze) | 130–180 zł/ark. | 550–750 |
| Poszycie ścianek: OSB 18 **albo** sklejka 18 | ≈ 21 m² (7 arkuszy) | 90–130 / 250–400 zł/ark. | 650–900 / 1 750–2 800 |
| Sklejka 22 mm pod stopnicami | ≈ 3 m² (2 arkusze) | 350–500 zł/ark. | 700–1 000 |
| **Stopnice dębowe lite 40 mm** – 15 prostych | 15 szt. | 250–450 zł | **3 750–6 750** |
| **Stopnice dębowe** – 6 zabiegowych (6–8, 19–21, duże formatki) | 6 szt. | 600–1 200 zł | **3 600–7 200** |
| Podstopnice: MDF lakierowany **albo** dąb 20 mm | 21 szt. | 60–100 / 120–250 zł | 1 300–2 100 / 2 500–5 250 |
| Łączniki ciesielskie, wieszaki, kotwy, wkręty | – | – | 900–1 400 |
| Kleje PU / MS, taśma elastomerowa, wełna | – | – | 600–1 000 |
| G-k 12,5 + masa, taśmy, wkręty | ≈ 25 m² | – | 500–800 |
| Olej / lakier do dębu | – | – | 300–600 |
| **Razem materiały – wersja oszczędna** (OSB, MDF) | | | **≈ 15 500** |
| **Razem materiały – wersja pełna** (sklejka, dąb wszędzie) | | | **≈ 28 500** |

Konstrukcja nośna z płytą OSB, poszyciem i łącznikami kosztuje ok. **6–10 tys. zł**, a dąb (stopnice i podstopnice) ok. **9–19 tys. zł**. Poza zestawieniem są: konstruktor (1–2,5 tys.), pochwyt z LED, fronty kubików, transport, ewentualne narzędzia.

Największe oszczędności dają podstopnice z MDF lakierowanego zamiast dębu, OSB w ściankach (i tak są schowane) oraz stopnice klasy Natura (z sękami) zamiast Premium.

## Pytania do konstruktora

Najlepiej zadać je autorowi konstrukcji budynku (mgr inż. Łukasz Sekuła, ma rysunki K-xx):

1. Czy **strop pod biegiem** (nad lokalem poniżej) przeniesie ok. 1 t ciężaru własnego i obciążenie użytkowe schodów, przekazywane przez płytę OSB 2×22 mm na posadzkę pływającą (anhydryt 60 mm na styropianie akustycznym)? Gdzie pod spodem są ściany lub belki, na które warto trafić słupami?
2. **L1:** typ, średnica, rozstaw i głębokość kotew w czole stropu antresoli, minimalna odległość od krawędzi. W opracowaniu KLO dla wypełnienia otworu zastosowano np. Fischer FAZ II.
3. Oczep ściany wewnętrznej do spodu stropu: czy można kotwić i czym?
4. Czy przyjęte przekroje (BSH 8×28, KVH 10×10, 6×16) są OK, czy coś zmienić?
5. Czy akceptuje posadowienie schodów na płycie OSB leżącej luzem na wylewce anhydrytowej, bez kotwienia w wylewkę?

## Otwarte kwestie

- [ ] Sprawdzić przebieg dylatacji w wylewce pod schodami i ułożyć płytę OSB tak, żeby je mostkowała #konstrukcja
- [ ] Pomiar rzeczywistej krawędzi stropu antresoli względem linii g-k (w modelu przyjęto x = 95 cm) #konstrukcja
- [ ] Wysokość w krytycznym miejscu nad stopniami 11–12 (182 / 164 cm z przekroju EKR) a zabudowa antresoli #konstrukcja
- [ ] Gwarancja dewelopera: czy kotwienie w strop jej nie narusza? #formalności
- [ ] Sprawdzić na K-03 / K-18…K-22, co jest pod biegiem w lokalu poniżej #konstrukcja
