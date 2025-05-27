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

---

# Campaign Manager

An application for managing advertising campaigns. Allows creating, editing, deleting, and viewing campaigns.

## Features

- Create campaigns with fields:  
  - Campaign name  
  - Keywords  
  - Bid amount  
  - Campaign fund  
  - Status  
  - Town  
  - Radius  

- List of active and inactive campaigns  
- Emerald balance updated after campaign changes  

## Technologies

- Backend: Spring Boot, H2 database (in-memory)  
- Frontend: React  
- Backend hosting: Render  
- Frontend hosting: Vercel  

## Note about backend hosting

The backend is hosted on Render’s free plan, which shuts down the app after 15 minutes of inactivity.  
When opening the site, you might need to wait a moment for the backend to start again before the app works properly.

## Links

- Live demo: [https://campaign-app-hz4y.vercel.app/](https://campaign-app-hz4y.vercel.app/)  
- Code repository: [https://github.com/AnchorDev/campaign-app](https://github.com/AnchorDev/campaign-app)  