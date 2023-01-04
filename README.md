# Authentication Template

Simple authentication template using ExpressJS, PassportJS, PostgreSQL and Redis.

## [Install NodeJS](https://nodejs.org/en/download/)

## [Install Docker](https://docs.docker.com/desktop/)

---

## Development

### 1. Clone the repository

```sh
git clone https://github.com/MehmetCemGencer/Authentication-template.git
```

### 2. Install dependencies

```sh
npm ci
```

### 3. Start development environment

```sh
docker compose up -d
```

---

## Test

### 1. Clone the repository

```sh
git clone https://github.com/MehmetCemGencer/Authentication-template.git
```

### 2. Install dependencies

```sh
npm ci
```

### 3. Start test environment

```sh
docker compose -f docker-compose.test.yml up -d
```

---

## Production

### 1. Clone the repository

```sh
git clone https://github.com/MehmetCemGencer/Authentication-template.git
```

### 2. Create secret files

```sh
sh ./create-secret-files.sh
```

### 3. Fill secret files according to your variables

### 4. Build and run containers

```sh
docker compose -f docker-compose.prod.yml up -d --build
```
