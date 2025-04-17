# Travel Booking Website

## Project Overview

The goal of the project is to create a flight and travel booking website designed to streamline the travel planning process for users. It allows users to search, compare, and book flights, hotels, and vacation packages within one unified platform.

Key features include:
- Real-time price tracking and alerts
- Integrated travel insurance options
- Local transportation services
- Filters for amenities, star rating, and price range
- Sorting by price, rating, and duration
- Responsive design for both desktop and mobile

This platform is designed to reduce user decision fatigue and enhance the travel planning experience by combining key services in a comprehensive yet intuitive way.

## Technologies Used

- React – Frontend framework
- TypeScript – Strongly typed JavaScript
- Tailwind CSS – Utility-first CSS framework
- Vite – Fast build tool and dev server
- Lucide React – Icon library
- Radix UI – Accessible UI primitives
- React Router – SPA routing
- Sonner – Toast notifications
- Custom Hooks – Logic abstraction
- REST APIs – Mocked service layer for data

## Folder Structure

public/
├── placeholder.svg
├── robots.txt

src/
├── components/
│   ├── ui/
│   │   ├── accordion.tsx
│   │   ├── alert-dialog.tsx
│   │   ├── alert.tsx
│   │   ├── ...
│   ├── DestinationCard.tsx
│   ├── FlightSearchForm.tsx
│   ├── Footer.tsx
│   ├── HotelSearchForm.tsx
│   ├── Navbar.tsx
│   ├── PackageSearchForm.tsx
│   ├── PaymentGateway.tsx
│   ├── PersonalizedRecommendations.tsx
│   ├── PopularDestinations.tsx
│   ├── PriceAlertSection.tsx
│   ├── SearchTabs.tsx
│   ├── TravelServices.tsx
│   ├── WhyChooseUs.tsx

├── hooks/
├── lib/

├── pages/
│   ├── CreateAlert.tsx
│   ├── FlightResults.tsx
│   ├── HotelResults.tsx
│   ├── Index.tsx
│   ├── NotFound.tsx
│   ├── PackageResults.tsx
│   ├── Profile.tsx

├── services/
│   ├── api.ts
│   ├── userService.ts

├── App.css
├── App.tsx
├── index.css
├── main.tsx

.gitignore
components.json
eslint.config.js
index.html
package.json
postcss.config.js
README.md
tailwind.config.ts
tsconfig.app.json
tsconfig.json
tsconfig.node.json
vite.config.ts
