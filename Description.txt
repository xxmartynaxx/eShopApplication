User Interface (Presentation Layer)
- to, co widzi użytkownik

Application Layer
- realizuje logikę procesów biznesowych
- koordynuje przepływ danych między warstwami
- zawiera serwisy aplikacyjne, które wykonują operacje na danych z domeny

Domain Layer
- zawiera klasy reprezentujące kluczowe pojęcia w systemie (domain - model)
- zawiera metody biznesowe, które operują na tych danych (domain - model - repositories)
- JEDYNIE ICH INTERFEJSY, cała implementacja jest zawarta w Infrastructure Layer 

Infrastructure Layer
- zajmuje się szczegółami technicznymi i przechowywaniem danych
- komunikuje się z bazą danych, plikami, API zewnętrzymi, etc.
- implementuje logikę przechowywania i dostępu do danych (CRUD)

Cross-Cutting Concerns
- wszelkie akcje i narzędzia używane w całej aplikacji (niezależne od domeny ani infrastruktury)
- logowanie, obsługa błędów, walidacja, bezpieczeństwo, etc. 
- nie pasują do żadnej innej kategorii
- korzystać z nich w Application Layer (Infrastructure Layer może mieć jedynie jakąś logikę do obsługi błędów połączeń z bazą danych)


Jak warstwy ze sobą współpracują?
Przykład scenariusza w sklepie internetowym:
-- Warstwa UI/API wywołuje metodę getAllProducts() w Application Layer.
-- Application Layer (np. ProductService) pyta Infrastructure Layer o listę produktów (ProductRepository.findAll()).
-- Infrastructure Layer zwraca dane z bazy danych (lub pamięci), które są reprezentowane jako obiekty domeny w Domain Layer (Product).
-- Dane są zwracane do warstwy UI/API, gdzie są wyświetlane użytkownikowi.


Entities 
- mają identyfikator oraz cykl życia
- zawierają logikę operującą na encji
- wartości atrybutów mogą się zmieniać

Value Objects
- nie mają identyfikatora
- ich stan jest jedynym ważnym aspektem
- cykl życia zależy od cyklu życia encji
- opisują encje
- wartości atrybutów nie mogą się zmieniać 

Aggregates
- zbiór entities i value objects 
- dostęp tylko przez aggregate root (entity)
- zapytania tylko w kontekście aggregate root
- usunięcie aggregate root implikuje usunięcie całego agregatu
- jakie dane muszą być zmieniane razem w ramach transakcji? → to jeden agregat


Draft Domain Model for the e-Shop Application (ex 3)

Entities: 
-- Product   ( stworzony (przez managera) - aktualizowany (przez managera) - usunięty (przez managera) )
-- Cart      ( aktywowany (rozpoczęcie zakupów) - aktualizowany - dezaktywowany (zakończenie zakupów) )
-- CartItem  ( dodany do koszyka (przez kupującego) - aktualizowany - usunięty (przez kupującego) )
-- Manager   ( zalogowany - wylogowany )

Value Objects: 
-- Products' details

Aggregates:
-- aggregare root: Cart, CartItem (Cart jest jedynym punktem dostępu do obiektów CartItem; operacje związane z zakupami)
-- aggregate root: Product (operacje związane z obiektami Product)


TypeORM to narzędzie ORM (Object-Relational Mapper) dla Node.js, które:
- Umożliwia mapowanie klas/obiektów na tabele w bazie danych SQL (np. SQL Server, MySQL, PostgreSQL).
- Automatyzuje wiele zadań związanych z bazą danych, takich jak:
    Tworzenie tabel i relacji (bez pisania SQL),
    Operacje CRUD (Create, Read, Update, Delete) przy użyciu metod w kodzie,
    Obsługa transakcji i relacji między tabelami w sposób obiektowy.