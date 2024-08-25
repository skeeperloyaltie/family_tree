# Family Tree Project

## Overview

This project is a Node.js web application for creating and managing family trees. The application allows users to enter their details, define their relationships with other family members, and visualize their family tree. The project supports extended family members such as cousins, uncles, etc. The application also includes verification by an admin for users under the age of 18.

## Features

- **User Registration:** Users input their full correct names and indicate their relationships.
- **Age Verification:** Users 18 and older must enter their National ID, which is used as a secret key.
- **Relationship Mapping:** Users can define their siblings, parents, and other relatives. If relatives already exist in the database, the system maps out the family tree automatically.
- **Admin Verification:** For users under 18, an admin verifies the correctness of the family details.
- **Family Tree Visualization:** The system uses Cytoscape.js to display the family tree, allowing users to visualize and manage connections between family members.

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Create the project directory and initialize it:**

   ```bash
   npx express-generator family_tree
   cd family_tree
   npm install

# Family Tree Project

## Overview

This project is a Node.js web application for creating and managing family trees. The application allows users to enter their details, define their relationships with other family members, and visualize their family tree. The project supports extended family members such as cousins, uncles, etc. The application also includes verification by an admin for users under the age of 18.

## Features

- **User Registration:** Users input their full correct names and indicate their relationships.
- **Age Verification:** Users 18 and older must enter their National ID, which is used as a secret key.
- **Relationship Mapping:** Users can define their siblings, parents, and other relatives. If relatives already exist in the database, the system maps out the family tree automatically.
- **Admin Verification:** For users under 18, an admin verifies the correctness of the family details.
- **Family Tree Visualization:** The system uses Cytoscape.js to display the family tree, allowing users to visualize and manage connections between family members.

## Project Setup

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. **Create the project directory and initialize it:**

   ```bash
   npx express-generator family_tree
   cd family_tree
   npm install
   npm install sequelize sqlite3 ejs uuid cytoscape
```

