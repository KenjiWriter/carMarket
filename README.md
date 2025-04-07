# Car Market

Car Market is a web application designed to facilitate the buying and selling of cars. The project was built using the Laravel framework for the backend and Vue.js for the frontend.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone <REPOSITORY_URL>
    cd carMarket
    ```

2. **Install PHP dependencies**:
    ```bash
    composer install
    ```

3. **Install Node.js dependencies**:
    ```bash
    npm install
    ```

4. **Configure the `.env` file**:
    Copy the `.env.example` file to `.env`:
    ```bash
    cp .env.example .env
    ```
    Set the appropriate configuration values, such as database connection details.

5. **Generate the application key**:
    ```bash
    php artisan key:generate
    ```

6. **Run database migrations**:
    ```bash
    php artisan migrate
    ```

7. **Start the development server**:
    ```bash
    php artisan serve
    ```

8. **Run frontend asset compilation**:
    ```bash
    npm run dev
    ```

The application should be accessible at `http://localhost:8000`.

## Team

- **Maciej Wiśniewski** - Project Management / Backend  
- **Mateusz Pawłowski** - Frontend  

## License

The project is available under the MIT license. Details can be found in the `LICENSE` file.  