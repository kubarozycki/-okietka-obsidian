# Apartment tour – jak aktualizować

Aplikacja jest w całości statyczna (GitHub Pages). Treść pochodzi z trzech miejsc:

| Co | Gdzie |
|---|---|
| pomieszczenia, obrysy na rzucie, przypisane wizualizacje / rysunki / porównania, checklisty | `tour.config.json` |
| produkty z wariantami Tani / Średni / Premium | arkusz „Zestawienie” z Dysku Google (`Zestawienie.xlsx`), awaryjnie `products.sample.json` |
| pliki źródłowe | vault (ścieżki względne od repo) i pobrany folder „Łokietka” z Dysku (prefiks `drive:`) |

## Aktualizacja

1. Pobierz folder „Łokietka” z Dysku Google (prawy przycisk → Pobierz) i rozpakuj, np. do `~/Downloads/Łokietka`.
2. W `tour.config.json` dopisz pliki z Dysku jako `drive:ścieżka/w/folderze`, np. `drive:okazanie/wizki piętro/sypialnia 1.png`.
3. Przygotuj dane i media (wymaga `magick` i `pdftoppm`):
   ```
   cd site
   npm run tour -- --drive ~/Downloads/Łokietka
   ```
   Skrypt przycina i zmniejsza rendery, robi miniatury rysunków, renderuje rzuty i zamienia arkusz na `data.json`. Pliki, których nie ma już w konfiguracji, są usuwane z `media/` i `files/`.
4. `npm run preview` – podgląd pod http://localhost:3000/mieszkanie.html (aplikacja wczytuje `data.json` przez HTTP, więc nie działa z `file://`).
5. Commit `site/tour/` (w tym `media/`, `files/`, `data.json`) i push – GitHub Actions opublikuje stronę.

## Obrysy pomieszczeń

Współrzędne `poly` są w pikselach wycinka rzutu renderowanego w `dpi` z konfiguracji (domyślnie 150), liczonych od lewego górnego rogu wycinka `crop` = `[x, y, szerokość, wysokość]`.

## Stan użytkownika

Wybory wariantów, akceptacje, zadania i komentarze zapisują się w `localStorage` przeglądarki (klucz `tour:<id projektu>:v1`). Przekazuje się je projektantce przez podsumowanie (mail / schowek) albo plik decyzji (.json), który projektantka wczytuje u siebie przyciskiem „Wczytaj plik decyzji”.
