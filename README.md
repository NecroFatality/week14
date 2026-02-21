# Family Cookbook

A Next.js recipe website that displays recipes organized by meal type (breakfast, lunch, dinner, dessert). Recipes are pulled from a WordPress backend via REST API.

## Features

- Recipes organized by meal type with color-coded sections
- Individual recipe pages with ingredients and instructions
- Incremental Static Regeneration (ISR) - pages update every 60 seconds
- Responsive design for mobile and desktop
- Fast page loads with static generation

## Tech Stack

- **Next.js 16** - React framework with SSG/ISR
- **React** - UI components
- **got** - HTTP client for API requests
- **date-fns** - Date formatting
- **WordPress** - Headless CMS backend

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd week14

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will be available at `http://localhost:3000`

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm start` | Start production server |

## Project Structure

```
week14/
├── components/
│   ├── layout.js       # Page layout wrapper
│   └── date.js         # Date formatting component
├── lib/
│   ├── breakfast.js    # Breakfast API functions
│   ├── lunch.js        # Lunch API functions
│   ├── dinner.js       # Dinner API functions
│   ├── dessert.js      # Dessert API functions
│   └── posts.js        # Generic recipe functions
├── pages/
│   ├── index.js        # Homepage with all meal sections
│   ├── breakfast/[id].js
│   ├── lunch/[id].js
│   ├── dinner/[id].js
│   └── dessert/[id].js
├── posts/              # Local markdown recipes (fallback)
├── public/             # Static assets
└── styles/
    ├── global.css      # Global styles and CSS variables
    ├── Home.module.css # Homepage styles
    └── Recipe.module.css # Recipe page styles
```

## Adding a New Meal Section

To add a new meal type (e.g., "Snacks"):

### 1. Create the API library

Create `lib/snacks.js`:

```javascript
import got from 'got';

const API_BASE = 'https://dev-cs55-13-test.pantheonsite.io/wp-json/myplugin/v1';

export async function getAllSnackIds() {
  const items = await got(`${API_BASE}/snacks`).json();
  return items.map(item => ({
    params: { id: item.ID.toString() },
  }));
}

export async function getSortedSnackData() {
  const items = await got(`${API_BASE}/snacks`).json();
  return items.sort((a, b) => {
    const nameA = a.recipe_name || a.post_title || '';
    const nameB = b.recipe_name || b.post_title || '';
    return nameA.localeCompare(nameB);
  });
}

export async function getSnackData(id) {
  const items = await got(`${API_BASE}/snacks`).json();
  const item = items.find(item => item.ID.toString() === id);
  if (!item) throw new Error(`Snack with ID ${id} not found`);
  return item;
}
```

### 2. Create the dynamic page

Create `pages/snacks/[id].js` following the pattern in `pages/breakfast/[id].js`

### 3. Update the homepage

In `pages/index.js`:

1. Import the new data function:
   ```javascript
   import { getSortedSnackData } from '../lib/snacks';
   ```

2. Fetch data in `getStaticProps`:
   ```javascript
   const snackRecipes = await getSortedSnackData();
   ```

3. Add to props and render a new `<MealSection>`

### 4. Add styling

In `styles/Home.module.css`, add a color class:

```css
.snacks {
  border-left-color: var(--snacks-color, #26A69A);
  background: linear-gradient(135deg, rgba(38, 166, 154, 0.08) 0%, var(--card-bg) 100%);
}
```

### 5. Add WordPress endpoint

Ensure your WordPress plugin exposes a `/snacks` endpoint at:
```
/wp-json/myplugin/v1/snacks
```

## Deployment

### Deploy to Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

Follow the prompts to:
1. Link to your Vercel account
2. Choose a project name (becomes your-name.vercel.app)
3. Deploy

### Custom Domain

After deploying:
1. Go to your Vercel dashboard
2. Select your project → Settings → Domains
3. Add your custom domain and follow DNS instructions

## WordPress Backend

This app expects a WordPress site with a custom plugin that exposes recipe data at:

```
https://dev-cs55-13-test.pantheonsite.io/wp-json/myplugin/v1/
```

### Required Endpoints

| Endpoint | Description |
|----------|-------------|
| `/breakfast` | Returns breakfast recipes |
| `/lunch` | Returns lunch recipes |
| `/dinner` | Returns dinner recipes |
| `/dessert` | Returns dessert recipes |

### Expected Response Format

```json
[
  {
    "ID": 123,
    "recipe_name": "Pancakes",
    "post_title": "Fluffy Pancakes",
    "ingredients": "flour, eggs, milk, butter",
    "steps": "1. Mix ingredients. 2. Cook on griddle.",
    "difficulty": "Easy",
    "post_content": "<p>HTML content...</p>"
  }
]
```

## License

MIT
