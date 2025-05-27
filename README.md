# Campaign Manager

Aplikacja do zarządzania kampaniami reklamowymi. Pozwala na tworzenie, edytowanie, usuwanie oraz przeglądanie kampanii.

## Funkcjonalności

- Tworzenie kampanii z polami:  
  - Nazwa kampanii  
  - Słowa kluczowe  
  - Kwota stawki 
  - Fundusz kampanii
  - Status 
  - Miasto
  - Zasięg

- Lista aktywnych i nieaktywnych kampanii  
- Aktualizacja salda Emerald po zmianie kampanii  

## Technologie

- Backend: Spring Boot, baza H2 (in-memory)  
- Frontend: React  
- Hosting backendu: Render  
- Hosting frontendu: Vercel  

## Uwaga dotycząca hostingu backendu

Backend jest uruchomiony na darmowym planie Render, który wyłącza aplikację po 15 minutach nieaktywności.  
Po wejściu na stronę może być konieczne chwilowe odczekanie, aż backend się uruchomi ponownie i aplikacja zacznie działać poprawnie.

## Linki

- Live demo aplikacji: [https://campaign-app-hz4y.vercel.app/](https://campaign-app-hz4y.vercel.app/)  
- Repozytorium kodu: [https://github.com/AnchorDev/campaign-app](https://github.com/AnchorDev/campaign-app)  
