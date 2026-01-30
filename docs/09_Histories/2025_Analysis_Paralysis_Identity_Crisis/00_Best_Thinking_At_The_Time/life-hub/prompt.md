**System / Context:** You are an expert Frontend Developer. I need a **"Local-First, Static Content"** PWA. The app serves as a personal "Knowledge Ammo Box" – a fast, searchable collection of text cards generated from Markdown files. **Constraint:** No backend, no database. Content is compiled from local Markdown files into JSON during build time.

**Project Name:** **LifeHUD (Ammo Edition)**

**Tech Stack:**

1. **Framework:** React (Vite) + Tailwind CSS.
2. **Search:** `fuse.js` (for powerful fuzzy searching across all cards).
3. **Routing:** `react-router-dom` (optional, or just conditional rendering based on selected Tab).
4. **Parsing:** A custom Node.js script to transform directory structure into data.

**Data Structure (The "Zip" Logic):** Assume the user has a folder structure like this in `/content`:

- `/content/East-Asian-Culture/poverty-mindset.md`
- `/content/Trading-Psychology/discipline.md`
- *(Folder Name = Tab Name)*
- *(File Name = List Title)*
- *(File Content = Cards separated by double newline `\n\n`)*

**UI Layout (3 Zones):**

1. **Zone 1: Navigation (Top Bar)**
    - A **horizontally scrollable** list of "Pills" (Buttons).
    - Each Pill represents a top-level folder (e.g., "East Asian Culture", "Trading").
    - Active tab is highlighted.
2. **Zone 2: Search (Sticky Header)**
    - A prominent Search Input below the Nav.
    - **Real-time filtering:** As I type, the content area updates to show *only* matching cards from *all* categories (or current category).
3. **Zone 3: Content Area (The Lists)**
    - Displays the Lists (files) belonging to the active Tab.
    - **List Header:** The filename (e.g., "Poverty Mindset").
    - **Card Grid:** Under each list header, render the Cards.
    - **Card Design:**
        - **Preview:** Show the first 3 lines of the text.
        - **Interaction:** User clicks the card -> It expands to show full text (Accordion style). No tooltips (bad for mobile).
        - **Styling:** Minimalist, dark mode, high contrast borders.

**The Parser Logic (Crucial):** You need to write a `scripts/generate-db.js` that:

1. Recursively reads `/content`.
2. Captures Folder Name as `category`.
3. Captures Filename as `group`.
4. Reads file content, splits by `\n\n` (double newline) to create `cards`.
5. Outputs a huge `src/data.json` for the App to import.

**Initial Request:**

1. Analyze the requirement.
2. Provide the **folder structure**.
3. Write the **`scripts/generate-db.js`** parser script.
4. Provide the **`App.jsx`** code that handles the Tabs, Search (fuse.js implementation), and Card rendering (with Expand/Collapse logic).