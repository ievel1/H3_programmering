# GIF WebApi / WebApp

Kort beskrivelse af projektet til underviser.

## Krav

- Python 3.12 (eller nyere 3.x)
- Virtuel environment anbefales

## Installation

```bash
cd web-api
python -m venv venv
source venv/bin/activate  # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
```

## Database

Kør migrationer én gang:

```bash
python manage.py migrate
```

(En SQLite-database `db.sqlite3` bliver oprettet i projektmappen.)

## Kør projektet

```bash
python manage.py runserver
```

Serveren kører nu typisk på:

- http://127.0.0.1:8000/

## WebApp (HTML-templates)

Disse views bruger templates i `templates/members/`:

- **Forside / Medlemmer**  
  - URL: `/`  
  - Template: `members/member_list.html`  
  - CRUD på medlemmer (opret, redigér, slet).

- **Opret / redigér medlem**  
  - URLs:  
    - `/members/create/`  
    - `/members/<id>/edit/`  
  - Template: `members/member_form.html`

- **Husstande**  
  - Liste: `/households/` → `members/household_list.html`  
  - Opret: `/households/create/` → `members/household_form.html`  
  - Redigér: `/households/<id>/edit/` → `members/household_form.html`

- **Sportsgrene**  
  - Liste: `/sports/` → `members/sport_list.html`  
  - Opret: `/sports/create/` → `members/sport_form.html`  
  - Redigér: `/sports/<id>/edit/` → `members/sport_form.html`

- **Kontingent-oversigt**  
  - URL: `/fees/`  
  - Template: `members/fees_dashboard.html`  
  - Viser hvordan man kalder API-endpoints til kontingent-beregning.

Alle disse sider arver layout fra `templates/members/base.html`.

## API-endpoints (DRF)

Router er registreret under `/api/`.

- Husstande: `/api/households/`
- Sportsgrene: `/api/sports/`
- Medlemmer: `/api/members/`
- Medlemskaber: `/api/memberships/`

Ekstra actions på `MemberViewSet` (kontingent):

- Enkelt medlem, årlig betaling:  
  `/api/members/<id>/annual_fee/`

- Alle medlemmer i husstand:  
  `/api/members/household_total/?household_id=<id>`

- Alle medlemmer i sportsgren:  
  `/api/members/sport_total/?sport_id=<id>`

- Alle sportsgrene samlet:  
  `/api/members/all_sports_total/`

- Alle passive medlemmer:  
  `/api/members/passive_total/`

## Admin (valgfrit)

Hvis man vil bruge Django admin:

```bash
python manage.py createsuperuser
python manage.py runserver
```

Derefter:  
`http://127.0.0.1:8000/admin/`
